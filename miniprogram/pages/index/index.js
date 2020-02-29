// pages/index/index.js
Page({
  data: {
    currentPage: 'home',
    currentAudio: {
      id: 0,
      state: false,
    },
    audioList: [
      {
        id: 1,
        cover: 'https://p3fx.kgimg.com/stdmusic/20150718/20150718101720250588.jpg',
        source: 'https://webfs.yun.kugou.com/202002281040/d45be75b77c7e541df96d1b022c37777/G010/M05/04/00/qoYBAFUJpZyAFmM3ADKwBjSjhFA591.mp3',
        song: '红色高跟鞋',
        singer: '蔡健雅',
        state: false
      },
      {
        id: 2,
        cover: 'https://p3fx.kgimg.com/stdmusic/20200218/20200218145505281837.jpg',
        source: 'https://webfs.yun.kugou.com/202002281039/4455772c23992fcfdce70bdff85f3087/G201/M0B/10/13/CQ4DAF5LjCqALMB4AEJSIYJEpng810.mp3',
        song: '我爱你',
        singer: '程jiajia',
        state: false
      },
      {
        id: 3,
        cover: 'https://p3fx.kgimg.com/stdmusic/20150720/20150720192701255833.jpg',
        source: 'http://tyst.migu.cn/public/product5th/product34/2019/07/2320/2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF/%E6%A0%87%E6%B8%85%E9%AB%98%E6%B8%85/MP3_128_16_Stero/60054701921.mp3',
        song: '以父之名',
        singer: '周杰伦',
        state: false
      },
      {
        id: 4,
        cover: 'https://p3fx.kgimg.com/stdmusic/20150720/20150720151920831765.jpg',
        source: 'https://webfs.yun.kugou.com/202002281044/43bd003f518388fd8d0607978a1c85ed/G014/M09/04/17/roYBAFUNYEiADmGYACDu3qQjUbc043.mp3',
        song: 'play with fire',
        singer: 'The Rolling Stones',
        state: false
      },
      {
        id: 5,
        cover: 'https://p3fx.kgimg.com/stdmusic/20160908/20160908051126856939.jpg',
        source: 'https://webfs.yun.kugou.com/202002280912/b9788f7c81d1203bbae93027268089d7/G014/M06/1F/15/Tg0DAFUJgLeALMfnADtLgf8m1Ts418.mp3',
        song: 'just give me a reason',
        singer: 'P!nk、Nate Ruess',
        state: false
      }, 
      {
        id: 6,
        cover: 'https://p3fx.kgimg.com/stdmusic/20160907/20160907194600710049.jpg',
        source: 'https://webfs.yun.kugou.com/202002281044/adff506aaedbc451004972816540e34d/G186/M05/08/01/-g0DAF5NZsSAGp50AD5hzKG-tIM222.mp3',
        song: '谁伴我闯荡',
        singer: 'BEYOND',
        state: false
      },
      {
        id: 7,
        cover: 'http://cdnmusic.migu.cn/picture/2019/0611/1032/AS1609221117073519.jpg',
        source: 'http://tyst.migu.cn/public/product5th/product35/2019/10/1615/2019%E5%B9%B406%E6%9C%8826%E6%97%A518%E7%82%B908%E5%88%86%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E7%BA%B399%E9%A6%96818002/%E6%A0%87%E6%B8%85%E9%AB%98%E6%B8%85/MP3_128_16_Stero/6005751VFRE.mp3',
        song: '怎么说我不爱你',
        singer: '萧敬腾',
        state: false
      },
      {
        id: 8,
        cover: 'http://cdnmusic.migu.cn/picture/2019/1231/1154/ARTM678048c294c3465e835a818950ffae0b.jpg',
        source: 'https://webfs.yun.kugou.com/202002291500/be838048b9d3c0dff0c356f8ce37453b/G093/M05/1E/07/_YYBAFjW6r-AWL3wAEwrjOaZzOc726.mp3',
        song: '男孩(Live)',
        singer: '梁博',
        state: false
      },
      {
        id: 9,
        cover: 'https://p3fx.kgimg.com/stdmusic/20150719/20150719081319408873.jpg',
        source: 'https://webfs.yun.kugou.com/202002291508/57d6c73f38c8f19b8e43572571101302/G011/M02/04/03/Sw0DAFT_BSyAEGy6ACR8aDp8UCA660.mp3',
        song: 'Jai tur jai chun ใจเธอใจฉัน',
        singer: '小情人',
        state: false
      },
      {
        id: 10,
        cover: 'http://cdnmusic.migu.cn/picture/2020/0110/1121/AM21348730c944bafd25940a4c46be1826.jpg',
        source: 'https://webfs.yun.kugou.com/202002291511/68975ebc106be98c9842b5e428acbaaa/G002/M0A/0D/09/ooYBAFUAbNCAdZZmADnHJSQUZEo606.mp3',
        song: '桃花岛',
        singer: '麦振鸿',
        state: false
      },
      {
        id: 11,
        cover: 'https://imgessl.kugou.com/uploadpic/softhead/240/20191017/20191017142309922.jpg',
        source: 'https://webfs.yun.kugou.com/202002291515/266d4c57c62a9f2aa30ce723522040d7/part/0/960934/G080/M05/13/18/MJQEAFho5K2AQ2UbADoCp6vbgzk726.mp3',
        song: '爱要怎么说出口(Live)',
        singer: '林俊杰',
        state: false
      },
      {
        id: 12,
        cover: 'https://p3fx.kgimg.com/stdmusic/20150718/20150718145706209639.jpg',
        source: 'https://webfs.yun.kugou.com/202002291518/0f65fa79bf202151c92aad7dcc712d7a/G005/M05/0B/03/pYYBAFS1jmaAAp9vAEbHWjrxmYA241.mp3',
        song: '空隙',
        singer: '痛仰乐队',
        state: false
      },
    ],
    tabBarHeight: 0,
  },
  pageChange(e) {
    console.log(e)
    this.setData({
      currentPage: e.detail
    })
  },
  // 所有外在对音频的控制，包括界面状态， home 和 mine 组件的控制
  audioChange(e) {
    console.log(e)
    let {id, state} = e.detail,
      index = this.data.audioList.findIndex(v => v.id === id),
      currentAudio
    if (this.data.currentAudio.state) { // 当前状态 播放
      if (state) {  // 点的是暂停按钮
        this.setData({
          ['audioList[' + index + '].state']: false,
          'currentAudio.state': false
        })
        this._toggleState('pause')
      } else {   // 点的是播放按钮
        let preIndex = this.data.audioList.findIndex(v => v.id === this.data.currentAudio.id) //当前正在播放中的 id
        currentAudio = { id, state: true }
        this.setData({
          ['audioList[' + preIndex + '].state']: false,
          ['audioList[' + index + '].state']: true,
          currentAudio
        })
        this._playAudio(index)
      }
    } else {   // 无播放状态
      let preId = this.data.currentAudio.id
      currentAudio = { id, state: true }
      console.log(index)
      if (currentAudio.id === preId) {
        let index = this.data.audioList.findIndex(v => v.id === id)
        this.setData({
          ['audioList[' + index + '].state']: true,
          'currentAudio.state': true
        })
        this._toggleState('play')
      }else {
        this.setData({
          ['audioList[' + index + '].state']: true,
          currentAudio
        })
        this._playAudio(index)
      }
    }
  },

  // 播放和暂停状态的切换 包括音频和界面, tabBar 组件的控制
  stateChange(){
    if (this.data.currentAudio.state) {  // 当前状态为播放 => 暂停
      this._toggleState('pause')
    } else {                             // 当前状态为播放 => 暂停
      this._toggleState('play')
    }
    let index = this.data.audioList.findIndex(v => v.id === this.data.currentAudio.id)
    this.setData({
      ['audioList[' + index + '].state']: !this.data.currentAudio.state,
      'currentAudio.state': !this.data.currentAudio.state
    })
  },
  // 监听tabBar高度的计算
  caltabbarheight(e) {
    this.setData({
      tabBarHeight: e.detail
    })
  },
  onLoad: function() {
    console.log('index-onload')
   
  },
  onReady(){
    
  },
  // 控制后台音频的播放
  _playAudio(index) {
    let audioItem = this.data.audioList[index]
    wx.playBackgroundAudio({
      dataUrl: audioItem.source,
      title: audioItem.song,
      coverImgUrl: audioItem.cover,
      success: res => {
        this._audioListen(index)
      },
      fail: res => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },
  // 控制后台音频的播放和暂停
  _toggleState(status) {
    if (status === 'play') {
      let index = this.data.audioList.findIndex(v => v.id === this.data.currentAudio.id)
      this._playAudio(index)
    } else if (status === 'pause') {
      wx.pauseBackgroundAudio()
    }
  },
  // 对音频状态的监听
  _audioListen(index) {
    wx.onBackgroundAudioStop((e) => {
      console.log(e)
      console.log('stop!!!!!!!!!!!!!')
      // let idx = index === this.data.audioList.length - 1 ? 0 : index + 1,
      //   obj = {}, { id, state } = this.data.audioList[idx]
      // obj.detail = { id, state }
      // this.audioChange(obj)

      // 先当作暂停处理
      let state = this.data.audioList[index].state
      if (state) {
        this.setData({
          ['audioList[' + index + '].state']: false,
          'currentAudio.state': false
        })
      }
    })
    wx.onBackgroundAudioPlay(() => {
      console.log('play!!!!!!!!!!!!!')
      let  state = this.data.audioList[index].state
      if (!state) {
        this.setData({
          ['audioList[' + index + '].state']: true,
          'currentAudio.state': true
        })
      }
    })
    wx.onBackgroundAudioPause(() => {
      console.log('pause!!!!!!!!!!!!!')
      let  state = this.data.audioList[index].state
      if (state) {
        this.setData({
          ['audioList[' + index + '].state']: false,
          'currentAudio.state': false
        })
      }
    })
  }
})