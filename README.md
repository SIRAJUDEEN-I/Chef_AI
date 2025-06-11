# Chef Ai

Chef Ai is a web application that suggests recipes based on the ingredients you have on hand. Powered by Google Gemini AI, it generates easy-to-follow recipes in markdown format, making it simple to cook with what you already have.

## Features

- Enter a list of ingredients you have.
- Get AI-generated recipes using Google Gemini.
- Clean, responsive UI built with React and Tailwind CSS.
- Recipes are formatted in markdown for easy reading.
- Smooth animations and accessibility features.

## Demo

![Chef Ai Screenshot](./src/assets/logo.png)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/chef_Ai.git
   cd Chef_Ai
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up your environment variables:**

   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```
   VITE_API_KEY=your_gemini_api_key_here
   ```

   > You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**

   Visit [http://localhost:5173](http://localhost:5173) to use the app.

## Project Structure

```
├── src/
│   ├── components/
│   │   └── BodySec/
│   │       ├── BodySec.jsx
│   │       └── AiRecipe.jsx
│   │   └── animation/
│   │       └── FadeContent.jsx
│   ├── assets/
│   ├── ai.js
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── vite.config.js
└── README.md
```

## Technologies Used

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Google Gemini API](https://aistudio.google.com/app/apikey)
- [react-markdown](https://github.com/remarkjs/react-markdown)

## License

This project is licensed under the MIT License.

---

**Made with ❤️ for foodies and coders!**
