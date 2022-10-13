// node --trace-event-categories v8,node,node.async_hooks 02-tracing-events.js

let counter = 0;
setInterval(() => {
  // compare tracing with and without for below
  for (var n = 0; n < 1e9; n++) {}
  if (counter++ >= 10) process.exit()
  console.log('test')
}, 500);