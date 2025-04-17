# Database Documentation

This project uses Drizzle ORM with PostgreSQL for database management.

## Schema Structure

Each schema is defined in a separate file under the `db/schema` directory. This modular approach makes it easier to maintain and understand the database structure.

### Current Schemas

- `users.ts`: Contains the user table schema

## Database Commands

### Development

To start the development database:
```bash
pnpm db:dev:up
```

To stop the development database:
```bash
pnpm db:dev:down
```

### Production

To start the production database:
```bash
pnpm db:prod:up
```

To stop the production database:
```bash
pnpm db:prod:down
```

### Migrations

To generate migrations:
```bash
pnpm db:generate
```

To apply migrations:
```bash
pnpm db:migrate
```

## Environment Variables

The following environment variables are required:

- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `POSTGRES_HOST`: Database host
- `POSTGRES_PORT`: Database port
- `DATABASE_URL`: Full database connection URL

## Adding New Schemas

1. Create a new file in `db/schema` directory
2. Define your schema using Drizzle ORM's table definition syntax
3. Export the schema
4. Generate and apply migrations

Example:
```typescript
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const myTable = pgTable('my_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});
``` 