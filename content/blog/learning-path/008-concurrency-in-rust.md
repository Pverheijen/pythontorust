---
title: "008 - Concurrency in Rust for Python Developers"
authors: ["Peter Verheijen"]
date: 2024-10-11
description: "Concurrency part 1: threads, channels, and shared state in Rust with Python comparisons."
tags: [Rust, Python, Concurrency, Async, Multithreading]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Concurrency in Rust

This is part 1 of concurrency. We focus on threads, channels, and shared state. The async runtime model (`tokio`) will be covered in the next lesson.

## Why this matters for Python developers

- Python concurrency often starts with `threading`, `concurrent.futures`, or `multiprocessing`.
- Due to the GIL, Python **threads** are usually best for I/O-bound tasks.
- Rust threads run in parallel on multiple cores and are checked for memory safety at compile time.

## Learning goals

By the end of this lesson, you should be able to:

- Spawn and join Rust threads.
- Send messages between threads with channels.
- Share mutable state safely with `Arc<Mutex<T>>`.

## Concepts in 5 minutes

- `std::thread::spawn` starts a new OS thread.
- `join()` waits for a thread to finish.
- `std::sync::mpsc` provides channels for message passing.
- `Arc<Mutex<T>>` enables shared mutable state with synchronization.

## Python baseline snippets

```python
from concurrent.futures import ThreadPoolExecutor

def work(x):
    return x * x

with ThreadPoolExecutor() as pool:
    print(list(pool.map(work, [1, 2, 3])))
```

```python
# For CPU-bound tasks in Python, processes are usually preferred.
from concurrent.futures import ProcessPoolExecutor
```

## Rust equivalent snippets

### 1) Basic thread spawn

```rust
use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        println!("hello from worker thread");
    });

    handle.join().unwrap();
}
```

### 2) Channels for message passing

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send(String::from("done")).unwrap();
    });

    println!("received: {}", rx.recv().unwrap());
}
```

### 3) Shared mutable state with `Arc<Mutex<T>>`

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = Vec::new();

    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut value = counter.lock().unwrap();
            *value += 1;
        }));
    }

    for h in handles {
        h.join().unwrap();
    }

    println!("counter = {}", *counter.lock().unwrap());
}
```

## One runnable end-to-end example

```rust
use std::sync::{mpsc, Arc, Mutex};
use std::thread;

fn main() {
    // 1) Spawn workers and send results over a channel
    let (tx, rx) = mpsc::channel();
    let inputs = vec![1, 2, 3, 4];

    for n in inputs {
        let tx = tx.clone();
        thread::spawn(move || {
            let result = n * n;
            tx.send(result).unwrap();
        });
    }
    drop(tx);

    let mut total = 0;
    for value in rx {
        total += value;
    }
    println!("sum of squares = {}", total);

    // 2) Shared state safely with Arc<Mutex<T>>
    let counter = Arc::new(Mutex::new(0));
    let mut handles = Vec::new();
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut c = counter.lock().unwrap();
            *c += 1;
        }));
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("final counter = {}", *counter.lock().unwrap());
}
```

## Common mistakes

- Forgetting `move` when a spawned thread needs ownership.
- Holding a `Mutex` lock longer than necessary.
- Mixing shared mutable state everywhere instead of preferring channels.

## Quick practice

1. Modify the channel example to send `(input, output)` tuples.
2. Replace the shared counter with a shared `Vec<i32>` and push values safely.

## Recap

Rust threads provide true parallelism and compile-time memory safety. Start with channels for communication, then use `Arc<Mutex<T>>` only when shared mutable state is necessary.

In the next lesson, we’ll cover async concurrency in Rust with `tokio`.