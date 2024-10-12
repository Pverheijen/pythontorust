---
title: "006 - Rust Traits vs. Python Duck Typing: A Comparison for Pythonistas"
authors: ["Peter Verheijen"]
date: 2024-10-09
description: "Explore Rust’s Traits and how they compare to Python’s Duck Typing and Protocols, offering insights into the different approaches these languages take towards type safety, flexibility, and performance."
tags: [Rust, Python, Duck Typing, Traits, Protocols, Type Safety, Programming]
draft: false
---

# Learning Rust as a Pythonista: Traits vs. Duck Typing and Protocols

In this article, we’ll dive into **Traits** in Rust and compare them to Python’s **Duck Typing** and **Protocols**. While Python relies on dynamic typing and flexibility to work with different object types, Rust uses **Traits** to enforce type safety at compile time. These two approaches reflect the different philosophies of both languages, with Python emphasizing ease of use and flexibility, and Rust focusing on safety and performance.

## 1. Duck Typing in Python

Python follows the principle of **Duck Typing**, which means that as long as an object behaves like a certain type (e.g., has the necessary methods), it can be used in place of that type. Python doesn’t require explicit type declarations to define what an object should look like.

### Example of Duck Typing in Python:

```python
class Duck:
    def quack(self):
        return "Quack!"

class Dog:
    def quack(self):
        return "I'm a dog, but I can quack!"

def make_quack(animal):
    print(animal.quack())

duck = Duck()
dog = Dog()

make_quack(duck)  # Output: Quack!
make_quack(dog)   # Output: I'm a dog, but I can quack!
```

In this example, both the `Duck` and `Dog` classes have a `quack` method. Even though the Dog isn’t a duck, Python allows it to be passed to `make_quack` because it has the required method.

### Key Points in Python:

- **Duck Typing**: "If it quacks like a duck, it’s a duck." Python doesn’t care about the actual type of the object, just whether it has the necessary methods or attributes.
- **Dynamic and Flexible**: Python’s duck typing makes the language very flexible and allows you to write code that works with different objects as long as they adhere to the expected behavior.

### 2. Traits in Rust

In Rust, the concept of **Traits** is somewhat similar to Python’s duck typing, but with stricter rules. Traits are a way to define shared behavior across types, allowing you to enforce that certain types implement specific methods. Unlike Python, Rust does this at compile time, ensuring type safety and reducing runtime errors.

#### Defining and Implementing Traits in Rust

Here’s an example of a simple trait in Rust and how it can be implemented for different types:

```rust
trait Quack {
    fn quack(&self) -> String;
}

struct Duck;
struct Dog;

impl Quack for Duck {
    fn quack(&self) -> String {
        String::from("Quack!")
    }
}

impl Quack for Dog {
    fn quack(&self) -> String {
        String::from("I'm a dog, but I can quack!")
    }
}

fn make_quack(animal: &impl Quack) {
    println!("{}", animal.quack());
}

fn main() {
    let duck = Duck;
    let dog = Dog;

    make_quack(&duck);  // Output: Quack!
    make_quack(&dog);   // Output: I'm a dog, but I can quack!
}
```

### Key Points in Rust:

- **Traits**: Traits define a set of methods that a type must implement. If a type implements a trait, it guarantees that the methods defined by the trait are available for that type.
- **Compile-time Safety**: Rust checks at compile time that types implement the required traits, ensuring that errors related to missing methods or incompatible types are caught early.

### 3. Generic Functions with Traits

Rust’s traits are often used in conjunction with Generics, allowing you to write functions that can operate on different types as long as they implement a specific trait. This is Rust’s approach to achieving polymorphism.

#### Example of a Generic Function in Rust:

```rust
fn make_quack<T: Quack>(animal: T) {
    println!("{}", animal.quack());
}

fn main() {
    let duck = Duck;
    let dog = Dog;

    make_quack(duck);  // Output: Quack!
    make_quack(dog);   // Output: I'm a dog, but I can quack!
}
```

This allows the `make_quack` function to accept any type that implements the `Quack` trait, similar to how Python would accept any object with a `quack` method.

### Key Differences:

- **Explicit Type Requirements**: Rust explicitly requires types to implement the relevant traits, while Python dynamically checks at runtime whether an object has the necessary attributes.
- **Compile-time Polymorphism**: Rust enforces these rules at compile time, ensuring type safety and preventing errors that would otherwise occur at runtime in Python.

### 4. Protocols in Python (PEP 544)

In Python 3.8, **Protocols** were introduced (via PEP 544) to provide a static way to describe structural typing, similar to Rust’s traits. Protocols allow you to define types that match certain method signatures, and with type hinting, you can statically check if objects conform to the protocol.

