
Page({
  data: {
    order: [],
    menu: [],
    shopping: [],
    totalPrice: 0,
    totalNum: '0',
    boo: 0,
    showCartDetail: false
  },

  onLoad: function () {
    let tableInfo = wx.getStorageSync('tableInfo')
    this.setData({
      tableInfo: tableInfo
    })
    console.log('load tableInfo', this.data.tableInfo)

    var that = this
    wx.request({
      url: 'http://134.175.97.167:9090/api/dishes',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          menu: res.data,
          order: res.data
        })
        console.log('set menu', that.data.menu);
        for (var i = 0; i < that.data.menu.length; i++) {
          //that.data.menu[i].index = i.toString();
          var param = {}
          var string = 'menu[' + i + '].index'
          param[string] = i
          that.setData(param)
          string = 'menu[' + i + '].num'
          param[string] = 0
          that.setData(param)
        }
        console.log('set menu', that.data.menu)

      },
    })
  },

  to_comment: function () {
    wx.navigateTo({
      url: '../comment/comment',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  to_submit: function () {
    var od = []
    let mene = this.data.menu
    if (this.data.totalNum != '0') {
      for (var i = 0; i < mene.length; i++) {
        //that.data.menu[i].index = i.toString();
        if (mene[i].num > 0) {
          var temp1 = {itemId: mene[i].dishId, title: mene[i].dishName, num: mene[i].num, price: mene[i].dishPrice}
          od[i] = temp1
        }
      }
      console.log('set od', od)
      wx.setStorageSync('data', od)
      wx.setStorageSync('totalPrice', this.data.totalPrice)
      wx.setStorageSync('totalNum', this.data.totalNum)

      wx.navigateTo({
        url: '../submit/submit',
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    } else {
      wx.showModal({
        content: '您还没点餐呢',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('去点餐')
          }
        }
      });
    }

  },

  // 将菜品加入购物车
  addDish: function (event) {
    var newMenu = this.data.menu
    var obj = this.data.menu[event.target.dataset.index]
    newMenu[event.target.dataset.index].num++
    this.setData({ menu: newMenu })

    this.setData({ totalPrice: this.data.totalPrice + parseFloat(obj.dishPrice) })
    this.setData({ totalNum: parseInt(this.data.totalNum) + 1 })

  },
  // 将菜品从购物车删除
  removeDish: function (event) {
    var newmenu = this.data.menu
    var obj = this.data.menu[event.target.dataset.index]
    newmenu[event.target.dataset.index].num--
    this.setData({ menu: newmenu })

    this.setData({ totalPrice: this.data.totalPrice - parseFloat(obj.dishPrice) })
    this.setData({ totalNum: parseInt(this.data.totalNum) - 1 })
    this.setData({ order: newMenu })
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    })
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  tapAddCart: function (event) {
    this.addDish(event)
  },
  tapMinusCart: function (event) {
    this.removeDish(event)
    if (!this.data.totalNum) {
      this.setData({ showCartDetail: !this.data.showCartDetail })
    }
  }

})
