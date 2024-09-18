---
title: "Getting started with Rust and Zola"
date: 2024-09-17
---

# Let's install Rust

I'm currently on a Windows machine (64 bit) and I just installed the appropriate version of rust on [this](https://www.rust-lang.org/tools/install) website. 

After reading the website I've learned that running this command  updates your rust version. 

```bash
rustup update
```

It also mentions that there's a 6 week rapid release process. 

Lets verify if Rust is installed properly by running the following command:

```bash
rustc --version
```

Rust seems to have been installed properly.

![Rust version call works in Git Bash text](rust-installed.JPG)


Apparently you can also uninstall rust in the CLI b y running:

```bash
rustup self uninstall
```

Quoting the website: *In the Rust development environment, all tools are installed to the ~/.cargo/bin directory, and this is where you will find the Rust toolchain, including rustc, cargo, and rustup.*

# Setting up a Static Website

To host my articles, I've decided to set up a static website. Since I’m learning Rust, I want to use it in this process to familiarize myself with the language. In the past, I’ve used [Hugo](https://gohugo.io/) (which runs on [Golang](https://go.dev/)), but this time I’m opting for something Rust-based.

## A Static Website Framework

I'm somewhat familiar with the [JAMstack](https://jamstack.org/), which stands for JavaScript, APIs, and Markdown—a concept that gained popularity through platforms like Netlify. The idea of static website is appealing. It's an easy and cheap way to deploy a simple website such as a blog. 

After some research, I found **Zola**, a static site generator written in Rust, which seems to be the equivalent of Hugo for Rust users.

# Installing Zola on Windows
Following [this](https://www.getzola.org/documentation/getting-started/installation/) website, I followed the Windows installation instructions using Chocolatey.

Small sidenote: I did have to run Git Bash as administrator in order to get it to install.

## Starting a new project with Zola

```bash
zola init PythonToRust
```