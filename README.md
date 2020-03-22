# Node Scheduled Tasks

Windows scheduled tasks from Node.

## Prior Art

- https://github.com/burnedikt/node-schtasks/blob/master/index.js
- https://github.com/daack/schtasks/blob/master/index.js

## Status

Concept. Want to implement:

- [x] Querying scheduled tasks
- [ ] Creating a scheduled task - see *To-Do*
- [ ] Deleting a scheduled task

## Running

`schtasks` require administrator privileges to run successfully.

Running the integrated terminal in VS Code as Administrator is tricky:

Either close all VS Code instances and launch a VS Code instance as Administrator.
That way, the integrated terminal will run as Administrator, too.

Or run `runas /user:{user} "cmd /k node $(Get-Location)"` where `{user}`
is either `Administrator` (if it is set up with a non-blank password) or
a local account with administrative privileges.

In this case, the integrated terminal won't be reused, instead, a new
console window will open and `cmd /k` ensures it will stay open. Its
working directory will be `C:\WINDOWS\system32` though.

It appears that the best way to go about this is to run a separate
terminal window as Administrator, `cd` to this directory and execute
`node .` in it.

## To-Do

### Figure out why `spawn` logs the error but `exec` works

Run `createSpawn` first and then `createExec` to see the difference in behavior.

### Implement creation and deletion in a way which works with the confirm prompts

Creation prompts for override if the task already exists and deletion prompts for
a confirmation to delete. It will probably also warn if the task does not exist.
