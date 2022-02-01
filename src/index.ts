export function Weaked(): PropertyDecorator {

    return function (target, propertyKey) {
        let sym = Symbol('WeakRef-' + (propertyKey.toString()));

        Object.defineProperty(target, propertyKey, {
            get(): object {
                return this[sym]?.deref();
            },
            set(v: object) {
                this[sym] = typeof v === 'object' && v ? new WeakRef<object>(v) : undefined;
            },
        })
    }
}