new Promise(async (resolve, reject)=> {
  // await Promise.reject('oh sh*t')
  // throw new Error('oh no!')
  // resolve('ok')
  reject('OH no!')
})
.then(result => console.log('result', result))
.catch(error => console.log('error**', error))