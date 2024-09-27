---
title: "001 Learning Rust as a Pythonista: How to Create and Run a Rust File"
date: 2024-09-26
description: "How to create and run a Rust file"
tags: [Rust, Python, compile, run]
---

## How to Create and Run a Rust File

If you're coming from Python, you're probably used to running `.py` files directly with the Python interpreter. In Rust, the process involves compiling your code first before running it. Let’s walk through how to create a simple Rust file and run it.

### Step 1: Install Rust

Before we begin, you’ll need to install Rust if you haven’t already. You can do this using the following command:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

This will install `rustup`, Rust’s toolchain manager. After installation, make sure `rustc` (the Rust compiler) and `cargo` (Rust's build system) are properly installed by running:

```bash
rustc --version
cargo --version
```

## Step 2: Create a New Rust File
In Rust, the source files usually end with the `.rs `extension. Let’s create a new file called `main.rs`:

```bash
touch main.rs
```

Now open the file in your favorite editor and add the following code:

```rust
fn main() {
    println!("Hello, Rust!");
}
```

This is a simple Rust program that prints `"Hello, Rust!"` to the console. It’s equivalent to the classic "Hello, World!" example.

## Step 3: Compile and Run the Rust Program

Unlike Python, which runs scripts directly, Rust code must be compiled before execution. To compile the program, run the following command:

```bash
rustc main.rs
```

This will create an executable file (for example, `main` on Unix-based systems or `main.exe` on Windows). To run the program, execute the following:

```bash
./main   # On Unix-based systems (Linux/macOS)
main.exe # On Windows
```

You should see the output:

```
Hello, Rust!
```

## Using `cargo` for Larger Projects

For more complex projects, Rust developers typically use `cargo`, Rust’s package manager and build system. It simplifies compiling and running Rust projects. To create a new project with `cargo`, use:

```bash
For more complex projects, Rust developers typically use cargo, Rust’s package manager and build system. It simplifies compiling and running Rust projects. To create a new project with cargo, use:
```

This sets up a basic project structure and runs the program for you, making it easier to manage larger Rust codebases.

Now that you know how to create and run a simple Rust program, you're ready to start experimenting with Rust code. In the next sections, we’ll dive deeper into Rust’s unique features, starting with Basic Syntax and Structuring.