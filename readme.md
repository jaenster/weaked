# Weakrefs as decorator

```typescript
class Foo {
    @Weaked()
    test: Bar;

    constructor() {
    }
}

class Bar {
    baz() {
        return 5;
    }
}

const foo = new Foo(bar);

// This is derefed automaticly for your ease of coding
console.log(foo.bar?.baz());
```