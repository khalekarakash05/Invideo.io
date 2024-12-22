# Invideo.io
# Frontend - React & Rust Calculator

This is the frontend for the "Two-Tab App" that handles two functionalities: 

1. **Rust Calculator** (Tab 1)
2. **AI-based Text-to-Shader Generator** (Tab 2)

## Features

### Tab 1: Rust Calculator
- **User Input**: A text input where users can enter simple mathematical expressions (e.g., `2+2`, `3*4`, `(5+7)/2`).
- **Rust & WASM**: The calculation is handled by Rust, compiled to WebAssembly (WASM), which runs in the browser.
- **Result Display**: Displays the calculated result in the React UI.

### Tab 2: AI-based Text-to-Shader
- **User Input**: A text input where users can describe a shader (e.g., "A rotating cube with a gradient background").
- **AI Response**: An AI (likely powered by an LLM) provides a response based on the description entered.
- **Shader Output**: Displays the raw shader code returned by the backend in a `<pre>` tag.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/khalekarakash05/Invideo.io.git
   cd frontend

2. Install dependencies:
   ```bash
   npm install
   
3. move to shader-generator directory
   ```bash
   cd shader-generator
   
4. start the frontend App
     ```bash
     npm start

## Tech Stack
- React
- Rust (compiled to WebAssembly)

# Notes

 - The AI in Tab 2 generates answers based on text input, simulating shader generation.
 - The WebGL canvas functionality is a placeholder for more complex shader rendering.


## Backend - Elixir & LLM Integration

This is the backend for the "Two-Tab App" that provides an API endpoint for the **AI-based Text-to-Shader Generator** functionality.

## Features

- **API Endpoint**: An Elixir-based API that receives the user’s shader description and queries an LLM (e.g., GPT, Gemini) for a shader code.
- **AI Integration**: Sends the user’s input to an AI model to generate shader code (vertex/fragment shaders).
- **Error Handling**: If the shader code is invalid or non-compilable, the backend returns the raw output with an error message.

## Setup Instructions

1. Clone the repository:

    ```bash
git clone https://github.com/yourusername/backend.git
cd backend

2. Install Elixir dependencies:

   ```bash
   mix deps.get

3. Configure your LLM API (e.g., GPT, Gemini) by setting the API key or endpoint in the configuration file.

4. Start the Elixir server:

   ```bash
   mix phx.server

## API Endpoints

#POST /api/generate_shader

1. Description: Receives a user input (shader description) and returns the generated shader code.
2. Request Body
     ```bash
         { "description": "give detailed information about rust language"}
3. Response Body
     ```bash
     "shader_code": ""

## Tech Stack
- Elixir
- Phoenix Framework
- Integration with LLM API (e.g., GPT, Gemini)


# Notes

- The backend handles shader generation by querying an LLM and returning the shader code.
- If the shader is invalid or non-compilable, the raw output is returned to the frontend.
