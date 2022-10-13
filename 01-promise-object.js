new Promise(async (resolve, reject) => {
  // throw new Error('errr')
  await Promise.reject('oh sh*t')
  // reject('oh!')
}).catch(err => console.error(err))