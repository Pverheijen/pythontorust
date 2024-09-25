---
title: "Deploying a static website made with Zola to Netlify"
date: 2024-09-18
---

# Deploying My Website with Netlify

For my personal website, [peterverheijen.nl](http://peterverheijen.nl), I originally used Hugo, a static site generator built with Go. I hosted the site using an S3 bucket on Azure, with a convenient VS Code extension that allowed me to upload files to the bucket and configure the URL to serve the website directly from there.

This time around, I wanted to explore other popular deployment platforms, specifically Netlify and Vercel. However, after reading this [this discussion](https://github.com/orgs/vercel/discussions/3181), I discovered some ongoing issues with Vercel. As a result, I decided to give Netlify a try instead.

## Getting Started with Netlify

Setting up a Netlify account is simple. You can sign up via this [link](https://app.netlify.com/signup). Since [my code](https://github.com/Pverheijen/pythontorust) is hosted on GitHub, I used GitHub for OAuth authentication to streamline the process.

Once logged in, you can create a new site by selecting **"Add New Site"** in the admin console. If your project already exists on GitHub, it’s easiest to import the repository directly.

![New site in the admin console of Netlify](../../../netlify-new-site.JPG)

If you already have your repository set up, I'd suggest importing an existing one. 

## Configuring Netlify

To tell Netlify how to build and deploy your project, I recommend adding a netlify.toml file to the root of your project. Here’s an example of my setup for a Zola theme:

```toml
[build]
command = "yarn install --frozen-lockfile && yarn build && zola build"
publish = "public"

[build.environment]
ZOLA_VERSION = "0.19.2"

[context.production.environment]
ZOLA_BASE_URL = "https://pythontorust.netlify.app/"
```

In this setup, I’m using Tailwind CSS and PostCSS, which require the CSS to be built before the site itself. Here’s the build process:

```bash
yarn install --frozen-lockfile
yarn build 
```

Once that’s done, you can run:

```bash
zola build
```

This ensures that the generated CSS file is placed in the **public** folder, along with the rest of the website files. These are the files that will be deployed.

## Automating Deployment with Netlify

By connecting your GitHub repository to Netlify, any pull request (PR) to the main branch triggers a preview build. Once changes are merged or pushed to the main branch, the site is automatically rebuilt and redeployed.

Initially, your website will be deployed to a default URL provided by Netlify: https://[website-name].netlify.app/.

## Acquiring a new Domain

For this blog, I purchased the domain [pythontorust.nl](pythontorust.nl) through [Antagonist](https://www.antagonist.nl/). If you're reading this, you're likely already on the custom domain!


## Setting Up Domain Alias

Netlify allows you to manage custom domains directly from their platform. By default, your site will be available at something like pythontorust.netlify.app. However, I’m using www.pythontorust.nl and pythontorust.nl as my primary URLs (with the latter as the main one).

![Domain management tab on Netlify](../../../domain-management.JPG)

## Configuring A-Records for Netlify

To point my custom domain to Netlify, I followed their documentation to configure the A-records with my domain registrar (Antagonist). If you encounter issues, feel free to reach out to me for help.

It can take a little time for Netlify to detect the DNS changes—this delay is based on your domain’s TTL (Time-to-Live). Once the changes propagate and the A-record is correctly set, your custom domain will point to Netlify’s servers (IP: 75.2.60.5). From there, Netlify will handle deploying your site to both your custom domain and the default Netlify subdomain.

![DNS-records management on Antagonist](../../../antagonist-records.JPG)