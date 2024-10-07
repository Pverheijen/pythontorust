---
title: "004 - Structs and Enums"
date: 2024-10-07
description: "Structs and Enums"
tags: [Rust, Python]
draft: false
---

# Learning Rust as a Pythonista: Structs and Enums

In this article, we’ll dive into two key concepts in Rust: **Structs** and **Enums**. These constructs help define and work with complex data types in Rust, similar to Python’s `namedtuple`, `dataclass`, and `Enum` features. However, Rust's approach to structs and enums is more powerful, particularly with pattern matching and memory layout control. Let's explore how they work and compare them to similar features in Python.

## 1. Structs in Rust

In Python, we often use `namedtuple` or `dataclass` to define structured data. In Rust, we use **Structs** to achieve a similar goal. Structs allow you to create complex types with named fields.

### Python’s `namedtuple` and `dataclass`

In Python, you might define a simple structure using `namedtuple` or `dataclass`:

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)

# Using dataclass for the same purpose:
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p = Point(10, 20)
print(p.x, p.y)
```

Both `namedtuple` and `dataclass` allow you to define a structure for organizing data with named fields.

### Rust Structs

In Rust, we define a `struct` similarly but with stricter type enforcement:

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 10, y: 20 };
    println!("x: {}, y: {}", p.x, p.y);
}
```

### Key Differences:

- **Type Annotations**: Rust requires explicit type annotations for each field (`i32` in this case), while Python's `namedtuple` and `dataclass` can infer types or skip type annotations entirely.
- **Immutability**: In Rust, fields in a struct are immutable by default, but you can make them mutable by declaring the struct itself mutable (`let mut p = Point { ... }`).
- **Compile-time Safety**: Rust’s type system ensures at compile-time that the fields are being used correctly, whereas Python’s runtime checks are more flexible but less safe.

### 2. Tuple Structs in Rust

Rust also provides a special form of struct called a **Tuple Struct**, which behaves similarly to a tuple in Python, but with named types.

#### Rust Tuple Struct Example:

```rust
struct Color(i32, i32, i32);

fn main() {
    let red = Color(255, 0, 0);
    println!("Red: {}, {}, {}", red.0, red.1, red.2);
}
```

### Key Differences:

- **Named Fields**: Unlike regular structs, tuple structs don’t have named fields; they are accessed by their position, much like a tuple in Python.
- **Type-Safety**: Tuple structs still enforce type safety at compile-time, unlike Python tuples, which can mix types freely.

### 3. Enums in Rust

Enums in Rust are far more powerful than Python's `Enum` type. They can hold data in each variant, which allows for pattern matching and expressive control flows. Python's `Enum` type is mainly used to define constant values.

#### Python's Enum

In Python, you might define an enum like this:

```python
from enum import Enum

class Direction(Enum):
    Up = 1
    Down = 2
    Left = 3
    Right = 4

print(Direction.Up)
```

This gives you a simple enumeration of values, useful for representing a finite set of choices. However, Python’s enums cannot store additional data.

### Rust Enums

In Rust, enums are much more flexible. Each variant of an enum can store different types of data, and you can use pattern matching to destructure and handle them.

#### Rust Enum Example

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::Move { x: 10, y: 20 };

    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to {}, {}", x, y),
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to {}, {}, {}", r, g, b),
    }
}
```

### Key Differences:

- **Data in Variants**: Rust enums can hold additional data in each variant, which makes them much more powerful than Python’s enums.
- **Pattern Matching**: Rust allows you to destructure and match on enum variants using the `match` keyword. This is a very powerful feature that lets you control the flow of your program based on the values inside an enum.

### 4. Pattern Matching with Enums

One of Rust’s standout features is its pattern matching capability. Pattern matching makes it easy to destructure enums and handle complex data structures in a clean and safe way.

#### Example of Pattern Matching in Rust:

```rust
enum Shape {
    Circle(f64),
    Rectangle { width: f64, height: f64 },
}

fn area(shape: Shape) -> f64 {
    match shape {
        Shape::Circle(radius) => 3.14 * radius * radius,
        Shape::Rectangle { width, height } => width * height,
    }
}

fn main() {
    let circle = Shape::Circle(5.0);
    let rectangle = Shape::Rectangle { width: 3.0, height: 4.0 };

    println!("Circle area: {}", area(circle));
    println!("Rectangle area: {}", area(rectangle));
}
```

In this example, `Shape` is an enum that can either be a `Circle` or a `Rectangle`. We then use pattern matching in the `area` function to calculate the area based on the shape’s variant.

### Key Differences:

- **Pattern Matching**: Rust’s pattern matching system is more expressive and type-safe compared to Python’s limited pattern matching capabilities (introduced in Python 3.10). This allows Rust to efficiently handle complex enum variants and nested data structures.
- **Type Safety**: Rust’s pattern matching ensures that all cases are handled exhaustively, providing better safety guarantees at compile time.

### 5. Immutability and Mutability in Structs

Rust enforces immutability by default, including in struct fields. If you want to mutate a struct’s field, you must declare the struct as mutable.

#### Example of Mutable Structs in Rust:

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let mut p = Point { x: 0, y: 0 };
    p.x = 10;
    p.y = 20;
    println!("Updated Point: {}, {}", p.x, p.y);
}
```

### Key Differences:

- **Immutability by Default**: Rust’s default immutability is a significant contrast to Python, where you can freely modify objects unless they are explicitly designed to be immutable (e.g., `namedtuple`).
- **Explicit Mutability**: By requiring explicit declaration of mutability, Rust helps prevent accidental data modification, encouraging safer code.

### Conclusion

Structs and Enums in Rust offer a more powerful and flexible way to model complex data compared to Python’s `namedtuple`, `dataclass`, and `Enum`. While Python's constructs are easy to use and flexible, Rust's design emphasizes type safety, immutability, and exhaustive pattern matching. These features help ensure that programs behave predictably and that errors are caught at compile-time.

In the next article, we’ll explore **Iterators and Closures**, comparing them to Python’s generators and lambda functions. Stay tuned!

### Running the Complete Rust Example

```rust
struct Point {
    x: i32,
    y: i32,
}

struct Color(i32, i32, i32);

enum Direction {
    Up,
    Down,
    Left,
    Right,
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

enum Shape {
    Circle(f64),
    Rectangle { width: f64, height: f64 },
}

fn area(shape: Shape) -> f64 {
    match shape {
        Shape::Circle(radius) => 3.14 * radius * radius,
        Shape::Rectangle { width, height } => width * height,
    }
}

fn main() {
    // Struct Example
    let mut p = Point { x: 0, y: 0 };
    p.x = 10;
    p.y = 20;
    println!("Updated Point: x: {}, y: {}", p.x, p.y);

    // Tuple Struct Example
    let red = Color(255, 0, 0);
    println!("Red: {}, {}, {}", red.0, red.1, red.2);

    // Enum Example with Message
    let msg = Message::Move { x: 10, y: 20 };
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to {}, {}", x, y),
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to {}, {}, {}", r, g, b),
    }

    // Pattern Matching with Enums
    let circle = Shape::Circle(5.0);
    let rectangle = Shape::Rectangle { width: 3.0, height: 4.0 };

    println!("Circle area: {}", area(circle));
    println!("Rectangle area: {}", area(rectangle));
}
```