---
title: "006 - Smart Pointers (`Box`, `Rc`, `Arc`, `RefCell`)"
authors: ["Peter Verheijen"]
date: 2024-10-30
description: "Understand when to use Box, Rc, Arc, and RefCell for ownership and mutability patterns."
tags: [Rust, Python, smart pointers, Box, Rc, Arc, RefCell]
template: "page.html"
---

## Smart Pointers (`Box`, `Rc`, `Arc`, `RefCell`)

## Why this matters

Rust’s default ownership model is simple, but real applications need shared ownership and controlled mutability. Smart pointers are the tools for that.

## Learning goals

By the end, you should be able to:

- Choose between `Box`, `Rc`, and `Arc` based on ownership needs.
- Explain when `RefCell` is useful and what tradeoff it introduces.
- Avoid common smart-pointer anti-patterns.

## Mental model

- `Box<T>`: single owner, heap allocation.
- `Rc<T>`: shared ownership in single-threaded code.
- `Arc<T>`: shared ownership across threads.
- `RefCell<T>`: interior mutability with runtime borrow checks (single-threaded).

## Python baseline

Python objects are reference-counted and shared by default. Rust makes sharing explicit so you can reason about aliasing and mutation safely.

## Runnable end-to-end example

```rust
use std::cell::RefCell;
use std::rc::Rc;
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // 1) Box<T>: single ownership on heap
    let boxed = Box::new(String::from("boxed value"));
    println!("box = {}", boxed);

    // 2) Rc<T> + RefCell<T>: shared ownership + interior mutability (single-thread)
    let shared_counter = Rc::new(RefCell::new(0));
    let a = Rc::clone(&shared_counter);
    let b = Rc::clone(&shared_counter);

    *a.borrow_mut() += 1;
    *b.borrow_mut() += 1;
    println!("rc/refcell counter = {}", shared_counter.borrow());

    // 3) Arc<T> + Mutex<T>: shared ownership + synchronized mutability (multi-thread)
    let counter = Arc::new(Mutex::new(0));
    let mut handles = Vec::new();

    for _ in 0..4 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut n = counter.lock().unwrap();
            *n += 1;
        }));
    }

    for h in handles {
        h.join().unwrap();
    }

    println!("arc/mutex counter = {}", *counter.lock().unwrap());
}
```

## Common pitfalls

- Using `Rc<T>` in multi-threaded code (use `Arc<T>` instead).
- Reaching for `RefCell<T>` too early instead of restructuring ownership.
- Nesting smart pointers without a clear reason.

## Quick decision guide

- Need heap allocation with one owner? `Box<T>`
- Need many owners in one thread? `Rc<T>`
- Need many owners across threads? `Arc<T>`
- Need mutation through shared references (single-thread)? `RefCell<T>`

## Quick practice

1. Replace `Rc<RefCell<i32>>` with plain ownership in a simpler version of the code.
2. Add another thread to the `Arc<Mutex<_>>` example and verify final count.

## Recap

Smart pointers are explicit tradeoffs: ownership model, mutability model, and thread model. Pick the simplest pointer that matches your use case.

Next lesson: [007 - Interior Mutability and Tradeoffs](/blog/memory-mastery/007-interior-mutability-and-tradeoffs/).
