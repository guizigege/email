<template>
  <div class="login">
    <header style="width:100%;height:40px;background-color: rgba(204,204,204,0.6);position:fixed;top:0;left:0">
      <div style="width:200px;height:40px;line-height: 40px;text-align: center">your logo</div>
    </header>
    <div class="bg">
      <div class="box">
        <div class="box-form">
          <div class="title"><span>EDM后台</span></div>
          <div class="form-item" style="position:relative;text-align: center"><img src="../../static/user.png" style="position:absolute;top:28px;left:58px;width:20px;height:20px;"/><input type="text" id="user" ref="user" v-model="username" placeholder="账号" style="padding-left:32px"/></div>
          <div class="form-item" style="position:relative;text-align: center"><img src="../../static/pass.png" style="position:absolute;top:11px;left:58px;width:20px;height:20px;"/><input type="password" id="pwd" ref="pwd" v-model="password" placeholder="密码" style="padding-left:32px"/></div>
          <div class="form-item btn"><el-button @click="toIndex" @keyup.enter="toIndex">登入</el-button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
//  import axios from 'axios'

  export default {
    name: 'login',
    data () {
      return {
        username:"",
        password:""
      }
    },
    methods:{
      //测试登入，用户名：aaa   密码：123
	  //else if(this.password=="123"&&this.username=="aaa"){
      //    this.$router.push("/home/vps")
      //  }
      toIndex(){
        if (this.username == "") {
          alert("请输入正确的用户名");
          this.$refs.user.focus();
          return;
        } else if (this.password == "") {
          alert("请输入正确的密码");
          this.$refs.pwd.focus();
          return;
        }else{
			this.user_login_s()
        }

      },
      //管理员用户登陆
      user_login_s(){
        this.$get('/user/login_s',{
          username: this.username,
          pwd: md5(this.password)
        }).then((res)=> {
          //管理员登入成功的回调
		  this.$router.push({path:"/home/vps"});
        })
      }
    }
  }
</script>
<style>
  .btn>.el-button{
    font-weight: 600;
    box-shadow:2px 2px 3px #333;
  }
  .btn>.el-button:active{
    box-shadow:1px 1px 1px #333 inset;
  }
</style>

<style scoped>

  .bg{
    width:100%;
    height:100%;
    min-width: 100vh;
    min-height: 100vh;
    background-image:url(../../static/bg1.jpg);
    background-size: cover;

  }
  .box{
    width: 100vh;
    height: 100vh;
    margin:  auto;
    position: relative;
  }
  .box-form{
    width: 500px;
    background-color: rgba(80,80,80,0.1);
    position: absolute;
    top: 20vh;
    left: -250px;
    margin-left: 50%;
    padding: 50px 70px;
    box-sizing: border-box;
  }
  .box-form .title{
    padding:0 18px;
    width: 100%;
    height: 50px;
  }
  .title>span{
    height:50px;
    color: #fff;
    text-align: center;
    transition: font-size 0.3s ease-in,color 0.2s ease-in;
    display: block;
    font-size:26px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .title>span:hover{
    color:#0549ab;
    font-size: 30px;
    font-weight: bold;
    text-shadow: 2px 2px 2px #fff;
  }
  .box-form label{
    color: #fff;
    font-weight: bold;
    margin-right: 16px;
  }
  .box-form input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 260px;

  }
  .box-form input:focus,.box-form input:hover{
    border-color:#409eff;
  }
  .form-item{
    margin-top: 30px;
    padding: 0 18px;
  }
  .box-form .btn{
    width: 200px;
    margin: 40px 140px 0;

  }
</style>
