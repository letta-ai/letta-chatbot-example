<a href="https://docs.letta.com/">
  <img alt="Stateful AI agent chatbot template built with Letta and Next.js." src="/assets/chatbot_template_header_2x.png">
  <h1 align="center">Letta Chatbot Template</h1>
</a>

<p align="center">
  Deploy your own AI chatbot using <a href="https://docs.letta.com/">Letta</a> to create agents that can learn over time.
</p>

<div align="center">
|
  <a href="#-features">Features</a> · 
  <a href="#-whats-included">What's included</a> · 
  <a href="#%EF%B8%8F-quickstart">Quickstart</a> · 
  <a href="#-running-the-app-locally">Running the app locally</a>
|
</div>

###

<div align="center">
<h3>One-click deploy with Vercel</h3>
<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fletta-ai%2Fletta-chatbot-template&env=LETTA_ACCESS_TOKEN,LETTA_SERVER_URL&envDescription=(Optional)%20Your%20Letta%20access%20token%3A%20set%20it%20to%20any%20arbitrary%20value%20if%20none%20is%20provided.%20Default%20server%20url%20is%20http%3A%2F%2Flocalhost%3A3000&envLink=https%3A%2F%2Fgithub.com%2Fletta-ai%2Fletta-chatbot-template&project-name=my-letta-chatbot&repository-name=my-letta-chatbot"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a></div>
</div>

> [!NOTE]
> You must have a Letta server running to use this template. Follow this [quickstart guide](https://docs.letta.com/quickstart) to run your local Letta server.

## 📺 Video overview (watch on YouTube)

[![Build your own ChatGPT with memory using Letta](https://img.youtube.com/vi/JI8ioW2_iAU/0.jpg)](https://www.youtube.com/watch?v=JI8ioW2_iAU)

## ✨ Features

- [Letta](https://github.com/letta-ai/letta)

  - Formerly known as **MemGPT**, Letta is an open-source framework designed for building **stateful LLM applications**. Our chatbot webapp template showcases powerful core features of Letta.

- Static defined agent state
  - Define your agent state in the `default-agents.json` file. This file contains the initial state of your agents, including the LLM model, user profile, agent persona, and other configurations.
- Cookie-based sessions
  - Includes an implementation of cookie-based sessions to emulate users.
  - Can be disabled by setting `USE_COOKIE_BASED_AUTHENTICATION=false` to view all your agents from the ADE.
  - Different chat histories for different browsers. Tracks anonymous users across requests without requiring authentication.

## 📦 What's included

- [Letta TypeScript SDK](https://github.com/letta-ai/letta-node)

  - The Letta TypeScript library provides convenient access to the Letta API.

- [Next.js 15+](https://nextjs.org)

  - We leverage Next.js for its **server-side rendering (SSR)** and other performance optimizations, ensuring a fast and seamless user experience.

- [React](https://reactjs.org)

  - React provides a **component-based architecture**, enabling us to build **interactive and dynamic UIs** with reusable elements.

- [TypeScript](https://www.typescriptlang.org)

  - TypeScript enhances our codebase with **static typing, improved maintainability, and better developer tooling**, reducing potential runtime errors.

- [Shadcn UI](https://ui.shadcn.com)

  - Shadcn UI, built on [Tailwind CSS](https://tailwindcss.com), offers a collection of **modern, accessible UI components**, ensuring a cohesive and polished design.

- [React Markdown](https://github.com/remarkjs/react-markdown)
  - React Markdown allows us to **render Markdown content seamlessly**, making it easier to display formatted text within our application.

---

# ⚡️ Quickstart

### 📋 What you need before starting

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://docs.docker.com/get-docker/)

## 🚀 Running the app locally

#### 🔸 Set up your local Letta server

Follow the [quickstart guide](https://docs.letta.com/quickstart) to run your local Letta server.
You can run your own Letta server using [Letta Desktop](https://docs.letta.com/quickstart/desktop) or [Docker](https://docs.letta.com/quickstart/docker).
By default, the Letta server will run on `http://localhost:8283`.

#### 🔸 Setup and run the app

1️⃣ Clone the repository and install dependencies:

```bash
# Clone the repository
git clone git@github.com:letta-ai/letta-chatbot-template.git

# Navigate to the project directory
cd letta-chatbot-template

# Install dependencies
npm install

# Set environment variables
cp .env.template .env
```

2️⃣ Update the `.env` file with your Letta server URL

3️⃣ Update the default agents in the `default-agents.json` file

4️⃣ Run the app

```bash
npm run dev
```

### Environment variables

Environment variables can be controlled by setting them in your `.env` file or by setting them in your deployment environment.

- `LETTA_ACCESS_TOKEN` - Your Letta access token, if not using cloud this is usually optiona.
- `LETTA_SERVER_URL` - The URL of your Letta server. Default is `http://localhost:8283`.
- `NEXT_PUBLIC_CREATE_AGENTS_FROM_UI` - If set to `true` will show a `+` button in the sidebar to create new agents from the `default-agents.json` file. Default is `true`.
- `USE_COOKIE_BASED_AUTHENTICATION` - If set to `true` will use cookie-based sessions to emulate users. Default is `true`.

#### 🔸 See the app in action

Once the app is running, open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

## ☁️ Running the app with Letta Cloud

👾 TBA. Stayed tuned! [Follow us on Discord](https://discord.com/invite/letta) for updates.
