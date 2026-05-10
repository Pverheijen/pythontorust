---
title: "000 - Memory Mastery Roadmap"
authors: ["Peter Verheijen"]
date: 2024-10-24
description: "Roadmap, prerequisites, and benchmark rules for the Memory Mastery series."
tags: [Rust, Python, memory, performance, roadmap]
template: "page.html"
---

# Memory Mastery: Roadmap

This series is a parallel advanced track to the Learning Path.

- **Learning Path** teaches Rust fundamentals in sequence.
- **Memory Mastery** explains *why* Rust gets safety and speed from its memory model.

## Prerequisites

Before starting, complete at least:

- [003 - Ownership, Borrowing, and Lifetimes](/blog/learning-path/003-ownership-borrowing-and-lifetimes/)
- [006 - Iterators and Closures](/blog/learning-path/006-iterators-and-closures-in-rust/)
- [007 - Traits vs Duck Typing and Protocols](/blog/learning-path/007-rust-traits-duck-typing-protocols/)

## Series map

1. [001 - Zero-Cost Abstractions](/blog/memory-mastery/001-memory-mastery-zero-cost-abstractions/)
2. [002 - Stack vs Heap, Moves, and Clones](/blog/memory-mastery/002-stack-vs-heap-moves-and-clones/)
3. [003 - Borrowing Rules in Real Functions](/blog/memory-mastery/003-borrowing-rules-in-real-functions/)
4. [004 - Lifetimes Without Fear](/blog/memory-mastery/004-lifetimes-without-fear/)
5. [005 - String, &str, and Allocation Patterns](/blog/memory-mastery/005-string-str-and-allocation-patterns/)
6. [006 - Smart Pointers (`Box`, `Rc`, `Arc`, `RefCell`)](/blog/memory-mastery/006-smart-pointers-box-rc-arc-refcell/)
7. [007 - Interior Mutability and Tradeoffs](/blog/memory-mastery/007-interior-mutability-and-tradeoffs/)
8. [008 - Data Layout and Cache-Friendly Rust](/blog/memory-mastery/008-data-layout-and-cache-friendly-rust/)
9. [009 - Concurrency Memory Safety (`Send`, `Sync`)](/blog/memory-mastery/009-concurrency-memory-safety-send-sync/)
10. [010 - Profiling and Benchmarking Rust vs Python](/blog/memory-mastery/010-profiling-and-benchmarking-rust-vs-python/)

This series is intentionally capped at 10 focused lessons to stay practical and not overwhelm readers.

## Benchmark methodology (series standard)

When comparing Python and Rust performance in this series:

- Use the same input data and workload.
- Run warmups before measuring.
- Report machine/OS/versions.
- Avoid claims from single runs.
- State what was optimized (and what was not).
- Focus on tradeoffs, not “Rust always wins.”

## How to use this series

- Run the code snippets locally.
- Read “common pitfalls” sections carefully.
- Prefer understanding ownership/borrowing behavior first, then optimize.

## Outcome

By the end, you should be able to reason about allocation, ownership flow, borrowing constraints, and practical performance choices with confidence.
