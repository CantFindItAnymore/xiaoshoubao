// components/search-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isSearching: false,
    staticIcon: '/imgs/default_search.png',
    activeIcon: '/imgs/searching.png',
    deleteIcon: '/imgs/delete.png',
    input: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus (e) {
      this.setData({
        isSearching: true
      })
    },
    blur () {
      this.setData({
        isSearching: false
      })
    },
    change (e) {
      this.setData({
        input: e.detail.value
      })
    },
    delete () {
      this.setData({
        input: ''
      })
      this.triggerEvent('delete', {}, {})
    },
    search () {
      this.triggerEvent('search', {
        input: this.data.input
      }, {})
    }
  }
})
