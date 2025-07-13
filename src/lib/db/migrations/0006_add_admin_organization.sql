INSERT INTO "organizations" ("name", "short_name") VALUES ('Admins', 'Admins');
INSERT INTO "user_organizations" ("user_id", "organization_id") VALUES (
    (SELECT id FROM "users" WHERE email = 'admin@admin.com'), (SELECT id FROM "organizations" WHERE name = 'Admins')
);