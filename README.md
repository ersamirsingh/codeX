# codeX: LeetCode with AI Integration

## Project Description

codeX is a web application inspired by LeetCode, enhanced with AI integration to provide a more interactive and helpful learning experience for developers. It aims to provide a platform for users to practice coding problems, improve their algorithmic skills, and receive AI-powered assistance.

## Key Features & Benefits

-   **Problem Solving:** Access a wide range of coding problems with varying difficulty levels.
-   **AI Assistance:** Leverage AI for code analysis, hints, and solution suggestions.
-   **User-Friendly Interface:** Enjoy a clean and intuitive user experience.
-   **Real-time Code Editor:** Write and test code directly within the platform.
-   **Admin Panel:** Dedicated admin functionalities for Managing Questions

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

-   **Node.js:**  Version 18 or higher is recommended.
-   **npm:** Node Package Manager (usually included with Node.js).
-   **React:** Version 18 or higher
-   **Express.js:** Version 4 or higher
-   **Tailwind CSS:** Version 3 or higher

## Installation & Setup Instructions

Follow these steps to set up the project locally:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ersamirsingh/codeX.git
    cd codeX
    ```

2.  **Navigate to the Client Directory:**

    ```bash
    cd Client
    ```

3.  **Install Dependencies:**

    ```bash
    npm install
    ```

4.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

    This command will start the React development server, usually at `http://localhost:5173`.

## Project Structure

```
└── Client/
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    └── public/
        └── vite.svg
    └── src/
        └── API/
            ├── axiosClient.js
        ├── App.css
        ├── App.jsx
        └── Components/
            ├── AdminUpload.jsx
            ├── ChatAI.jsx
            ├── CreateProblem.jsx
            ├── DeleteProblem.jsx
            ├── Editorial.jsx
            ├── UpdateProblem.jsx
```

## Important Files

-   **Client/README.md:** Contains information about the React + Vite setup.
-   **Client/eslint.config.js:** ESLint configuration for code linting.
-   **Client/index.html:** Main HTML file for the React application.
-   **Client/package.json:** Lists project dependencies and scripts.
-   **Client/src/API/axiosClient.js:** Configuration for Axios, used for making API requests.

### Client/README.md
```md
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://swc.rs/) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint co...
```

### Client/eslint.config.js
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
    }
  }
])

### Client/index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./src/assets/react.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>codeX</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.jsx"></script>
  </body>
</html>

```

### Client/package.json
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.1",
    "@monaco-editor/react": "^4.7.0",
    "@reduxjs/toolkit": "^2.8.2",
    "@tailwindcss/vite": "^4.1.12",
    "axios": "^1.11.0",
    "cookie-parser": "^1.4.7",
    "daisyui": "^5.0.50",
    "dotenv": "^17.2.2",
    "express": "^5.1.0",
  }
}
```

### Client/src/API/axiosClient.js
```js
import axios from "axios"

const axiosClient =  axios.create({

    baseURL: 'https://codex-backend-ofca.onrender.com',
    
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
  
});


export default axiosClient;


```

## Usage Examples & API Documentation

### Running the Application

After installation, the application can be accessed through your web browser at `http://localhost:5173` (or the port specified by Vite).

### API Endpoints

The backend API base URL is defined in `Client/src/API/axiosClient.js`:

```javascript
const axiosClient =  axios.create({
    baseURL: 'https://codex-backend-ofca.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
```

This file exports an `axiosClient` instance configured for making requests to the backend. You can use it to interact with various endpoints.

## Configuration Options

-   **Environment Variables:** You can configure the application using environment variables. Define them in a `.env` file in the `Client/` directory (make sure it's added to `.gitignore`).

## Contributing Guidelines

We welcome contributions to codeX! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request to the main branch.

Please ensure your code follows the project's coding style and includes appropriate tests.

## License Information

The licensing terms for this project are not specified. Please contact the repository owner (ersamirsingh) for more information.

## Acknowledgments

-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Axios](https://axios-http.com/)
-   [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
