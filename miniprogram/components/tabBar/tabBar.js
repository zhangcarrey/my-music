// components/tabBar/tabBar.js
let rotate = 0,
  timer = null,
  animation
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentAudio: {
      type: 'Object',
      value: {},
      observer: function (newVal, oldVal) {
        // 属性值变化时执行
        this.setData({ rotate: newVal.state})
      }
    },
    audioList: {
      type: 'Array',
      value: [],
      rotate: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentPage: 'home',
    cover: '/images/keda.png',
  },

  lifetimes: {
    attached: function () {
      console.log(this.data.tabBarData)
      // 在组件实例进入页面节点树时执行
      this.calTabBarHeight()
      
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    togglePage(e) {
      const page = e.currentTarget.dataset.page
      this.setData({
        currentPage: page
      })
    },
    toggleState() {
      this.triggerEvent('statechange', {})
    },
    calTabBarHeight() {
      const query = this.createSelectorQuery()
      query.select('#tabbar').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec( res => {
        console.log(res)
        this.triggerEvent('caltabbarheight', res[0].height)
      })
    }
  },
  observers: {
    'currentPage': function (e) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      console.log(e)
      this.triggerEvent('pagechange',e)
    },
    'currentAudio': function (e) {
      if (e.id > 0) {
        let cover
        this.data.audioList.filter( v => {
          if (v.id === e.id) {
            return cover = v.cover
          }
        })
        console.log(cover)
        this.setData({
          cover
        })
      }      
    }
  }
})
