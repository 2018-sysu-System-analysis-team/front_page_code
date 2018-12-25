// pages/pay/pay.js
Page({
  
  to_pay: function () {
    wx.request({
      url: 'http://134.175.97.167:9090/api/Orders?UserId=2',//
      data: {
        "state": 0,
        "payment": this.totalPrice,
        "orderItems": this.orderItems 
      },
      method: 'POST',
      header: {},
      success: function (){
        wx.navigateTo({
          url: '../pay/pay'
        })
      }
    })
  },

  onLoad: function () {
    this.setData({
      orderItems: wx.getStorageSync('data'),
      totalPrice: wx.getStorageSync('totalPrice'),
      totalNum: wx.getStorageSync('totalNum'),
      UserId: '2', //wx.getStorageSync('UserId')
    })
  },
})
