---
title: "001 - Your First Rust Program"
authors: ["Peter Verheijen"]
date: 2024-09-26
description: "Learn the Rust toolchain and cargo-first workflow to create, build, and run your first Rust program."
tags: ["Rust", "Python", "Programming", "Tutorial", "Getting Started", "Compiling", "Rustc", "Cargo", "Hello World", "Beginner", "Software Development"]
template: "page.html"
---

## How to Create and Run a Rust File

If you're coming from Python, you're used to `python script.py`. In Rust, source code is compiled first, then executed.

## Why this matters for Python developers

- Rust has a build step, which catches many issues before runtime.
- `cargo` is the standard workflow (project creation, build, run, test).
- Learning this flow early makes every later lesson smoother.

## Learning goals

By the end of this lesson, you should be able to:

- Install and verify the Rust toolchain.
- Create and run a Rust project with `cargo`.
- Understand when to use `cargo` vs `rustc`.

## Concepts in 5 minutes

- `rustup`: toolchain manager.
- `cargo`: Rust package manager and build tool.
- `rustc`: low-level compiler command (useful, but not daily default).

## Step 1: Install and verify Rust

Install via `rustup` and verify:

```bash
rustc --version
cargo --version
```

## Step 2: Cargo-first workflow (recommended)

```bash
cargo new hello_rust
cd hello_rust
cargo run
```

This creates project files and runs the default `src/main.rs`.

Expected output includes:

```
Hello, world!
```

## Step 3: Edit and rerun

Replace `src/main.rs` with:

```rust
fn main() {
    println!("Hello, Rust!");
}
```

Run again:

```bash
cargo run
```

## Optional: single-file compile with `rustc`

Useful for quick experiments:

```bash
rustc main.rs
```

Run binary:

```bash
./main      # Linux/macOS
main.exe    # Windows (cmd/powershell)
```

## Common first-run issues

- **`cargo` not found**: reopen terminal after install, or ensure Rust is in PATH.
- **Permission issues on Unix**: check shell profile setup from rustup installer.
- **Wrong folder**: `cargo run` must be inside a project with `Cargo.toml`.

## Quick practice

1. Change output to `"Hello from Python to Rust!"` and run.
2. Add a second `println!` line and run again.

## Recap

Use `cargo` as the default workflow. Reach for `rustc` only when you specifically want single-file compilation.

Next lesson: core syntax and structure.