---
title: "002 - Stack vs Heap, Moves, and Clones"
authors: ["Peter Verheijen"]
date: 2024-10-26
description: "Understand stack/heap allocation and when Rust moves or clones values."
tags: [Rust, Python, memory, ownership, clone]
template: "page.html"
---

## Stack vs Heap, Moves, and Clones

## Why this matters

Python hides most allocation details behind references and a garbage collector. Rust makes ownership and allocation behavior explicit, which is key to predictable performance.

## Learning goals

By the end, you should be able to:

- Explain stack vs heap allocation in Rust.
- Predict when assignment causes a move.
- Choose intentionally between borrow, move, and clone.

## Python baseline

```python
items = ["a", "b"]
other = items
other.append("c")
print(items)  # ["a", "b", "c"]
```

Both names reference the same underlying object.

## Rust mental model

- Fixed-size values (like `i32`) are typically copied on assignment.
- Heap-owning values (`String`, `Vec<T>`) are moved by default.
- `clone()` performs explicit deep copy for owned data.

## Rust examples

### Copy type (`i32`)

```rust
let a = 10;
let b = a; // copy
println!("a = {}, b = {}", a, b);
```

### Move type (`String`)

```rust
let s1 = String::from("rust");
let s2 = s1; // move
// println!("{}", s1); // compile error: moved
println!("{}", s2);
```

### Explicit clone

```rust
let s1 = String::from("rust");
let s2 = s1.clone();
println!("{} / {}", s1, s2);
```

## Runnable end-to-end example

```rust
fn takes_ownership(text: String) {
    println!("owned: {}", text);
}

fn borrows(text: &str) {
    println!("borrowed: {}", text);
}

fn main() {
    // stack-allocated copy type
    let x = 7;
    let y = x;
    println!("x = {}, y = {}", x, y);

    // heap-allocated move type
    let language = String::from("Rust");
    borrows(&language);

    // move into function
    takes_ownership(language);
    // borrows(&language); // would fail: moved

    // explicit clone if both are needed
    let original = String::from("memory");
    let cloned = original.clone();
    println!("original = {}, cloned = {}", original, cloned);
}
```

## Common pitfalls

- Cloning too early everywhere (hidden allocation cost).
- Fighting moves instead of borrowing with `&T`.
- Assuming assignment duplicates heap data.

## Quick practice

1. Replace one `clone()` with a borrow and keep behavior the same.
2. Write `fn len_of(s: &String) -> usize` and call it without moving the string.

## Recap

Rust separates copy, move, and clone clearly. This explicitness is the foundation for both safety and performance.

Next lesson: [003 - Borrowing Rules in Real Functions](/blog/memory-mastery/003-borrowing-rules-in-real-functions/).
