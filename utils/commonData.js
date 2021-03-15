const area = (isAll = false)=>{
  var arr =  [{id: 1,name: '黄浦区'}, {id: 2,name: '徐汇区'},{id: 3,name: '长宁区'},{id: 4,name: '静安区'},{id: 5,name: '普陀区'},{id: 6,name: '虹口区'},
  {id: 7,name: '杨浦区'}, {id: 8, name: '闵行区'}, {id: 9, name: '宝山区'}, {id: 10, name: '嘉定区' },{id: 11, name: '浦东新区'}, {id: 12, name: '金山区'},
  {id: 13, name: '松江区'},{id: 14, name: '青浦区'},{id: 15, name: '奉贤区'},{id: 16, name: '崇明区'}]
  if(isAll){
    arr.unshift({id: '0',name: '全部'})
  }
  return arr
}
const carNumberType = [{id: 1,name: '沪牌黄A'},{id: 2,name: '沪牌黄C'},{id: 3,name: '沪牌蓝A'},{id: 4,name: '沪牌蓝C'},{id: 5,name: '外牌'}]
const carType = [{title: '挡车'},{title: '踏板'}] //,{title: '汽车'}
// ---------------排量筛选---------------
const motocycle_cc = (isAll = false)=>{
  var arr =  [{id: 1,name: '50cc'}, {id: 2,name: '50cc-250cc'}, {id: 3,name: '250cc-650cc'}, {id: 3, name: '650cc-2000cc'}]
  if(isAll){
    arr.unshift({id: '0',name: '全部'})
  }
  return arr
}
module.exports = {
  area,
  carNumberType,
  carType,
  motocycle_cc
}
