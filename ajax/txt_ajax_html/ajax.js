//原生js来封装ajax函数
function ajax(obj){
    //判断url是否存在
    var url=obj.url;
    if(!url){
        return ;
    }
    //obj中的每一个属性都添加上，并且给默认值
    var type=obj.type==undefined?'get':obj.type;//请求的方式
    var dataType=obj.dataType==undefined?"text":obj.dataType;//数据格式
    var asynch=obj.asynch==undefined?"true":obj.asynch;//交互方式（异步）
    var data='';
    //对数据的处理
        //get url:https://www.jd.com/2017?t=2&a=3&b=4    data=""
        //post url:https://www.jd.com/2017       data={t:2}
    for( var i in obj.data){//{t:2,a:3}--->t=2&a=3
        data+=i+"="+obj.data[i]+"&";
        //for in循环   i属性(键)  data[i](值)
    }
    data.slice(0,-1);
    console.log(data)
    //ajax四部曲
    // 1. 创建一个XMLHttpRequest对象
    var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    // 2. 客户端和服务器建立联系并发送请求 open() send()
    if(type=="get"){//get方式数据放在协议当中
        //判断使用了get方式之后url后面有没有data
        if(data){//有数据
            xhr.open("get",url+"?"+data,true);
            xhr.send();
        }else{//没有数据
            xhr.open("get",url,true);
            xhr.send();
        }
    }else if(type=="post"){//post方式数据放在头部信息（头部报文）中
        xhr.open("post",url,asynch)//建立联系
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//设置头部信息
        xhr.send(data);//发送请求
    }

    //3. 监听通信状态
    xhr.onreadystatechange=function(){//监听通信状态
        if(xhr.readyState==4){//服务器端响应完毕
            if(xhr.status==200){
                //服务器给我们的响应值是200表示响应成功
                //DOM操作
                if(dataType=="text"){
                    //文本类型数据
                    obj.success&&obj.success(xhr.responseText);
                }else if(dataType=="xml"){
                    obj.success&&obj.success(xhr.responseXML);
                }else if(dataType=="json"){
                    obj.success&&obj.success(eval("("+xhr.response+")"))
                }
            }else if(xhr.status==404){
                obj.error&&obj.error();
            }
        }
    }

    
}

// ajax({
//     url:'',
//     type:get||post,
//     dataType:text||json||xml,
//     asynch:true||false,
//     success:function(){},
//     error:function(){},
//     data:{}
// })