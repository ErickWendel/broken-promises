let counter = 0;
setInterval(() => {
  for (var n = 0; n < 1e9; n++) {}
  if (counter++ >= 10) process.exit()
  console.log('test')
}, 500);

// node --trace-event-categories v8,node,node.async_hooks starthere.js

// setTimeout(() => process.exit(), 6000);