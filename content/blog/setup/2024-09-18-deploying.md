---
title: "Deploying a static website made with Zola to Netlify"
date: 2024-09-18
draft: true
---

# Deployment

For my personal website, [peterverheijen.nl](http://peterverheijen.nl), I used Hugo to build it. Hugo is a static website framework built with Go(lang). For deploying it I used an S3 bucket on Azure. There's an extension on VS Code that allows you to ship all of your files to your bucket and configure the bucket in such a way that your website url points to the files. 

This time, I’m interested in exploring other popular deployment options, such as Netlify and Vercel. However, after reading [this discussion](https://github.com/orgs/vercel/discussions/3181), it appears there are some current issues with Vercel. Therefore, I’ll be giving Netlify a try instead.

## Netlify

Creating an account on Netlify is straightforward, the [url](https://app.netlify.com/signup) for signing up. I'm hosting [my code](https://github.com/Pverheijen/pythontorust) on [Github](https://github.com/). For this reason I'm using Github as OAuth to my Netlify account. 

After logging in, you can create a new site. Since I already have a site the option to select is called "add new site" and whenever you click on this you create a new website with the following options <netlify-new-site.jpg>. If you already have your repository set up, I'd suggest importing an existing one. 

In order to instruct Netlify what to do, I suggest adding a netlify.toml to the root of your project to tell Netlify what the build process should look like. I've added the one for the Zola theme here.

```toml
[build]
command = "yarn install --frozen-lockfile && yarn build && zola build"
publish = "public"

[build.environment]
ZOLA_VERSION = "0.19.2"

[context.production.environment]
ZOLA_BASE_URL = "https://pythontorust.netlify.app/"
```

This theme is configured with tailwind.css and postcss. It requires you to build your css file before building the static website itself:

```bash
yarn install --frozen-lockfile
yarn build 
```

After which we can run:

```bash
zola build
```

This will ensure that our CSS file ends up in the public folder that contains all of the files that make up the website. These are the files that we deploy.

## Automation

By selecting our Github repository for the website, any PR to the main branch creates a preview build. Whenever we push to main or merge a branch into main, the website is rebuild and redeployed. For now this is to the default website that Netlify provides based on your website name: "https://[website-name].netlify.app/".

## Acquiring a new Domain

I've used [Antagonist](https://www.antagonist.nl/) in the past and I'll be buying a domain for this blog here as well. I've purchased [pythontorust.nl](pythontorust.nl) and this is the domain that you're currently visiting. 


## Domain Alias

Within Netlify you can manage your website. The name of your website will be used to generate the url to which your app is deployed. In my case this is [pythontorust.netlify.app](pythontorust.netlify.app). I'm using [www.pythontorust.nl](www.pythontorust.nl) and [pythontorust.nl](pythontorust.nl) as my domains (the latter one as the main URL).

<domain-management.jpg>

## Setting up A-record to Netlify
I've followed the docs to set up the a-record on my domain registrar (Antagonist), if you run into issues here and need help, reach out to me. 