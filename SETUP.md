# My Todo App - Setup Guide

A todo list app with user registration, login, and database storage.
Built with Next.js + Supabase.

## How it works

```
Browser (React UI)
    │
    ▼
Vercel (hosts your Next.js app)
    │
    ▼
Supabase (PostgreSQL database + user auth)
```

---

## Step 1: Set up Supabase (free database + auth)

1. Go to https://supabase.com and click **Start your project**
2. Sign up with your GitHub account
3. Click **New Project**, pick a name and password, choose a region
4. Wait ~2 minutes for the project to be created

### Create the database table

5. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
6. Paste this SQL and click **Run**:

```sql
-- Create the todos table
create table todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
  text text not null,
  is_done boolean default false,
  created_at timestamptz default now()
);

-- Enable Row Level Security (so users can only see their own todos)
alter table todos enable row level security;

-- Policy: users can only see their own todos
create policy "Users can view their own todos"
  on todos for select
  using (auth.uid() = user_id);

-- Policy: users can insert their own todos
create policy "Users can create their own todos"
  on todos for insert
  with check (auth.uid() = user_id);

-- Policy: users can update their own todos
create policy "Users can update their own todos"
  on todos for update
  using (auth.uid() = user_id);

-- Policy: users can delete their own todos
create policy "Users can delete their own todos"
  on todos for delete
  using (auth.uid() = user_id);
```

### Get your API keys

7. Go to **Settings** → **API** in the Supabase dashboard
8. Copy the **Project URL** and **anon public** key

---

## Step 2: Configure your app

Edit the file `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with the ones you copied from Supabase.

---

## Step 3: Run locally

```bash
cd my-todo-app
npm run dev
```

Open http://localhost:3000 in your browser. You should see the login page!

---

## Step 4: Deploy to Vercel (make it public)

1. Push your code to GitHub:
   ```bash
   cd my-todo-app
   git add .
   git commit -m "Initial todo app"
   ```
   Then create a repo on GitHub and push to it.

2. Go to https://vercel.com and sign in with GitHub

3. Click **Import Project** → select your `my-todo-app` repo

4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

5. Click **Deploy**

6. Your app is now live at `https://your-app-name.vercel.app`!

---

## What you get

- **User registration** - anyone can create an account
- **User login** - secure authentication via Supabase
- **Personal todo list** - each user only sees their own todos
- **Add / complete / delete todos** - full CRUD operations
- **Data stored in PostgreSQL** - persistent, real database
- **Row Level Security** - users cannot access each other's data
