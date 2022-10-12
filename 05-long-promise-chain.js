

function toUpper(items) {
  return items.map((i)=> i.toUpperCase())
}
function toLower(items) {
  return items.map((i)=> i.toLowerCase())
}

function reverse(items) {
  return items.map((i)=> [...i].reverse().join(''))
}
async function getData() {
  return ['test', 'HelLo', 'woLrd']
}
// 65% performance less

getData()
.then(toUpper)
.then(toLower)
.then(reverse)
.then(console.log)