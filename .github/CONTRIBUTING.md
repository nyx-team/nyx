> This contribution guidelines is inspired from [Angular's Contribution Guidelines...](https://github.com/angular/angular/blob/main/CONTRIBUTING.md)

# Contributing

Contribution Guidelines for Nyx!

- [Issues](#issues)
- [Command Suggestion](#command-suggestions)
- [Coding Rules](#coding-rules)
- [Commits](#commits)
- [Making a Command](#making-a-command)

## Issues

If you find a bug in a source code, you can report it by making an issue.
You can also make a PR to fix it, which would be much appreciated.

### Command Suggestions

You can suggest a new command for Nyx by creating an issue with the `commands` tag.

## Coding Rules

Make sure you have a decent understanding of [discord.js](https://discord.js.org) and JavaScript & TypeSript before Contributing.

You must follow the ESLint rules specified in the Config.

[See the config here...](../main/.eslintrc.json)

## Commits

> This is pretty similar to how [Angular does it](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

#### Commit Message

A commit message consists of a header, a body, and a footer.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- Header should follow [`Commit Message Header`](#commit-message-header)
- `body` should follow [`Commit Message Body`](#commit-message-body)
- `footer` should follow [`Commit Message Footer`](#commit-message-footer)

#### Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: See # Scopes
  │
  └─⫸ Commit Type: chore|build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

#### Types

- **chore:** Adds/Changes to Configs, or Markdown files. (e.g. `.eslintrc.json`, or `package.json` scripts)
- **build:** Changes that affect the build system or external dependencies (e.g. npm, heroku)
- **ci:** Changes to CI config files (e.g. GitHub Workflows)
- **feat:** Adds a new feature
- **fix:** A bug fix
- **docs:** A change from the Docs only
- **perf:** Changes that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **test:** Adding missing tests or correcting existing tests

#### Scopes

- `function` - Changes to a specific function, replace `function` to that specific function's name.
- `command` - Changes to a specific command, replace `command` with the command that has been changed.
- `event` - Changes to an event, replace `event` with the event's name that has been changed.

These can also be used when something has been added.

#### Commit Message Body

An explanation for the changes made. Explain why you are making the change.

#### Commit Message Footer

A Footer can contain information about Breaking Changes.

**Example:**

```
BREAKING CHANGE: X command has been removed
```

Always put a space after `BREAKING CHANGE:`

---

#### Breaking Changes

When there is breaking changes in your code please add a `BREAKING CHANGE: X` to the commit's footer.

Where `X` is the message specifying where that breaking change happened, and/or why the change has been made.

---

## Making a command

For making a prefixed command, see [Prefixed Command Docs](../docs/Prefixed_Commands.md)
