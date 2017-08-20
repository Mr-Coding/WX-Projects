// pages/index/index.js
var tools = require("../../tools/tools.js");
var INPUT_LENGTH = 11;

Page({
  data: {
    expression:"",
    number:"",
    operator:"",
    needClean:false
  },

  addNumber:function(e){
    var RegExpNumber = e.currentTarget.dataset.number;
    var RegExpOperator = e.currentTarget.dataset.operator;

    switch (true){
      case /\d/.test(RegExpNumber): //  数字
        var length = tools.numLength(this.data.number);
        if (length === INPUT_LENGTH){
          break;
        };
        tools.setNumberData(this, e);        
      break;

      case /\./.test(RegExpNumber):  //  小数点
        if (tools.isDot(this.data.number.toString(),INPUT_LENGTH)){
          break;
        }
        tools.setNumberData(this,e);
      break;

      case / \/|\*|\+|\- /.test(RegExpOperator):  //  +—/*
        console.log("运算符");
        var num = tools.isLastDot(this.data.number.toString());        
        tools.operation(this,e,
                                           num, 
                                           this.data.operator,
                                           this.data.expression);
      break;

      case /=/.test(RegExpNumber):  //  =
        var num = tools.isLastDot(this.data.number.toString());
        tools.equal(this,
                                  num,
                                  this.data.operator,
                                  this.data.expression);
      break;
    }
  },

// 删除功能
  delOneByOne:function(e){
    var num = this.data.number.toString();
    var index = num.length;
    var str = num.substring(0,index-1);
    this.setData({
        number:str
    });
  },
  delAll:function(e){
    this.setData({
      expression: "",
      number: "",
      operator: ""
    })
  },

})
