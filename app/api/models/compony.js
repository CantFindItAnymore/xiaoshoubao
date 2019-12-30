import {
  HTTP
} from '../http.js'

class ComponyModel extends HTTP {

  getCompony(name) {
    return this.request({
      url: 'miniapp/marketer/openingBusiness',
      method: 'POST',
      data: {
        name: name
      }
    })
  }

}

export {
  ComponyModel
}