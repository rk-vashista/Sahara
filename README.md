# Svelte E-Commerce Application

A simple e-commerce application built with Svelte. This project includes features like product listing, cart management, and checkout. The application uses Svelte stores to manage the cart state and ensures that changes are reflected across different components.

## Features

- **Product Listing**: View a list of products with descriptions and prices.
- **Product Details**: View detailed information about each product.
- **Cart Management**: Add products to the cart, view cart contents, and proceed to checkout.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Setup and Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/rk-vashista/Sahara.git
   cd Sahara
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   This will start a local development server. Open your browser and go to `http://localhost:5000` to view the application.

4. **Build the Project**

   To build the project for production, run:

   ```bash
   npm run build
   ```

   The built files will be available in the `public` directory.


## Svelte Stores

### Cart Store

The cart store (`cartStore.ts`) manages the state of the shopping cart across the application. It is used to add, remove, and update items in the cart.

## Development

- **Code Linting**: Use [ESLint](https://eslint.org/) for JavaScript/TypeScript linting and [Prettier](https://prettier.io/) for code formatting.
- **Testing**: Add tests using [Jest](https://jestjs.io/) or another testing framework of your choice.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Please follow the project's coding standards and ensure that your changes are well-documented.

## License

This project is licensed under the [MIT License](LICENSE).