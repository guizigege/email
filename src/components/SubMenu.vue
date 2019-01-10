<template>
  <div class="sub-menu">
    <div style="min-width: 200px;height: 1100px;float: left;">
      <el-menu
        default-active="/home/vps"
        class="el-menu-vertical-demo"
        router>
        <el-menu-item :index="item.path" v-for="(item,index) in menu" :key="index" @click.native="toMenu(index)">
          <i :class="item.icon" style="margin-right: 6px;"></i>
          <span slot="title" >{{item.title}}</span>
        </el-menu-item>

      </el-menu>
    </div>


  </div>
</template>

<script>
  import bus from '../utils/eventBus.js'
  export default {
    name: 'sub-menu',
    data () {
      return {
        menu:[
          {path:"/home/vps",icon:"iconfont icon-jiqiren_o",title:"vps系统管理"},
          {path:"/home/email",icon:"iconfont icon-youxiang",title:"邮箱小号管理"},
          {path:"/home/mould",icon:"iconfont icon-template-library",title:"参数设置及模板板块"},
          {path:"/home/task",icon:"iconfont icon-renwu",title:"任务管理"},
        ]
      }
    },
    methods:{
      toMenu(index){
        switch(index){
          case 0: bus.$emit("vps");break;
          case 1: bus.$emit("email");break;
          case 2: bus.$emit("mould");break;
          case 3: bus.$emit("task");break;
          default: return false;
        }
      },

    },

  }
</script>

<style>
  .sub-menu .el-submenu__icon-arrow{
    margin-top: -4px;
  }
  .sub-menu ul.el-menu-vertical-demo.el-menu{

  }
  .sub-menu .el-menu-item.is-active{
    color:steelblue;
  }
  .sub-menu .el-menu-item, .el-submenu__title{
    height:60px;
    line-height: 60px;
  }
  .sub-menu .el-menu-item{
    font-size: 16px;
  }
</style>
<style scoped>
  /*.el-menu-vertical-demo{*/
  /*background:linear-gradient(to top, #102954, steelblue);*/

  /*}*/

</style>
