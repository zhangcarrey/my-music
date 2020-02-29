// components/mine/mine.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audioList: {
      type: 'Array',
      value: [],
    },
    currentAudio: {
      type: 'Object',
      value: {}
    },
    tabBarHeight: {
      type: 'Number',
      value: 0
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
      const {id, state} = e.currentTarget.dataset
      this.triggerEvent('audiochange', {id, state})
    }
  }
})
