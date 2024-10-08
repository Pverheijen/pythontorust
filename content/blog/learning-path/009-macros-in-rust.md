---
title: "009"
authors: ["Peter Verheijen"]
date: 2024-09-26
description: "Macros in Rust"
tags: [Rust, Python]
draft: true
---

# Learning Rust as a Pythonista: Macros in Rust

In this article, we’ll explore **Macros** in Rust, a powerful feature that allows you to write code that writes code. Macros in Rust provide metaprogramming capabilities and can greatly enhance code flexibility and reduce repetition. While Python uses functions and decorators to achieve some of these effects, Rust macros are more integrated into the language and operate at compile-time, allowing for powerful and efficient code generation.

## 1. What Are Macros?

A **macro** in Rust allows you to generate code at compile-time, which means that macros are expanded before the actual compilation takes place. They are often used for reducing boilerplate code and automating repetitive tasks. Macros can be used for anything from simple operations like printing to complex code generation.

### Types of Macros in Rust:

- **Declarative Macros**: Also known as `macro_rules!` macros, these are defined using patterns and are the most common form of macros in Rust.
- **Procedural Macros**: More complex macros that allow for custom derive implementations and more flexible code manipulation.

---

## 2. Declarative Macros: `macro_rules!`

The most common and straightforward type of macro in Rust is the **declarative macro**, defined using `macro_rules!`. Declarative macros operate based on pattern matching, where the macro is triggered when its pattern matches the code.

### Example of a Simple Macro in Rust:

```rust
macro_rules! say_hello {
    () => {
        println!("Hello, Rust!");
    };
}

fn main() {
    say_hello!();  // Output: Hello, Rust!
}
```

In this example, the macro `say_hello` expands to `println!("Hello, Rust!");` when invoked. The `()` denotes that the macro takes no arguments.

### Key Points:

- **Compile-time Code Generation**: Macros are expanded at compile time, meaning the code they generate becomes part of your program before the compilation process starts.
- **No Runtime Cost**: Since macros operate at compile time, they don’t introduce any runtime overhead.

---

### 3. Macros with Arguments

Just like functions, macros can also accept arguments, which makes them more versatile and allows them to generate different code depending on the input.

#### Example of a Macro with Arguments:

```rust
macro_rules! print_value {
    ($val:expr) => {
        println!("Value: {}", $val);
    };
}

fn main() {
    print_value!(42);  // Output: Value: 42
    print_value!("Hello, world!");  // Output: Value: Hello, world!
}
```

In this example, the macro `print_value` accepts an expression (`$val`) and prints it. You can pass any valid expression to the macro, and it will automatically generate the appropriate code.

### Pattern Matching:

- `$val:expr` indicates that the macro accepts any expression.
- The power of macros comes from their ability to match patterns and expand them into code.

---

### 4. Repetition in Macros

Macros in Rust can also handle repetition, allowing you to write code that generates repetitive blocks of code without having to duplicate it manually. This is especially useful for generating boilerplate code.

#### Example of Macro Repetition:

```rust
macro_rules! create_functions {
    ($($name:ident),*) => {
        $(
            fn $name() {
                println!("You called: {}", stringify!($name));
            }
        )*
    };
}

create_functions!(foo, bar, baz);

fn main() {
    foo();  // Output: You called: foo
    bar();  // Output: You called: bar
    baz();  // Output: You called: baz
}
```

In this example, the macro `create_functions!` generates three different functions (`foo`, `bar`, and `baz`). The `stringify!` macro converts the identifier into a string, and the repetition pattern `$($name:ident),*` allows the macro to generate multiple functions in one go.

### Key Points:

- **Repetition**: Macros can handle repetition with the `*` operator, making them useful for code generation when you need multiple similar elements.
- **Pattern Matching**: Macros use pattern matching to identify the input and generate the appropriate output based on the provided patterns.

---

### 5. Procedural Macros

While declarative macros are powerful, **procedural macros** offer even more flexibility by allowing you to manipulate Rust’s abstract syntax tree (AST). Procedural macros can be used for things like custom derive implementations, attribute macros, and function-like macros that can modify Rust code at a more granular level.

#### Derive Macros

The most common use of procedural macros is for automatically implementing traits using `#[derive]`. This saves you from writing repetitive implementations of traits like `Debug` or `Clone`.

#### Example of a Derive Macro:

```rust
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 10, y: 20 };
    println!("{:?}", p);  // Output: Point { x: 10, y: 20 }
}
```

In this example, the `#[derive(Debug)]` macro automatically implements the `Debug` trait for the `Point` struct, allowing it to be printed with the `{:?}` format specifier.

