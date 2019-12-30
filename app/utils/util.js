import CryptoJS from 'crypto-js'

const encrypt = (data) => {
  data = JSON.stringify(data)

  let adata = CryptoJS.enc.Utf8.parse(data)
  let key = CryptoJS.enc.Utf8.parse('l4cdpko1gxdawgg9ziqf6yzr6shsndhh')

  let cipherData = CryptoJS.AES.encrypt(adata, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })

  let result = CryptoJS.enc.Base64.stringify(cipherData.ciphertext)
  return result
}

const promisic = function (func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          // console.log(res)
          // console.log(2222)
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}

export {
  encrypt,
  promisic
}