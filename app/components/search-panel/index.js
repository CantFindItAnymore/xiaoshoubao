// components/search-panel/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    test: false,
    hadIcon: '/imgs/had.png',
    yetIcon: '/imgs/yet.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toSearchDetail () {
      this.triggerEvent('toSearchDetail', {
        name: this.properties.data.name
      }, {})
    }
  }
})
