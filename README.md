# Mongo.js
一个简单轻便的Mongodb操作库 
## 支持平台
  `nodeJS`
## 简介
  + 基于Promise与单例设计模式进行设计 封装了常用的一些增删改查的方法  链接数据库速度更加快速 对Mongodb官网提供的Mongodb操作库进行了又一层的封装
  + 能够协助你完成一些简单的常用数据库操作
    1. 使操作数据库变得更加的省时效
    2. 提供异步Promise API 写起来更顺手
## 安装与使用
  + 将其Mongo.js文件下载下来添加您的项目中使用CommonJS引入即可
  ``` const Mongo = require('./Mongo.js') ```
  + 路径根据您的实际位置决定 
  + 配置数据库信息在dbconfig.json中配置
  + 依赖了 mongodb 库
    **安装**
    ``` npm install --save mongodb ```
    ``` cnpm install --save mongodb ```
    **均可**
## 目的
  + 能够解决日常简单的数据库操作
  + 使用起来更加的轻便快捷
  + 执行数据库操作更加的迅速
  + 执行增删改查只需要 < 3ms ~ 5 ms 左右 不用重复进行连接数据库
## 例子
  **查询**
  ##### 普通查询 查询所有
  ```
   Mongo.find("collectionName").then(res=>{
       console.log(res);
   })catch(err=>{
      console.log(err);
   });
  ```
  ##### 按条件查询
   ```
   Mongo.find("collectionName",{name:"lee"}).then(res=>{
       console.log(res);
   }).catch(err=>{
      console.log(err);
   });
  ```
  #### 模糊查询
  ```
  Params: 集合名称  key名称   查询的正则
  Mongo.like("koas","name",/we/).then(res=>{
     console.log(res);
  }).catch(err=>{
      console.log(err);
   });
  ```
  #### 分页查询
  ```
  Params: 集合名称 一次查询的条数 一次跳过的条数 条件
  Mongo.limit("koas",5,0,{name:"nick"}).then(res=>{
     console.log(res);
  }).catch(err=>{
      console.log(err);
   });;
  ```
  #### 查询总数据数 算出多少页
  ```
  Params: 集合名称 条件
  Mongo.count("koas",{name:"nick"}).then(res=>{
     console.log(res);
  }).catch(err=>{
      console.log(err);
   });;
  ```
  #### 模糊查询带分页 只支持模糊查 不能添加其他条件
  ```
  Params: 集合名称 key名称 查询的正则 一次查询的条数  一次跳过的条数
  Mongo.likeLimit("koas","name",/we/,5,0,).then(res=>{
     console.log(res);
     console.log((res[res.length - 1]); 得到查询的总数据数量值 用于算多少页
  }).catch(err=>{
     console.log(err);
  });

  ```
  **支持Mongodb所有的查询语法**
  **添加数据**
  ```
  Params 集合名称  添加的数据对象
  Mongo.add("koas",{name:"www",age:80,price:90000}).then(res=>{
     console.log(res);
  }).catch(err=>{
       console.log(err);
  });
  ```
  **修改数据**
  ```
  Params ： 集合名称  查询条件  修改的数据
  Mongo.update("koas",{name:"www"},{name:"eree"}).then(res=>{
     console.log(res);
  }).catch(err=>{
     console.log(err);
  });

  ```
  **删除数据**
  ```
  Params : 集合名称 条件
  Mongo.remove("koas",{name:"eree"}).then(res=>{
     console.log(res);
  }).catch(err=>{
       console.log(err);
  });
  ```
  
  ### 最后
  Mongo 有很多不足的地方 只能够帮助开发者完成一些简单的数据库操作 如果业务非常复杂 那么Mongo.js可能不太适合你的应用使用
  如果觉得Mongo.js帮到你了 就点个Start吧  对一个18岁的程序员鼓励一下~~~~~