#### Example of Protocols in Python:

```python
from typing import Protocol

class Quackable(Protocol):
    def quack(self) -> str:
        ...

class Duck:
    def quack(self):
        return "Quack!"

class Dog:
    def quack(self):
        return "I'm a dog, but I can quack!"

def make_quack(animal: Quackable):
    print(animal.quack())

duck = Duck()
dog = Dog()

make_quack(duck)  # Output: Quack!
make_quack(dog)   # Output: I'm a dog, but I can quack!
```

In this example, `Quackable` is a protocol that specifies that any class passed to `make_quack` must implement a `quack` method. This brings Python closer to Rust’s trait system but still remains more dynamic.

### Key Differences:

- **Static vs. Dynamic Checking**: Python’s protocols provide a way to statically check for conformance with certain method signatures, but the actual enforcement is still dynamic. Rust’s traits, on the other hand, enforce these constraints at compile time.
- **Optional Usage**: Protocols in Python are optional and only useful if you’re using static type checking tools like `mypy`. In Rust, traits are part of the core language and cannot be skipped.

### 5. Trait Bounds vs Duck Typing

In Python, you can pass almost any object to a function as long as it behaves in a certain way (duck typing). In Rust, you can use **Trait Bounds** to constrain what types a function can accept, making the requirements for the function explicit and enforceable.

#### Rust Example with Trait Bounds:

```rust
fn make_quack<T: Quack>(animal: T) {
    println!("{}", animal.quack());
}
```

In this example, the function `make_quack` can only accept types that implement the `Quack` trait. This is similar to Python’s duck typing, but with compile-time checks ensuring that the type adheres to the trait’s requirements.

### Python Equivalent (Duck Typing):

```python
def make_quack(animal):
    print(animal.quack())
```

In Python, `make_quack` can accept any object, and it will only fail at runtime if the object doesn’t have a `quack` method. This makes Python more flexible but also more prone to runtime errors.

### Key Differences:

- **Safety**: Rust’s trait bounds ensure that functions are only called with types that meet the required constraints, catching issues at compile time. Python’s dynamic duck typing allows more flexibility but requires more careful testing to avoid runtime errors.
- **Explicitness**: Rust’s trait system makes the expectations for each function clear in the type signature, while in Python, it’s often implicit and based on documentation or conventions.

### 6. Traits and Trait Objects for Dynamic Dispatch

Rust supports both static dispatch (at compile time) and dynamic dispatch (at runtime) through **Trait Objects**. If you want to allow for more dynamic behavior, you can use trait objects (`&dyn Trait`) to allow for polymorphism at runtime, similar to how Python handles object behavior dynamically.

#### Example of Trait Objects in Rust:

```rust
fn make_quack(animal: &dyn Quack) {
    println!("{}", animal.quack());
}
```

This allows `make_quack` to accept any type that implements the `Quack` trait, but at runtime, the specific method implementation is determined dynamically.

### Key Differences:

- **Dynamic Dispatch**: Rust’s trait objects allow you to achieve dynamic dispatch at runtime, similar to Python’s behavior. However, Rust’s dynamic dispatch is more controlled, and you must explicitly opt-in to it by using trait objects.
- **Performance**: Static dispatch in Rust (the default) is faster because the method calls are resolved at compile time. Python’s dynamic dispatch is more flexible but comes with a performance cost.

### Conclusion

Rust’s Traits provide a powerful way to define shared behavior between types with compile-time safety, while Python’s Duck Typing allows for more dynamic and flexible code but relies on runtime checks. Python’s **Protocols** (introduced in Python 3.8) bring some of the advantages of Rust’s trait system to Python by allowing static type checks for behavior, though the enforcement remains optional.

While Python’s duck typing makes the language easy to use and flexible, Rust’s trait system gives you strict guarantees about the behavior of types, leading to safer and more performant code.

In the next article, we’ll explore **Concurrency in Rust**, comparing it with Python’s `asyncio` and `concurrent.futures`. Stay tuned!

### Running the Complete Rust Example

```rust
trait Quack {
    fn quack(&self) -> String;
}

struct Duck;
struct Dog;

impl Quack for Duck {
    fn quack(&self) -> String {
        String::from("Quack!")
    }
}

impl Quack for Dog {
    fn quack(&self) -> String {
        String::from("I'm a dog, but I can quack!")
    }
}

// Function that accepts any type implementing the Quack trait using dynamic dispatch
fn make_quack(animal: &dyn Quack) {
    println!("{}", animal.quack());
}

fn main() {
    let duck = Duck;
    let dog = Dog;

    make_quack(&duck);  // Output: Quack!
    make_quack(&dog);   // Output: I'm a dog, but I can quack!
}
```