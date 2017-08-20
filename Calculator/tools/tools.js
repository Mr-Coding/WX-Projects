var needClean = false;
var isRepeatOP = false;

// 输入数字的长度
function numLength(str) {
  var numFlag = str.toString().length;
  if(str.indexOf(".") > -1){
    return numFlag-1;
  }
  return numFlag;
}

// 能不能输入小数点
function isDot(str,inputLength){
  var RegExpStr = /^\d{1,}\.{1}\d{0,}$/
  var b = RegExpStr.test(str)
  if (str === "" || b === true || str.length === inputLength){
    return true;
  }
  return false;
}

// 最后面是不是小数点
function isLastDot(str){
  var RegExpStr = /^\d.*\.$/;
  var b = RegExpStr.test(str);
  console.log(b);
  if(b === true){
    str = str.substring(0,str.length-1);
    console.log(str);
    return str;
  }
  return str;
}

function operation(this_,e, num1, operator, num2){
  if (isRepeatOP === true){
    setExpressionData(this_, num2, e);
    return;
  }
  isRepeatOP = true;
  needClean = true;
  if (num2 === ""){
    console.log("num2是空的");
    setExpressionData(this_, num1,e);
  } else if (/\d.*/.test(num2)) {
    console.log("num2不是空的");
    if(num1 === ""){
      console.log("num1是空的");
      setExpressionData(this_, num2, e);
      return;
    }
    var result =  Calculation(num2,operator,num1);
    setExpressionData(this_,result,e);
  }
}

function equal(this_, num1, operator, num2){
  needClean = true;
  if(operator === ""){
    needClean = false;    
    setExpressionData(this_,num1,null);
    console.log("空的 "+num1);
    return;
  }
  var result = Calculation(num2, operator, num1);
  console.log("Result:" + num2+operator+num1+"="+result);  
  this_.setData({
    expression: result +"",
    operator:"",
    number:""
  });
}

// 更新数据
function setNumberData(this_, e){
  var clean;
  isRepeatOP = false;
  var inputNumber = this_.data.number;
  if (needClean === true) {
    inputNumber = "";
    needClean = false;
  }
  this_.setData({
    number: inputNumber + e.currentTarget.dataset.number
 })
}

function setExpressionData(this_,result,e) {
  var op = "";
  if (e != null) {
    op = e.currentTarget.dataset.operator;
  }
  if(result === ""){
    return;
  }
  this_.setData({
    expression: result,
    operator: op,
    number:""
  })
}

//简单计算
function Calculation(num1, operator, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var result;
  switch (operator) {
    case " + ":
      result = num1 + num2;
      break;
    case " - ":
      result = num1 - num2;
      break;
    case " / ":
      result = num1 / num2;
      break;
    case " * ":
      result = num1 * num2;
      break;
  }
  return result;
}

module.exports = {
  numLength                 : numLength,
  setNumberData        : setNumberData,
  setExpressionData  : setExpressionData,
  isDot                               : isDot,
  isLastDot                      : isLastDot,
  operation                     : operation,
  equal                              : equal
}