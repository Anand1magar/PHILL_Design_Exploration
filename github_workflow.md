# GitHub Workflow — Anand & Isa

This project lives at: https://github.com/Anand1magar/PHILL_Design_Exploration

---

## One-Time Setup

### Anand (repo owner)
1. Go to your repo on GitHub
2. Settings → Collaborators → Add people → add Isa's GitHub username
3. She will get an email invite — she needs to accept it

### Isa (first time only)
1. Accept the GitHub collaborator invite from the email
2. Open VS Code and install the **Claude Code** extension
3. Open terminal, then tell Claude:
   > "Clone this repo: https://github.com/Anand1magar/PHILL_Design_Exploration"
4. Claude will set everything up for you

---

## Daily Workflow

### Rule: Never work directly on `main`
Always work on your own branch. This prevents conflicts.

| Person | Branch format | Example |
|--------|--------------|---------|
| Anand  | `anand/what-you-are-doing` | `anand/update-header` |
| Isa    | `isa/what-you-are-doing`   | `isa/fix-card-spacing` |

### Starting work each day
Tell Claude:
> "Get the latest changes from GitHub and start a new branch called isa/today-task"

Claude handles the rest.

---

## What Isa Can Tell Claude (plain English)

| What you want | What to say |
|---------------|-------------|
| Start working on something new | "Create a new branch called isa/fix-button-color" |
| Save your work | "Save and push my changes with message: updated button color" |
| Get Anand's latest changes | "Pull the latest changes from main into my branch" |
| Send your work for review | "Create a pull request for my changes" |
| See what files you changed | "Show me what I've changed" |
| Undo your last change | "Undo my last change" |

You never need to type a git command yourself — just describe what you want.

---

## How to Merge Work (no conflicts)

1. Isa finishes her task → tells Claude: *"Create a pull request"*
2. Claude opens a PR on GitHub
3. Anand reviews it on GitHub and clicks **Merge**
4. Both pull the latest main: *"Get the latest changes from GitHub"*

---

## Communication

Use **GitHub Issues** on the repo to assign tasks to each other:
- Go to the repo → Issues → New Issue
- Tag the other person with `@username`
- Claude can read issues and act on them if you paste the link

---

## If You Get Stuck

Just describe the problem to Claude in plain English. For example:
> "I tried to push but got an error"
> "My file has conflict markers in it"
> "I accidentally deleted something"

Claude will diagnose and fix it.

## Starting your day with Claude

1. Get the latest changes from GitHub and start a new branch called `isa/today-task`
2. Save and push your changes with the message: "updated button color"
3. Review and create a pull request for your changes
