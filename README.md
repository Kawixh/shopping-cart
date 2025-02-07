# Shopping Cart - Next.js E-commerce Project

## Project Overview

This project is a fully functional e-commerce shopping cart application built with Next.js. It allows users to browse products, view product details, and add products to a cart (Note: Cart functionality is a future implementation). The application uses a PostgreSQL database with Drizzle ORM for data management. It also integrates with Clerk for authentication, allowing users to sign up and sign in. The project fetches product data from both a fake store API and the Etsy API, showcasing the ability to ingest data from multiple sources. The UI is built with Tailwind CSS and Shadcn/ui components, providing a modern and responsive user experience.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (version 20 or higher - see `.nvmrc`)
- Docker (if you want to run the database in a container)
- A Clerk account and API keys
- An Etsy account and API keys (if you want to ingest Etsy products)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd shopping-cart
    ```

2.  Install the dependencies:

    ```bash
    npm install # or yarn install or pnpm install or bun install
    ```

3.  Set up the environment variables:

    - Create a `.env.local` file in the root directory.
    - Add the following environment variables, replacing the placeholders with your actual values:

      ```
      DATABASE_URL=<your_database_url>
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
      CLERK_SECRET_KEY=<your_clerk_secret_key>
      NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
      NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
      ETSY_API_KEY=<your_etsy_api_key>
      ETSY_KEYSTRING=<your_etsy_keystring>
      ETSY_SHARED_SECRET=<your_etsy_shared_secret>
      NEXT_URL=http://localhost:3000 # or your production URL
      ```

      **Note:** You'll need to create a Clerk application and obtain the API keys from the Clerk dashboard. For Etsy API keys, you'll need to create a developer account on Etsy.

4.  Set up the database:

    - **Option 1: Using Docker (Recommended for local development)**

      - Run the provided script to start a PostgreSQL database in a Docker container:

        ```bash
        ./start-database.sh
        ```

        This script (startLine: 1, endLine: 61) will create a Docker container named `t3_example-postgres` and expose it on port specified in your `DATABASE_URL`. It also handles generating a random password if you are using the default one.

      - Alternatively, you can use `docker compose` with a `compose.yaml` file:

        ```yaml
        version: "3.9"
        services:
          postgres:
            image: postgres:latest
            container_name: t3_example-postgres
            ports:
              - "5432:5432"
            environment:
              POSTGRES_USER: postgres
              POSTGRES_PASSWORD: your_db_password
              POSTGRES_DB: t3_example
            volumes:
              - postgres_data:/var/lib/postgresql/data

        volumes:
          postgres_data:
        ```

        Then run:

        ```bash
        docker compose up -d
        ```

    - **Option 2: Using a local PostgreSQL installation**

      - Make sure you have PostgreSQL installed and running on your machine.
      - Update the `DATABASE_URL` environment variable with the connection string to your local PostgreSQL database.

5.  Run database migrations:

    ```bash
    npm run db:push # or yarn db:push or pnpm db:push or bun db:push
    ```

    This command uses Drizzle Kit to push the database schema to your PostgreSQL database.

6.  Ingest product data:

    ```bash
    npm run ingest # or yarn ingest or pnpm ingest or bun ingest
    ```

    This command runs the `src/scripts/ingest/index.ts` script (startLine: 15, endLine: 42), which fetches product data from the Fake Store API and the Etsy API and inserts it into the database. You can modify the script to adjust the number of products ingested or the keywords used for Etsy product search.

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Technologies Used

- **Next.js:** A React framework for building performant and scalable web applications.
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Tailwind CSS:** A utility-first CSS framework for rapidly styling HTML elements.
- **Shadcn/ui:** A collection of accessible and reusable UI components built with Radix UI and Tailwind CSS. See `components.json` (startLine: 1, endLine: 21) for configuration.
- **Clerk:** Authentication and user management solution.
- **Drizzle ORM:** A lightweight TypeScript ORM for interacting with the database. See `drizzle.config.ts` (startLine: 1, endLine: 15) for configuration.
- **PostgreSQL:** An open-source relational database management system.
- **Neon:** A serverless Postgres platform.
- **Zod:** A TypeScript-first schema validation library.
- **Radix UI:** A set of unstyled, accessible UI primitives.
- **Vercel:** A platform for deploying and hosting web applications (deployment is optimized for Vercel).
- **next-themes:** For theme management
- **react-hook-form:** For form management
- **sharp:** For image processing

## Project Scope

### Implemented Features

- **Product Browsing:** Users can view a list of products with images, names, prices, and ratings. See `src/app/shop/page.tsx` (startLine: 13, endLine: 74).
- **Product Details:** Users can view detailed information about a specific product, including description, category, and availability. See `src/app/shop/[slug]/page.tsx` (startLine: 27, endLine: 99).
- **User Authentication:** Users can sign up and sign in using Clerk. See `src/middleware.ts` (startLine: 5, endLine: 9) for protected routes.
- **Data Ingestion:** Product data is automatically ingested from the Fake Store API and the Etsy API. See `src/scripts/ingest/index.ts` (startLine: 15, endLine: 42).
- **Database Integration:** The application uses a PostgreSQL database to store product data. See `src/db/schema/products.ts` (startLine: 23, endLine: 39) for the product schema.
- **Theme Support:** The application supports light, dark, and system themes. See `src/components/theme-provider.tsx` (startLine: 6, endLine: 10) and `src/components/ui/mode-toggle.tsx` (startLine: 14, endLine: 38).
- **Image Optimization:** Next.js Image component is used for image optimization, including placeholder generation. See `src/utils/images.ts` (startLine: 22, endLine: 41) for placeholder generation logic.
- **Vendor Registration:** Vendor registration form is implemented, but the actual vendor dashboard and functionalities are not yet implemented. See `src/components/auth/VendorRegistrationForm.tsx` (startLine: 21, endLine: 87).
- **Coach Registration:** Coach registration form is implemented, but the actual coach dashboard and functionalities are not yet implemented. See `src/components/auth/CoachRegistrationForm.tsx` (startLine: 17, endLine: 65).

### To Be Implemented

- **Shopping Cart Functionality:** Implement the ability for users to add products to a shopping cart, view the cart, update quantities, and remove products.
- **Checkout Process:** Implement a secure checkout process with payment gateway integration (e.g., Stripe, PayPal).
- **Order Management:** Implement order management functionality for users to view their order history and track order status.
- **User Profiles:** Allow users to manage their profiles, including updating their personal information and addresses.
- **Search Functionality:** Implement a search feature to allow users to easily find products based on keywords.
- **Filtering and Sorting:** Add filtering and sorting options to the product listing page.
- **Product Reviews:** Implement a system for users to leave reviews and ratings for products.
- **Admin Dashboard:** Create an admin dashboard for managing products, users, and orders.
- **Vendor Dashboard:** Implement a dashboard for vendors to manage their products, orders, and profile.
- **Coach Dashboard:** Implement a dashboard for coaches to manage their profile and related functionalities.
- **Etsy Integration Improvements:** Improve the Etsy integration to handle pagination and more complex search queries using `src/lib/etsy/client.ts` (startLine: 41, endLine: 87).
- **Testing:** Implement unit and integration tests to ensure the quality and stability of the application.
- **SEO Optimization:** Implement SEO best practices to improve the visibility of the application in search engine results.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.
