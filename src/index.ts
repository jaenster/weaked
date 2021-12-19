export function Weaked(): PropertyDecorator {

    return function (target, propertyKey) {

        let cache: WeakRef<object>

        Object.defineProperty(target, propertyKey, {
            get(): object {
                return cache?.deref();
            },
            set(v: object) {
                cache = new WeakRef<object>(v);
            },
        })
    }
}