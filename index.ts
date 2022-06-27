const [,, ...args] = process.argv;

// Import `run` command and execute it
import('./src/run').then((r) => r.default(args));
