---
title: "007 - Interior Mutability and Tradeoffs"
authors: ["Peter Verheijen"]
date: 2024-10-31
description: "Use interior mutability patterns safely and understand their runtime tradeoffs."
tags: [Rust, Python, interior mutability, RefCell, Cell, Mutex]
template: "page.html"
---

## Interior Mutability and Tradeoffs

## Why this matters

Rust usually enforces mutability rules at compile time, but some designs need mutation through shared references. Interior mutability enables this—with explicit runtime checks or synchronization.

## Learning goals

By the end, you should be able to:

- Explain interior mutability and when to use it.
- Use `Cell<T>` and `RefCell<T>` in single-threaded code.
- Understand tradeoffs compared to compile-time borrowing.

## Mental model

- `Cell<T>`: copy-in/copy-out mutation for `Copy` types.
- `RefCell<T>`: runtime borrow checking (`borrow`/`borrow_mut`).
- If borrowing rules are violated at runtime, `RefCell` panics.

## Python baseline

Python commonly mutates shared objects directly. Rust forces an explicit choice to allow that behavior.

## Runnable end-to-end example

```rust
use std::cell::{Cell, RefCell};

#[derive(Debug)]
struct Stats {
    hits: Cell<u32>,
    events: RefCell<Vec<String>>,
}

impl Stats {
    fn new() -> Self {
        Self {
            hits: Cell::new(0),
            events: RefCell::new(Vec::new()),
        }
    }

    fn record(&self, event: &str) {
        // Cell: no mutable reference required
        self.hits.set(self.hits.get() + 1);

        // RefCell: mutable borrow checked at runtime
        self.events.borrow_mut().push(event.to_string());
    }

    fn summary(&self) {
        println!("hits = {}", self.hits.get());
        println!("events = {:?}", self.events.borrow());
    }
}

fn main() {
    let stats = Stats::new();

    stats.record("open");
    stats.record("parse");
    stats.record("save");

    stats.summary();

    // NOTE: nested borrow_mut() on the same RefCell would panic at runtime.
}
```

## Tradeoffs

Pros:
- Enables practical designs where mutation behind `&self` is useful.
- Can simplify APIs in specific scenarios.

Cons:
- Some guarantees move from compile time to runtime.
- `RefCell` misuse can panic.
- Overuse can hide ownership design issues.

## Common pitfalls

- Using `RefCell` as first choice instead of redesigning ownership.
- Holding a borrow longer than necessary.
- Forgetting thread model (`RefCell` is not for multi-thread sharing).

## Quick practice

1. Add `fn clear(&self)` that empties `events`.
2. Refactor one `RefCell` use to plain `&mut self` and compare ergonomics.

## Recap

Interior mutability is a useful tool, not a default pattern. Reach for it when it matches the design, and be explicit about runtime tradeoffs.

Next lesson: [008 - Data Layout and Cache-Friendly Rust](/blog/memory-mastery/008-data-layout-and-cache-friendly-rust/).
