---
title: "001 - Memory Mastery: Zero-Cost Abstractions"
authors: ["Peter Verheijen"]
date: 2024-10-25
description: "Understanding Rust's zero-cost abstractions compared to Python's abstractions."
tags: [Rust, Python, abstractions, performance]
template: "page.html"
---

## Memory Mastery: Zero-Cost Abstractions

When you come from Python, Rust can feel both familiar and strange: you still get expressive, high-level code, but Rust insists on compile-time guarantees and predictable performance.

This lesson focuses on **zero-cost abstractions** and how they compare to common Python patterns.

## Learning goals

By the end, you should be able to:

- Explain what zero-cost abstraction means in Rust.
- Compare Rust iterators to Python generators and list comprehensions.
- Understand closure capture in Rust vs Python.
- Use `IntoIterator` trait bounds in a generic Rust function.

## What is a zero-cost abstraction?

A **zero-cost abstraction** means:

> You pay no extra runtime cost for using a high-level abstraction compared to writing a lower-level equivalent by hand.

In Rust, features like iterators, closures, and trait bounds are designed to optimize away at compile time whenever possible.

In Python, abstractions are very ergonomic, but interpretation, dynamic dispatch, and runtime object model overhead still exist.

## 1) Iterators: Python vs Rust

### Python generator expression

```python
nums = range(10)
squared_even = (x * x for x in nums if x % 2 == 0)
result = list(squared_even)
print(result)  # [0, 4, 16, 36, 64]
```

This is lazy until consumed by `list(...)`. It is expressive, but execution happens through Python's runtime machinery.

### Python list comprehension

```python
nums = range(10)
result = [x * x for x in nums if x % 2 == 0]
print(result)  # [0, 4, 16, 36, 64]
```

This is usually faster than a generator + `list(...)` for this case, but it allocates the full list immediately.

### Rust iterator chain

```rust
let nums = 0..10;
let result: Vec<_> = nums
    .filter(|x| x % 2 == 0)
    .map(|x| x * x)
    .collect();

println!("{:?}", result); // [0, 4, 16, 36, 64]
```

Rust typically fuses this chain into efficient loop code during compilation, without intermediate collections between `filter` and `map`.

## 2) Closures: capture behavior

### Python closure

```python
def make_closure():
    x = 10
    return lambda y: x + y

closure = make_closure()
print(closure(5))  # 15
```

Python closures capture variables from enclosing scope and resolve behavior at runtime.

### Rust closure

```rust
fn make_closure() -> impl Fn(i32) -> i32 {
    let x = 10;
    move |y| x + y
}

let closure = make_closure();
println!("{}", closure(5)); // 15
```

With `move`, `x` is captured by value. Because types are known at compile time, Rust can optimize closure usage aggressively.

## 3) Trait bounds vs duck typing

Python relies on duck typing: if an object behaves like an iterable, a `for` loop can use it.

Rust encodes that requirement in the type system using trait bounds.

### Python

```python
def print_iterable(items):
    for item in items:
        print(item)

print_iterable([1, 2, 3])
```

### Rust

```rust
fn print_iterable<T>(items: T)
where
    T: IntoIterator,
    T::Item: std::fmt::Display,
{
    for item in items {
        println!("{}", item);
    }
}

print_iterable(vec![1, 2, 3]);
print_iterable([10, 20, 30]);
```

`IntoIterator` is checked at compile time, so misuse is caught earlier and there is no runtime trait-check penalty for this abstraction.

## Complete runnable Rust example

```rust
fn main() {
    // Iterator example
    let nums = 0..10;
    let squared_even: Vec<_> = nums
        .filter(|x| x % 2 == 0)
        .map(|x| x * x)
        .collect();
    println!("Squared even numbers: {:?}", squared_even);

    // Closure example
    let add_ten = make_closure();
    println!("Closure result: {}", add_ten(5));

    // IntoIterator example
    print_iterable(vec![1, 2, 3]);
    print_iterable([10, 20, 30]);
}

fn make_closure() -> impl Fn(i32) -> i32 {
    let x = 10;
    move |y| x + y
}

fn print_iterable<T>(items: T)
where
    T: IntoIterator,
    T::Item: std::fmt::Display,
{
    for item in items {
        println!("{}", item);
    }
}
```

## Key takeaway

Rust's abstractions are designed to stay expressive **and** compile down to efficient machine code. As a Python developer, the biggest shift is moving correctness and performance checks from runtime to compile time.

Next lesson: [002 - Stack vs Heap, Moves, and Clones](/blog/memory-mastery/002-stack-vs-heap-moves-and-clones/).