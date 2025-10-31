# Development Workflow

## Philosophy: Railway Database for Everything

**Use Railway's PostgreSQL database for both local development and production.**

This ensures:
- ✅ Same database structure everywhere
- ✅ No local PostgreSQL setup needed
- ✅ Real database behavior from day one
- ✅ Easy to test migrations
- ✅ Shared test data

## Workflow

### Initial Setup

1. **Create Railway database:**
   ```bash
   # Go to railway.app
   # Create project → Add PostgreSQL service
   # Copy DATABASE_URL from Railway dashboard
   ```

2. **Configure local environment:**
   ```bash
   cp .env.example .env
   # Add DATABASE_URL from Railway to .env
   ```

3. **Initialize database:**
   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Create tables in Railway database
   ```

4. **Seed initial data:**
   ```bash
   npm run seed:packages  # Adds initial tarot packages
   ```

### Daily Development

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Make code changes:**
   - Edit API routes, components, etc.
   - All database calls go to Railway database via `DATABASE_URL` in `.env`

3. **Make schema changes:**
   ```bash
   # Edit prisma/schema.prisma
   npm run db:push  # Updates Railway database
   ```

4. **Test API endpoints:**
   - Use Railway database (same as production)
   - Check data in Railway dashboard or via API

### Deployment

1. **Deploy to Railway:**
   - Railway web service connects to same PostgreSQL service
   - `DATABASE_URL` auto-injected by Railway
   - No migration needed (schema already in Railway DB)

2. **Run migrations (if using migration files):**
   ```bash
   # Via Railway CLI or dashboard
   npx prisma migrate deploy
   ```

## Database Connection

**Local Development:**
- Uses `DATABASE_URL` from `.env` file
- Points to Railway PostgreSQL service
- Same database as production

**Production (Railway Web Service):**
- Railway automatically injects `DATABASE_URL`
- Connects to same PostgreSQL service
- No manual configuration needed

## Advantages

✅ **No local PostgreSQL needed** - Railway handles everything  
✅ **Consistency** - Dev and production use same database  
✅ **Easy testing** - Real database behavior  
✅ **Simple setup** - Just copy connection string  
✅ **Shared data** - Test data accessible everywhere  
✅ **Railway management** - Backups, scaling handled by Railway

## Common Tasks

**View database data:**
- Railway Dashboard → PostgreSQL → Query tab
- Or use Prisma Studio: `npx prisma studio` (connects via `.env`)

**Reset database:**
- Drop tables in Railway dashboard
- Run `npm run db:push` again

**Test migrations:**
- Create migration: `npx prisma migrate dev --name migration_name`
- Test against Railway database
- Deploy: `npx prisma migrate deploy`

**Seed test data:**
```bash
npm run seed:packages
# Or create custom seed scripts
```

## Notes

- **Never commit `.env`** - Contains Railway database credentials
- **Always use Railway database** - Don't set up local PostgreSQL
- **Database is shared** - Changes affect both dev and prod (be careful!)
- **For production isolation** - Consider separate Railway database service later
- **Backup strategy** - Railway handles automatic backups on paid plans

