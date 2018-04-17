//点击增加要添加一行----》本地存储当中
function getData(){//获取本地存储的函数
  var arr=[];
  if(localStorage.tableList==undefined){
    arr=[];
  }else{
    //如果存在，我们就要转换"[{},{}]"
    arr=JSON.parse(localStorage.tableList);//我们就拿到一个数组了
  }
  return arr;
}
function saveData(data){//[{}]--->"[{}]"
  localStorage.tableList=JSON.stringify(data)
}
function reWrite(){
  var data=getData();
  $("tr:not(tr:first,tr:last)").remove();//监听storage事件
  // console.log(data)
  $.each(data,function(i,v){//i就是索引值
    $('<tr>').attr("index",i).html('<td contenteditable="true" data-role="name">'+v.name+'</td>'+'<td contenteditable="true" data-role="age">'+v.age+'</td>'+'<td contenteditable="true" data-role="sex">'+v.sex+'</td>'+'<td contenteditable="true" data-role="grade">'+v.grade+'</td>'+'<td><button class="btn btn-danger">删除</button></td>').insertBefore("tr:last");
  })
  saveData(data);
}
reWrite();
$(".btn-success").click(function(){
  var data=getData();//对象
  // console.log(data)
  data.push({"name":"","age":"","sex":"","grade":""});
  saveData(data);
  reWrite();
})
//删除效果---删除按钮是创建出来的--》事件代理
$("table").on("click",".btn-danger",function(){
  var data=getData();
  console.log(data)
  //数组中删除一个元素  pop()  shift() splice() slice()-->下标
  var index=$(this).parent().parent().attr("index");
  // console.log(index);
  data.splice(index,1);
  saveData(data);
  reWrite();
})
//可编辑效果  可编辑 h5新属性contenteditable=true;
$("table").on("blur","[contenteditable=true]",function(){
  var data=getData();
  var index=$(this).parent().attr("index");
  var val=$(this).html();
  var attr=$(this).attr("data-role");
  data[index][attr]=val;
  saveData(data);
  // data[index]["name"]=val;
})
