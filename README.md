## Overview :
  This application is built using Next.js, Drizzle ORM, and Supabase.
  It is a demo platform for creating and managing articles. The system supports two types of users: Admin and User (Contributor).

### Definitions:
  **Article:** An article refers to any poetic text created by a contributor. This may include poetry, songs, religious prayers, or similar creative writing.
  **Contributor:** A user who creates an account and contributes articles to the application.

### User Roles & Permissions:
  **Admin:**
    Can create, update, and delete Tags, Authors, and Articles
    Can manage (update/delete) any user or any article in the system

  **User (Contributor):**
    Can create, edit, and delete their own Articles
    Cannot modify Tags, Authors, or Articles created by others

### Models / Database Tables:
  **Article: **
    Contains article content such as poetry or any written work associated with an author.
  **Author:**
    Represents different authors for articles. Authors can only be created or managed by an Admin.
  **Tag:** 
    Represents tags/categories assigned to articles. Tags can only be created or managed by an Admin.

### Services & Features:
  1.User authentication via Supabase
  2.CRUD operations for:
    **Admin:** Tags, Authors, and Articles
    **User (Contributor):** Articles only
  3.Integration with Drizzle ORM for database operations
  4.Supabase as the backend database service

### Local Development Setup
  Follow these steps to run the app locally:

  1. Clone the repository
    ```git clone git@github.com:umakant-rails/articles_drizzle_supabase.git```

  2. Install dependencies
    ```npm install```

  3. Set up Supabase
    Log in to the Supabase dashboard
    Create a new project/database

  4. Configure environment variables
    Create a .env.local file and add the following values:
      ```
      NEXT_PUBLIC_SUPABASE_URL=
      NEXT_PUBLIC_SUPABASE_ANON_KEY=
      DATABASE_URL=
      SUPABASE_SERVICE_ROLE_KEY=
      NEXTAUTH_SECRET=```

  5. Run database migrations
     
    ```npx drizzle-kit generate
    npx drizzle-kit migrate```

  7. Start the development server
     
    ```npm run dev```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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
