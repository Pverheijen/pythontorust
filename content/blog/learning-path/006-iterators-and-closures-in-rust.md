---
title: "006 - Iterators and Closures"
authors: ["Peter Verheijen"]
date: 2024-10-08
description: "Use Rust iterators and closures effectively, including iter/into_iter/iter_mut and capture modes."
tags: [Rust, Python]
draft: false
template: "page.html"
---

# Learning Rust as a Pythonista: Iterators and Closures

Iterators and closures are where Rust starts to feel concise and expressive, not just strict.

## Why this matters for Python developers

- Python generators/comprehensions map nicely to Rust iterator chains.
- Rust closures are similar to lambdas but interact with ownership/borrowing.
- Understanding `iter` vs `into_iter` vs `iter_mut` prevents many compiler errors.

## Learning goals

By the end of this lesson, you should be able to:

- Choose correctly between `iter`, `into_iter`, and `iter_mut`.
- Build lazy pipelines with `map`, `filter`, and `fold`.
- Understand closure capture behavior (`Fn`, `FnMut`, `FnOnce`).

## Concepts in 5 minutes

- Iterators are lazy until consumed (`collect`, `sum`, `for_each`, etc.).
- `iter()` borrows items, `into_iter()` consumes ownership, `iter_mut()` mutably borrows items.
- Closures capture environment by reference/mutable reference/value based on use.

## Python baseline snippet

```python
nums = [1, 2, 3, 4, 5]
result = sum(x * x for x in nums if x % 2 == 1)
print(result)
```

## Rust equivalent snippets

```rust
let nums = vec![1, 2, 3, 4, 5];

let sum_of_odd_squares: i32 = nums
    .iter()
    .filter(|x| **x % 2 == 1)
    .map(|x| x * x)
    .sum();
```

```rust
let mut values = vec![1, 2, 3];
for v in values.iter_mut() {
    *v *= 10;
}
```

## One runnable end-to-end example

```rust
fn apply_twice<F>(mut f: F, value: i32) -> i32
where
    F: FnMut(i32) -> i32,
{
    let first = f(value);
    f(first)
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5, 6];

    // 1) Borrowed iteration (iter)
    let odd_squares_sum: i32 = nums
        .iter()
        .filter(|x| **x % 2 == 1)
        .map(|x| x * x)
        .fold(0, |acc, x| acc + x);
    println!("odd_squares_sum = {}", odd_squares_sum);

    // 2) Consuming iteration (into_iter)
    let owned_strings = vec!["rust", "python", "zola"];
    let upper: Vec<String> = owned_strings
        .into_iter()
        .map(|s| s.to_uppercase())
        .collect();
    println!("upper = {:?}", upper);

    // 3) Mutable iteration (iter_mut)
    let mut scores = vec![10, 20, 30];
    for score in scores.iter_mut() {
        *score += 5;
    }
    println!("scores = {:?}", scores);

    // 4) Closure capture + FnMut
    let mut offset = 1;
    let add_offset = |x| {
        offset += 1;
        x + offset
    };
    let result = apply_twice(add_offset, 10);
    println!("apply_twice result = {}", result);
}
```

## Common mistakes

- Using `into_iter()` and then trying to reuse the original collection.
- Forgetting dereference in iterator closures (`|x| **x` when needed).
- Choosing `Fn` when closure actually mutates captured state (`FnMut`).

## Quick practice

1. Transform `Vec<&str>` into `Vec<String>` using `into_iter()`.
2. Compute product of even numbers with `filter` + `fold`.

## Recap

Iterators and closures are idiomatic Rust power tools. Once ownership semantics are clear, these patterns become both ergonomic and fast.

Next lesson: traits vs duck typing and protocols.