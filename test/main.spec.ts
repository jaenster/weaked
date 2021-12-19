import {Weaked} from "../src";

import * as v8 from "v8";
import * as vm from "vm";

const delay = ms => new Promise(r => setTimeout(r, ms));

describe('test weaked', () => {
    v8.setFlagsFromString('--expose_gc');
    const gc = vm.runInNewContext('gc') as () => void;

    class Foo {
        @Weaked()
        test: object;

        constructor(v) {
            this.test = v;
        }

    }

    class Bar {
        readonly value = 5;
    }


    test('Value gets cleaned up', async () => {
        let bar = new Bar;
        let isCleanedUp = false;


        //@ts-ignore - definitions are wonky
        // noinspection ES6MissingAwait
        new FinalizationRegistry<Bar>(() => isCleanedUp = true).register(bar, {})

        bar = undefined;
        while (!isCleanedUp) {
            gc(); // force the engine to clean it up
            if (!isCleanedUp) await delay(100);
        }
        expect(isCleanedUp).toBeTruthy();
    });


    test('Weak ref works', async () => {
        let foo = new Foo(new Bar);

        let isCleanedUp = false;

        // @ts-ignore - definitions are wonky
        // noinspection ES6MissingAwait
        new FinalizationRegistry<Bar>(() => isCleanedUp = true).register(foo.test, {})

        while (!isCleanedUp) {
            gc(); // force the engine to clean it up
            if (!isCleanedUp) await delay(100);
        }
        expect(isCleanedUp).toBeTruthy();
        expect(foo.test).toBeUndefined();
    });

})