### Custom Procedural Macros

Procedural macros allow you to create your own `derive` macros or function-like macros, but they are more complex and require you to work with Rust’s token stream.

Here’s a small example of a **procedural** macro that implements a custom derive macro for a trait called `Hello` that prints a custom message for a struct:

#### Procedural Macro Example
This example will be split into two parts:

1. Defining the procedural macro (typically in a separate crate).
2. Using the procedural macro.

##### Part 1: Define the procedural macro
First, create a new crate (a Rust project) for the procedural macro:

```bash
cargo new hello_macro --lib
```

Inside the `Cargo.toml` file, add the following dependencies:

```toml
[dependencies]
syn = "1.0"
quote = "1.0"
proc-macro2 = "1.0"
```

In `src/lib.rs`, define the procedural macro:

```rust
extern crate proc_macro;
use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(Hello)]
pub fn hello_derive(input: TokenStream) -> TokenStream {
    // Parse the input tokens into a syntax tree
    let ast = syn::parse(input).unwrap();

    // Build the trait implementation
    impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl Hello for #name {
            fn hello() {
                println!("Hello, I am a {}!", stringify!(#name));
            }
        }
    };
    gen.into()
}
```

This macro will generate an implementation for a trait called `Hello` that prints a custom message when called.

**Part 2: Use the procedural macro**
Now, create a new binary crate (another Rust project) where you'll use the procedural macro:

```bash
cargo new hello_macro_user
```
In the `Cargo.toml` file for this new project, add a reference to the `hello_macro` crate. If you’re working locally, you can point to the path of the procedural macro crate you created:

```toml
[dependencies]
hello_macro = { path = "../hello_macro" }
```

In `src/main.rs`, use the `Hello` macro:

```rust
use hello_macro::Hello;

#[derive(Hello)]
struct User;

fn main() {
    User::hello();  // Output: "Hello, I am a User!"
}
```

#### Explanation
- The procedural macro `#[derive(Hello)]` is defined in the hello_macro crate.
- It implements the `Hello` trait for any struct that uses the macro.
- The `hello()` function prints out the name of the struct it is implemented for.

#### Running the Example
When you run the `hello_macro_user` crate using `cargo run`, you’ll see the output:

```bash
Hello, I am a User!
```

This simple example demonstrates how to use procedural macros to generate custom code based on Rust’s abstract syntax tree (AST) and apply it to structs.

While procedural macros are very powerful, they are more complex to write compared to declarative macros, so they are often used for more advanced metaprogramming tasks.

### 6. Macros vs Functions

At first glance, macros might seem similar to functions, but there are key differences:

#### Key Differences:

- **When They Run**: Macros are expanded at compile time, while functions are evaluated at runtime. This means that macros can generate code, while functions simply execute code that’s already written.
- **Flexibility**: Macros operate on syntax trees and can perform operations that are impossible for functions, such as repeating code or creating identifiers.
- **No Type Checking**: Macros are expanded before type checking, meaning you can write macros that generate code without worrying about types at the time of macro expansion. Functions, on the other hand, require valid types when called.

---

### 7. Macros in Python

In Python, macros don’t exist as a first-class feature like they do in Rust. However, Python does have decorators and metaprogramming features that can achieve some similar effects.

#### Example of a Decorator in Python:

```python
def my_decorator(func):
    def wrapper():
        print("Before the function call")
        func()
        print("After the function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello, Python!")

say_hello()
```

In this example, the `@my_decorator` syntax is used to wrap the `say_hello` function, similar to how macros in Rust generate code. However, Python decorators run at runtime, while Rust macros operate at compile time.

#### Key Differences:

- **Runtime vs Compile-time**: Python decorators and metaprogramming operate at runtime, while Rust macros run at compile time, providing more flexibility and performance.
- **Code Generation**: Rust macros allow you to generate new code, while Python decorators and metaclasses modify existing code at runtime.

---

### 8. Debugging Macros

Macros can sometimes be tricky to debug because they generate code before it’s compiled. To inspect the code generated by a macro, you can use the `cargo expand` tool, which shows the expanded macro code.

#### Example of Expanding Macros:

```bash
cargo expand
```

Running this command will output the expanded code generated by macros, making it easier to debug and understand what the macro is doing under the hood.

### Conclusion

Macros in Rust are a powerful metaprogramming tool that allow you to write cleaner, more efficient, and reusable code by generating code at compile time. While Python offers similar functionality through decorators and metaclasses, Rust’s macros operate at a lower level and offer more flexibility, especially when it comes to code generation and performance.
