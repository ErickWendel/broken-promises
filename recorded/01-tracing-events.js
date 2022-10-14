// node --trace-events-enabled 01-tracing-events.js
// node --trace-event-categories v8,node,node.async_hooks 01-tracing-events.js

let counter = 0;
setInterval(() => {
  // for (let index = 0; index < 1e9; index++);
  if (counter++ >= 10) process.exit()
  console.log('test...')
})