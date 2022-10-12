new Promise(async (resolve, reject) => {
  // throw new Error('errr')
  await Promise.reject('ae')
}).catch(err => console.error(err))