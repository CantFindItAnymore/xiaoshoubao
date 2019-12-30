// components/drew/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    drewNum: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    drew: '../../imgs/drew.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    duang() {
      this.triggerEvent('duang', {}, {})
    }
  }
})
