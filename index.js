const cp = require('child_process');
const fs = require('fs');
const path = require('path');

remove('TOM TEST');

/**
 * Returns the full path of `node.exe` accounting for a potential NVM symlink.
 */
function getNodeFullPath() {
  // Construct the path where the NVM symlink (`process.env.NVM_SYMLINK`) points to:
  if (process.env.NVM_HOME) {
    return path.join(process.env.NVM_HOME, process.version, 'node.exe');
  }

  // Return the plain Node path if NVM is not used.
  return process.execPath;
}

// https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/schtasks#BKMK_delete
function remove(name) {
  const args = [
    '/delete',
    '/tn',
    `"${name}"`
  ];

  const proc = cp.spawn('schtasks', args);

  let stdout = Buffer.alloc(0);
  proc.stdout.on('data', chunk => stdout = Buffer.concat([stdout, chunk]));
  proc.stdout.on('close', () => fs.writeFile('stdout.log', stdout, console.log));

  let stderr = Buffer.alloc(0);
  proc.stderr.on('data', chunk => stderr = Buffer.concat([stderr, chunk]));
  proc.stderr.on('close', () => fs.writeFile('stderr.log', stderr, console.log));
}

// https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/schtasks#BKMK_create
function createSpawn() {
  const args = [
    '/create',
    '/tn', // Task name
    '"TOM TEST"',
    '/sc', // Schedule type
    'MINUTE',
    '/tr', // Task run
    `"${getNodeFullPath()}"`,
  ];

  console.log('schtasks', ...args);

  const proc = cp.spawn('schtasks', args);

  let stdout = Buffer.alloc(0);
  proc.stdout.on('data', chunk => stdout = Buffer.concat([stdout, chunk]));
  proc.stdout.on('close', () => fs.writeFile('stdout.log', stdout, console.log));

  let stderr = Buffer.alloc(0);
  proc.stderr.on('data', chunk => stderr = Buffer.concat([stderr, chunk]));
  proc.stderr.on('close', () => fs.writeFile('stderr.log', stderr, console.log));
}

// https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/schtasks#BKMK_create
function createExec() {
  const args = [
    '/create',
    '/tn', // Task name
    '"TOM TEST"',
    '/sc', // Schedule type
    'MINUTE',
    '/tr', // Task run
    `"${getNodeFullPath()}"`,
  ];

  console.log('schtasks', ...args);

  const proc = cp.exec('schtasks ' + args.join(' '));

  let stdout = '';
  proc.stdout.on('data', chunk => { stdout += chunk; console.log(chunk); });
  proc.stdout.on('close', () => fs.writeFile('stdout.log', stdout, console.log));

  let stderr = '';
  proc.stderr.on('data', chunk => { stderr += chunk; console.log(chunk); });
  proc.stderr.on('close', () => fs.writeFile('stderr.log', stderr, console.log));
}

// https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/schtasks#BKMK_query
function query() {
  const args = [
    '/query',
    '/fo',
    'LIST'
  ];

  const proc = cp.spawn('schtasks', args);

  let stdout = Buffer.alloc(0);
  proc.stdout.on('data', chunk => stdout = Buffer.concat([stdout, chunk]));
  proc.stdout.on('close', () => fs.writeFile('stdout.log', stdout, console.log));

  let stderr = Buffer.alloc(0);
  proc.stderr.on('data', chunk => stderr = Buffer.concat([stderr, chunk]));
  proc.stderr.on('close', () => fs.writeFile('stderr.log', stderr, console.log));
}
