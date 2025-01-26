# Function Calculation App

This is a React application built with TypeScript and Vite. The app allows users to input a value and see how it is transformed through a series of mathematical functions. It provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules.

## Features

- React with TypeScript
- Vite for fast development and build
- ESLint for code quality and consistency
- Hot Module Replacement (HMR) for a better development experience
- Canvas for drawing connection lines between functions
- Validator for validating expressions entered in function cards

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your development machine. You can download Node.js from [here](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/deepshi1410/function-calculation-app.git
   cd function-calculation-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server with HMR, run:
```bash
npm run dev
```

This will start the Vite development server and you can access the application at `http://localhost:3000`.

### Building for Production

To build the application for production, run:
```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

### Linting

To lint the codebase using ESLint, run:
```bash
npm run lint
```

## Application Structure

### Components

- **`src/main.tsx`**: The entry point of the React application. Sets up the root component and renders the `App` component inside the HTML element with the id `root`.
  
- **`src/App.tsx`**: The main application component that renders the `FunctionChainCalculator` component.
  
- **`src/pages/FunctionChainCalculator.tsx`**: The core component managing the entire function calculation logic. It handles the state of functions, input value, and connections between functions using several custom hooks:
  - **`useJoiningPoints`**: Manages the points where functions connect.
  - **`useFunctionConnections`**: Calculates the connections between functions.
  - **`useOutputCalculator`**: Computes the final output based on the input value and the function chain.

- **`src/components/Function/InputOutput.tsx`**: A reusable component for entering input values and displaying the final output. It distinguishes between input and output based on props. Also updates the position of the input and output fields for connection purposes.
  
- **`src/components/Function/FunctionsList.tsx`**: Displays a list of functions and allows users to update the equations and connections between them.
  
- **`src/components/Canvas/ConnectionCanvas.tsx`**: Renders the visual connections between functions using canvas. Draws lines or arrows to represent the flow of function calculations.

### Custom Hooks

- **`src/hooks/useJoiningPoints.ts`**: Manages the points where functions connect. Provides methods to update and retrieve the positions of these points.
  
- **`src/hooks/useFunctionConnections.ts`**: Calculates the connections between functions based on their joining points and the function chain.
  
- **`src/hooks/useOutputCalculator.ts`**: Calculates the final output based on the initial input value and the chain of function calculations.

### Expression Validator

- **Validator**: Validates the mathematical expressions entered in the input fields of function cards. Ensures that the user inputs valid equations for the functions.

## Overall Flow

1. **Initialization**:
   - The application starts by rendering the `App` component, which in turn renders the `FunctionChainCalculator` component.

2. **State Management**:
   - `FunctionChainCalculator` initializes the state with a list of functions and an initial input value.
   - Custom hooks manage the joining points, connections, and output calculation.

3. **User Interaction**:
   - The user can input the initial value of `x` using the `InputOutput` component.
   - The user can update the equations of the functions and their connections using the `FunctionsList` component.
   - The validator ensures that the equations entered are valid.

4. **Dynamic Updates**:
   - The application dynamically updates the connections and final output as the user changes the input value or function equations.
   - The `ConnectionCanvas` component visually represents the connections between functions.

5. **Final Output**:
   - The final output value is displayed using the `InputOutput` component, showing the result of the chain of function calculations.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or need further assistance, feel free to reach out to me at deepshisharma123@gmail.com.

