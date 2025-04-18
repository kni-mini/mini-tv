# Database Documentation

This project uses Drizzle ORM with PostgreSQL for database management.

## Schema Structure

Each schema is defined in a separate file under the `db/schema` directory. This modular approach makes it easier to maintain and understand the database structure.

### Current Schemas

- `users.ts`: User management table
- `organizations.ts`: Organization management table
- `user-organizations.ts`: Many-to-many relationship between users and organizations
- `group-types.ts`: Group type definitions
- `groups.ts`: Unified group management table
- `events.ts`: Event management table
- `announcements.ts`: Announcement management table
- `images.ts`: Image management table
- `posters.ts`: Poster management table
- `utils.ts`: Utility functions for schema definitions

## Table Descriptions

### Users Table

- `id`: Primary key
- `username`: Unique username
- `password`: Hashed password
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

### Organizations Table

- `id`: Primary key
- `name`: Organization name (unique when not deleted)
- `short_name`: Organization short name (unique when not deleted)
- `image_id`: Image identifier
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

### User Organizations Table

- `user_id`: Foreign key to users table
- `organization_id`: Foreign key to organizations table
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp
- Primary key: Composite of `user_id` and `organization_id`

### Group Types Table

- `id`: Primary key
- `name`: Type name (unique)
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

### Groups Table

- `id`: Primary key
- `name`: Group name (unique when not deleted)
- `color`: Hex color code
- `type_id`: Foreign key to group_types table
- `user_id`: Foreign key to users table
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

### Events Table

- `id`: Primary key
- `name`: Event name (unique when not deleted)
- `starts_at`: Event start time
- `ends_at`: Event end time
- `all_day`: Whether the event is all-day
- `group_id`: Foreign key to groups table (optional)
- `user_id`: Foreign key to users table
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

### Announcements Table

- `id`: Primary key
- `name`: Announcement name (unique when not deleted)
- `message`: Markdown content
- `group_id`: Foreign key to groups table (optional)
- `user_id`: Foreign key to users table
- `start_date`: When the announcement becomes visible (defaults to creation time)
- `end_date`: When the announcement should be hidden (null means visible indefinitely)
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

### Images Table

- `id`: Primary key
- `file`: Base64 encoded image file
- `name`: Image name (optional)
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

### Posters Table

- `id`: Primary key
- `name`: Poster name (unique when not deleted)
- `image_id`: Foreign key to images table
- `group_id`: Foreign key to groups table (optional)
- `user_id`: Foreign key to users table
- `start_date`: When the poster becomes visible (defaults to creation time)
- `end_date`: When the poster should be hidden (null means visible indefinitely)
- `created_at`: Creation timestamp
- `deleted_at`: Soft delete timestamp

## Soft Delete Implementation

The database implements soft deletes using a `deleted_at` timestamp field. When a record is "deleted", its `deleted_at` field is set to the current timestamp instead of being physically removed from the database.

### Unique Constraints with Soft Deletes

Unique constraints (like event names, group names, announcement names, poster names, and organization names/short names) are implemented as partial unique indexes that only consider non-deleted records. This means:

1. You cannot have two active (non-deleted) records with the same name
2. You can have multiple deleted records with the same name
3. You can reuse a name that was previously used by a deleted record

For example:

- If you have a group named "Meeting" and delete it
- You can create a new group named "Meeting"
- But you cannot have two active groups both named "Meeting"

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
pnpm db:generate --name descriptive_name_in_snake_case
```

The migration name must:

- Be in snake_case format (lowercase letters, numbers, and underscores)
- Be descriptive of the changes being made
- Be provided using the --name flag

Examples of good migration names:

- `add_start_end_dates_to_content`
- `create_users_table`
- `add_soft_delete_to_events`

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
