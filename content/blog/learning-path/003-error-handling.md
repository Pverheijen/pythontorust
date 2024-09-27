---
title: "003 - Error Handling"
date: 2024-09-26
description: "Error Handling"
tags: [Rust, Python]
draft: true
---

# Learning Rust as a Pythonista: Error Handling

In this article, we’ll explore how error handling in Rust differs from Python, focusing on Rust’s `Result` and `Option` types. While Python uses exceptions for error management, Rust takes a more explicit, compile-time approach to handling potential errors. By comparing these mechanisms, we’ll highlight how Rust’s error handling encourages more robust, predictable code.

## 1. Error Handling in Python: `try-except` Blocks

In Python, you handle errors with `try-except` blocks. Python uses exceptions to indicate that something went wrong, and you can handle these exceptions as needed:

```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Cannot divide by zero"
    return result

print(divide(10, 2))  # 5.0
print(divide(10, 0))  # Cannot divide by zero
```

### Key Points in Python:

- Python's error handling is done at runtime using exceptions.
- If an exception occurs and isn’t caught, the program will crash.
- Error types like `ZeroDivisionError`, `FileNotFoundError`, etc., are part of Python’s standard exceptions.

### 2. Error Handling in Rust: `Result` and `Option` Types

In contrast to Python, Rust doesn’t use exceptions. Instead, it uses the `Result` and `Option` types to handle potential errors at compile time. These types ensure that the programmer handles errors explicitly, making it impossible to ignore them.

#### The `Result` Type

In Rust, functions that can fail return a `Result<T, E>`, where `T` is the type of the successful value and `E` is the type of the error. Here's how to handle division in Rust, similar to the Python example:

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match divide(10.0, 0.0) {
        Ok(result) => println!("Result: {}", result),
        Err(e) => println!("Error: {}", e),
    }
}
```

### Key Differences:

- **Explicit Handling**: Rust forces you to handle errors explicitly. You can’t ignore the `Result` type—if a function returns a `Result`, you must deal with both success (`Ok`) and failure (`Err`).
- **Compile-time Safety**: Rust's approach guarantees at compile-time that errors are not left unchecked, which reduces the chances of bugs that arise from unhandled exceptions.

### 3. Using `Option` for Nullable Values

Another key type in Rust’s error-handling model is `Option<T>`. It’s used for cases where a value might or might not exist, similar to `None` in Python. In Python, you can return `None` to indicate the absence of a value, but there is no enforced handling of `None` values.

```python
def find_value(dictionary, key):
    return dictionary.get(key)

data = {"a": 1, "b": 2}
print(find_value(data, "a"))  # 1
print(find_value(data, "c"))  # None
```

In Rust, you would use the `Option<T>` type for the same purpose:

```rust
fn find_value(dictionary: &std::collections::HashMap<&str, i32>, key: &str) -> Option<&i32> {
    dictionary.get(key)
}

fn main() {
    let mut data = std::collections::HashMap::new();
    data.insert("a", 1);
    data.insert("b", 2);

    match find_value(&data, "a") {
        Some(value) => println!("Found: {}", value),
        None => println!("Key not found"),
    }

    match find_value(&data, "c") {
        Some(value) => println!("Found: {}", value),
        None => println!("Key not found"),
    }
}
```

### Key Differences:

- **Optional Values**: In Python, using `None` for missing values is implicit and can sometimes lead to `NoneType` errors if not checked properly. In Rust, `Option<T>` forces you to handle the case where the value may not be present.
- **Pattern Matching**: Rust uses `match` to destructure `Option` and `Result` types, which makes it clear whether a value exists or not, or whether an operation succeeded or failed.


### 4. Propagating Errors with the `?` Operator

Rust provides a convenient way to propagate errors without having to write explicit `match` statements for each error scenario. The `?` operator can be used to return an error if one occurs, propagating it upwards in the call stack. This simplifies the code when handling multiple potential error points.

### Rust Example Using `?` Operator:

Here’s a simple example of how the `?` operator can be used in Rust to handle errors:

```rust
fn read_file_content(path: &str) -> Result<String, std::io::Error> {
    std::fs::read_to_string(path)
}

fn main() -> Result<(), std::io::Error> {
    let content = read_file_content("my_file.txt")?;
    println!("{}", content);
    Ok(())
}
```
### Key Differences:

- **Error Propagation**: Rust’s `?` operator is similar to Python’s `raise` in that it passes the error to the calling function. However, Rust enforces the handling of errors at compile-time, ensuring safer and more predictable error management.

### 5. Custom Error Types

In Rust, you can define your own custom error types to better reflect the kinds of errors your application might encounter. This is similar to creating custom exception classes in Python.

### Python Example:

```python
class CustomError(Exception):
    pass

def raise_custom_error():
    raise CustomError("This is a custom error")

try:
    raise_custom_error()
except CustomError as e:
    print(f"Caught custom error: {e}")

```

### Rust Example:

```rust
#[derive(Debug)]
struct CustomError(String);

fn raise_custom_error() -> Result<(), CustomError> {
    Err(CustomError(String::from("This is a custom error")))
}

fn main() {
    match raise_custom_error() {
        Ok(_) => println!("No error"),
        Err(e) => println!("Caught custom error: {:?}", e),
    }
}

```

### Key Differences:

- **Custom Errors**: Both Rust and Python allow you to define custom error types, but in Rust, you’ll likely use the `Result` type to wrap these errors, while in Python, you’d throw and catch exceptions.

### Conclusion

Error handling in Rust is more explicit and rigorous than in Python, providing compile-time guarantees that errors are properly addressed. While Python's exception-based system is flexible, Rust’s `Result` and `Option` types ensure that error handling is never left to chance. These differences reflect Rust's focus on safety and robustness, especially when developing performance-critical or system-level applications.

In the next article, we’ll take a closer look at `Structs` and `Enums` in Rust, and compare them to Python’s `namedtuple` and `dataclass`. Stay tuned!
