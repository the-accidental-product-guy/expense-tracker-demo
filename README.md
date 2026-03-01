# Expense Tracker — Claude Code Workshop

A starter project for learning **Claude Code** fundamentals. Built with Next.js + Tailwind CSS.

The app intentionally has **2 bugs** and **1 missing feature** — your job is to find and fix them using Claude Code.

---

## Setup

```bash
npm install
npm run dev
```

Open **http://localhost:3000**

---

## Workshop Exercises

### Exercise 1: Explore the Codebase (15 min)

Before touching any code, use Claude Code to understand what you're working with.

Try asking Claude:
- *"Explain the structure of this project"*
- *"How does adding a new expense work, end to end?"*
- *"What does `lib/storage.js` do?"*

**Goal:** Get comfortable using Claude to read and explain code you didn't write.

---

### Exercise 2: Find & Fix the Bugs (30 min)

There are **2 bugs** in this app. Both are visible the moment you open it.

**Bug 1 — The total is wrong**

Look at the expense list. The "Total" at the bottom doesn't show a correct dollar amount.

> Ask Claude: *"Why is the total showing the wrong value?"*

**Bug 2 — Delete doesn't work**

Click the × button on any expense. Nothing happens — the expense stays in the list.

> Ask Claude: *"Why doesn't the delete button work?"*

**Goal:** Use Claude to trace bugs across multiple files. Notice how it reads the code before suggesting a fix.

---

### Exercise 3: Implement the Missing Feature (25 min)

The summary panel at the top shows a warning:
> ⚠️ The `/api/summary` endpoint needs to be implemented.

Open `app/api/summary/route.js` — it returns a `501 Not Implemented`. Your task is to build it.

The expected response shape is documented in the file comments.

> Ask Claude: *"Help me implement the summary API endpoint"*

Once the API works, the summary panel should show total spent, top category, and number of active categories.

**Goal:** Add a new feature by creating an API endpoint and wiring it to an existing component.

---

### Exercise 4: Write Tests (20 min)

The `lib/` functions are pure and easy to test. Write unit tests for:
- `lib/storage.js` — `addExpense`, `deleteExpense`, `getExpenses`
- `lib/utils.js` — `formatCurrency`, `getCategoryColor`

> Ask Claude: *"Set up a test runner and write tests for lib/storage.js"*

Claude will choose a test framework, configure it, and write the tests. Let it run them and fix any failures autonomously.

**Goal:** See Claude handle the full testing workflow: setup, write, run, fix.

---

### Exercise 5: Set Up CLAUDE.md (10 min)

`CLAUDE.md` is a file Claude reads at the start of every session. It's how you encode project conventions so Claude follows them automatically.

Add some rules, for example:
- *"All monetary amounts must be stored and passed as numbers, never strings."*
- *"API routes must return consistent error shapes: `{ error: string }`"*
- *"Use `formatCurrency()` from `lib/utils.js` for all currency display"*

Then ask Claude to review the codebase and check if any code violates your new rules.

**Goal:** Understand how CLAUDE.md shapes Claude's behavior in your project.

---

### Exercise 6: Deploy to Vercel (15 min)

> Make sure you have a Vercel account at vercel.com

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your app will be live in under a minute.

> Ask Claude: *"What will happen to the expense data when I deploy to Vercel?"*

This opens a good discussion about in-memory storage vs persistent databases, and what it would take to add a real database.

**Goal:** Deploy a Next.js app to Vercel and understand its production limitations.

---

## Bug Spoilers

<details>
<summary>Bug 1 — click to reveal</summary>

**File:** `lib/storage.js`

The seed data stores amounts as strings: `amount: "85.50"` instead of `amount: 85.50`.

When `addExpense` is called from the form, the amount from `<input type="number">` is also passed as a string and stored as-is.

In `ExpenseList.jsx`, the total is calculated with:
```js
const total = filtered.reduce((sum, e) => sum + e.amount, 0);
```

JavaScript's `+` operator with a string triggers concatenation: `0 + "85.50"` → `"085.50"`, then `"085.50" + "42.00"` → `"085.5042.00"`, and so on. The resulting string passed to `formatCurrency` displays as `$NaN`.

**Fix:** In `addExpense`, parse the amount: `amount: parseFloat(amount)`. Also fix the seed data.

</details>

<details>
<summary>Bug 2 — click to reveal</summary>

**File:** `lib/storage.js`

The `deleteExpense` function:
```js
expenses = expenses.filter(e => e.id !== id);
```

`e.id` is a **number** (e.g., `1`), but `id` arrives from the URL parameter as a **string** (e.g., `"1"`).

In JavaScript, `1 !== "1"` is `true` — so every expense passes the filter and nothing is deleted. The API returns `404 Expense not found`.

**Fix:** Convert `id` to an integer: `expenses.filter(e => e.id !== parseInt(id, 10))`.

</details>

---

## Project Structure

```
expense-tracker-demo/
├── app/
│   ├── page.js                     # Main page (client component)
│   ├── layout.js
│   ├── globals.css
│   └── api/
│       ├── expenses/
│       │   ├── route.js            # GET all, POST new
│       │   └── [id]/route.js       # DELETE by id
│       └── summary/
│           └── route.js            # GET summary (Exercise 3)
├── components/
│   ├── ExpenseForm.jsx             # Add expense form
│   ├── ExpenseList.jsx             # List + filter + delete
│   └── SummaryPanel.jsx            # Summary cards
├── lib/
│   ├── storage.js                  # In-memory data store
│   └── utils.js                    # Formatting helpers + category list
└── CLAUDE.md                       # Project instructions for Claude
```
