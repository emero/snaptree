# Snaptree

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Overview

This project is a web application designed with a robust tech stack. The frontend is built with **Next.js**, styled with **Tailwind CSS**, uses **Konva** for `<canvas>` manipulation, and manages complex state using **Xstate**. The backend uses **Node.js** with **Express**. **UploadThing** handles secure and efficient image upload management.

## Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org/)
- [Xstate](https://xstate.js.org/docs/)
- [Konva](https://konvajs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Why Xstate?

Xstate brings powerful, finite-state management to modern web apps, making it ideal for handling complex and predictable UI logic. By modeling state as finite state machines (FSMs) or statecharts, Xstate enables clear definitions of each possible state and the transitions between them. This structured approach prevents edge cases and unhandled states, which can be common in asynchronous applications. Xstate’s visual tools also make it easy to see and debug state flows, and its integration with React and Next.js ensures that UIs respond consistently to user actions, backend responses, and error states, making applications more robust, predictable, and easier to maintain.

The following chart describing the app's logic was generated directly from the project's code and is executable even without the specific frontend implementation:
![image](https://github.com/user-attachments/assets/3a4e6bf9-b90d-4ca3-a2e8-12776bf09cd9)

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

**Image Uploads:**

- [UploadThing](https://uploadthing.com/)

## Setup and Installation

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** (v6 or higher) installed on your machine.

### Installation and running the project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/emero/snaptree
   cd snaptree
   ```

2. **Install all dependencies:**

   ```bash
   npm run install-all
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables)).

4. **Start the backend and frontend server concurrently:**
   ```bash
   npm start
   ```

The frontend app should now be running on `http://localhost:3000`.

## Environment Variables

In the `backend` folder Rename the `.env.example` to `.env` file in the root directory and add the following environment variable:

- **UPLOADTHING_TOKEN**: API key for UploadThing image management.
