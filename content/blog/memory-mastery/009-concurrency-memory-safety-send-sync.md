---
title: "009 - Concurrency Memory Safety (`Send`, `Sync`)"
authors: ["Peter Verheijen"]
date: 2024-11-02
description: "Understand Send and Sync so you can reason about thread-safe Rust code confidently."
tags: [Rust, Python, concurrency, Send, Sync, memory safety]
template: "page.html"
---

## Concurrency Memory Safety (`Send`, `Sync`)

## Why this matters

Rust concurrency is powerful because it makes thread-safety constraints part of the type system. `Send` and `Sync` are the core markers behind that guarantee.

## Learning goals

By the end, you should be able to:

- Explain what `Send` and `Sync` mean in practical terms.
- Recognize why `Rc<T>` is not thread-safe while `Arc<T>` is.
- Build a small multi-threaded pattern safely using `Arc<Mutex<T>>`.

## Mental model

- `Send`: a value can be moved to another thread.
- `Sync`: references to a value can be shared across threads safely.

Most standard types implement these automatically when their inner types are safe.

## Python baseline

In Python, shared-state thread-safety is mostly a runtime concern. Rust shifts many of these checks to compile time.

## Quick examples

```rust
// Good for multi-thread sharing:
use std::sync::Arc;

let shared = Arc::new(String::from("ok"));
```

```rust
// Rc is single-thread only:
use std::rc::Rc;

let local = Rc::new(String::from("single-thread"));
```

## Runnable end-to-end example

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let total = Arc::new(Mutex::new(0));
    let mut handles = Vec::new();

    for n in 1..=8 {
        let total = Arc::clone(&total);
        handles.push(thread::spawn(move || {
            let mut guard = total.lock().unwrap();
            *guard += n;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("sum = {}", *total.lock().unwrap());
}
```

## Common pitfalls

- Trying to share `Rc<T>` across threads (use `Arc<T>`).
- Using `Arc<T>` for mutation without a synchronization primitive.
- Holding mutex locks longer than necessary.

## Quick practice

1. Extend the example to spawn 16 workers.
2. Replace the shared sum with a shared `Vec<i32>` and push values safely.

## Recap

`Send` and `Sync` are foundational for Rust’s thread-safety model. Once you understand them, concurrency errors become much easier to predict and fix.

Next lesson: [010 - Profiling and Benchmarking Rust vs Python](/blog/memory-mastery/010-profiling-and-benchmarking-rust-vs-python/).
