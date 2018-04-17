//原生封装ajax函数

function ajax(obj){
    //参数obj是一个对象
    //url
    var url=obj.url;//给obj添加一个url
    //判断url是否有内容？
        if(!url){
            return false;
        }
    //请求的类型 get post 给它一个默认的请求类型
        var type=obj.type==undefined?"get":obj.type;
    //数据的类型
        var dataType=obj.dataType==undefined?"text":obj.dataType;
    //交互方式
        var asynch=obj.asynch==undefined?"true":"false";
    //{a:1,b:2,c:3}----->a=1&b=2&c=3
        var data="";
    //对数据做处理{a:1,b:2,c:3}
        for(var i in obj.data){//对象遍历的方法
            //i就是对象的属性
            //obj.data[i] 就是对象属性的值
            data+=i+"="+obj.data[i]+"&";
        }
        data.slice(0,-1);          // [1,2,3,4,5,6]
    //ajax的四部曲
        //1. 创建一个ajax对象（XMLHttpRequest对象）有兼容性（处理兼容性）
            //处理方法一   getXhr()
                function getXhr(){
                    var xhr=null;
                    if(window.XMLHttpRequest){
                        //现代浏览器
                        xhr=new XMLHttpRequest();
                    }else{
                        //ie浏览器
                        xhr=new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    return xhr;
                }
            //处理方法二   三元表达式
                var xhr=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
        //2. 客户端和服务器建立连接     并且发送请求
                //请求方式有两种，我们需要分情况讨论
                //get     url: https://www.baidu.com/a.html?a=1&b=2&c=3  data:""
                        //get请求是将数据放在了协议上面
                //post    url:https://www.baidu.com/b.html               data:{a:1,b:2}
                        //post请求是将数据放在了头部信息中（头部报文）
             if(type=="get"){
                //url后面是否要去跟数据
                if(data){//有数据的 https://www.baidu.com/a.html?a=1&b=2&c=3
                    xhr.open("get",url+"?"+data,asynch);
                    xhr.send();
                }else{//没有数据 https://www.baidu.com/a.html
                    xhr.open("get",url,asynch);
                    xhr.send();
                }
             }else if(type=="post"){
                xhr.open("post",url,asynch)//建立客户端和服务器的连接
                    //1. 请求的类型
                    //2. url  超文本传输协议（https://www.baidu.com）
                    //3. asynch 交互方式  异步   同步
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")//将数据放在头部信息中    
                xhr.send(data)//发送请求
            }     
        //3. 监听一个通信状态 xhr.onreadystatechange()
            xhr.onreadystatechange=function(){//监听状态
                if(xhr.readyState==4){//服务器响应完成
                    //客户端状态？
                    if(xhr.status==200){
                        //拿数据---》DOM操作（js）
                        //处理数据   text          json                                 xml
                            //      responseText   eval("("+xhr.response+")")       responseXML
                        if(dataType=="text"){
                            obj.success&&obj.success(xhr.responseText)
                        }else if(dataType=="json"){
                            obj.success&&obj.success(eval("("+xhr.response+")"));
                        }else if(dataType=="xml"){
                            obj.success&&obj.success(xhr.responseXML);
                        }
                    }else if(xhr.status==404){
                        obj.error&&obj.error()
                    }
                }
            }
            
}


// ajax({
//     url:"user.json",
//     type:"get"||"post",
//     dataType:"text"||"json"||"xml",
//     asynch:true||false,
//     data:{},
//     success:function(){},
//     error:function(){}
// })