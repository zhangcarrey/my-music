// components/homePage/homePage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audioList: {
      type: 'Array',
      value: [],
    },
    tabBarHeight: {
      type: 'Number',
      value: 0,
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
    playMusic(e) {
      const { id, state } = e.currentTarget.dataset
      this.triggerEvent('audiochange', { id, state })
    }
  },
  lifetimes: {
    attached: function () {
      
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
