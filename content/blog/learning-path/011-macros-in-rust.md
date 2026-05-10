---
title: "011 - Macros in Rust"
authors: ["Peter Verheijen"]
date: 2024-10-14
description: "Learn practical Rust macros with macro_rules!, common use cases, and when not to use macros."
tags: [Rust, Python, Macros, Declarative Macros, Procedural Macros, Code Generation, Metaprogramming]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Macros in Rust

Rust macros are metaprogramming tools: they let you generate code at compile time. For Python developers, the closest comparison is decorators and runtime metaprogramming—but Rust macros run earlier (during compilation), so they can remove boilerplate with no runtime overhead.

## Why this matters for Python developers

- Python decorators modify behavior at runtime.
- Rust macros shape code at compile time.
- This is useful when you want less repetition without giving up performance.

## Learning goals

By the end of this lesson, you should be able to:

- Explain when to use a function vs a macro.
- Write simple `macro_rules!` macros with arguments and repetition.
- Recognize when procedural macros are overkill for beginners.

## Concepts in 5 minutes

- `macro_rules!` = declarative macro system based on pattern matching.
- Macros expand before normal type checking.
- Good use cases: tiny DSL-like syntax, repetitive declarations, ergonomics wrappers.

## Python baseline snippet

```python
def trace(func):
    def wrapper(*args, **kwargs):
        print("calling", func.__name__)
        return func(*args, **kwargs)
    return wrapper

@trace
def greet(name):
    print(f"Hi {name}")

greet("Rust")
```

## Rust equivalent snippets

### 1) A minimal macro

```rust
macro_rules! say_hello {
    () => {
        println!("Hello, Rust!");
    };
}
```

### 2) Macro with arguments

```rust
macro_rules! print_value {
    ($val:expr) => {
        println!("Value: {}", $val);
    };
}
```

### 3) Repetition pattern

```rust
macro_rules! create_functions {
    ($($name:ident),* $(,)?) => {
        $(
            fn $name() {
                println!("You called: {}", stringify!($name));
            }
        )*
    };
}
```

## One runnable end-to-end example

```rust
macro_rules! say_hello {
    () => {
        println!("Hello, Rust!");
    };
}

macro_rules! print_value {
    ($val:expr) => {
        println!("Value: {}", $val);
    };
}

macro_rules! create_functions {
    ($($name:ident),* $(,)?) => {
        $(
            fn $name() {
                println!("You called: {}", stringify!($name));
            }
        )*
    };
}

create_functions!(foo, bar, baz);

fn main() {
    say_hello!();

    print_value!(42);
    print_value!("Hello, world!");

    foo();
    bar();
    baz();
}
```

## Procedural macros (optional appendix)

Procedural macros (`derive`, attribute-like, function-like) are powerful but usually a separate crate/topic. For this learning path, treat them as advanced material after you are comfortable with traits and crate structure.

Start by *using* common derive macros first:

```rust
#[derive(Debug, Clone)]
struct Point {
    x: i32,
    y: i32,
}
```

## Common mistakes

- Using a macro where a normal function is simpler.
- Writing macros before understanding ownership and traits.
- Making macro error messages too cryptic for future readers.

## Quick practice

1. Create a macro `sum_two!(a, b)` that prints `a + b`.
2. Create a macro `make_getters!(field1, field2, ...)` that generates simple getter functions.

## Recap

Use `macro_rules!` to reduce repetitive syntax when functions are not enough. Keep it simple, readable, and focused.

In the next step of your Rust journey, revisit your earlier lessons and identify one repeated pattern you can clean up with a small macro.