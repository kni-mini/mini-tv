This app is inspired by: https://github.com/echo-webkom/echo-screen

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Code Quality

This project uses pre-commit hooks to maintain code quality. The following checks are performed automatically before each commit:

- ESLint for TypeScript/JavaScript code quality
- Prettier for code formatting
- Automatic fixing of common issues

The configuration files are:

- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier formatting rules
- `.lintstagedrc` - Configuration for which files to check

## Database Setup

This project uses Drizzle ORM with PostgreSQL. For detailed database documentation, see [db/README.md](db/README.md).

### Development Database

To start the development database:

```bash
pnpm db:dev:up
```

To stop the development database:

```bash
pnpm db:dev:down
```

### Production Database

To start the production database:

```bash
pnpm db:prod:up
```

To stop the production database:

```bash
pnpm db:prod:down
```

### Database Migrations

To generate migrations:

```bash
pnpm db:generate
```

To apply migrations:

```bash
pnpm db:migrate
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=minitv
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
