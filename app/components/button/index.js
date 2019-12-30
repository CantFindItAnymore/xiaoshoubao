// components/button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
    isLegal: Boolean,
    openType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    duang () {
      this.triggerEvent('duang', {}, {})
    },
    getUserInfo(e) {
      this.triggerEvent('getuserinfo', e.detail, {})
    }
  }
})
