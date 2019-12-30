// components/panel/withDraw/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canDraw: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    back: '/imgs/draw.png',
    go: '/imgs/go.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDraw () {
      this.triggerEvent('goDraw', {}, {})
    }
  }
})
