<template>
  <div class="nav-header">
    <div class="nav">
      <div class="title"><img src="../../static/email.png" alt="" style="width:100px;height:80px;position:absolute;top:0;left:-110px"><span>EDM邮件营销系统</span></div>
      <div class="esc"><el-button plain icon="el-icon-ai-exit" @click="esc" style="position:relative;padding-left: 12px"><i class="iconfont icon-dianyuan" style="margin-right: 4px;"></i>退出</el-button></div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: 'nav-header',
    data () {
      return {

      }
    },
    methods:{
      esc(){
        this.$router.push({path:"/login"})
      }
    }
  }
</script>

<style scoped>
  .nav{
    height:80px;
    width:100%;
    min-width: 1180px;
    background: linear-gradient(to bottom, #102954, steelblue);
    position:relative;
  }
  .title{
    height: 80px;
    display: inline-block;
    line-height: 80px;
    color: #f1f1f1;
    font-size: 32px;
    font-weight: bolder;
    text-shadow: 3px 5px 6px #333;
    letter-spacing: 3px;
    margin-left: 340px;
    position:relative;
  }
  .esc{
    display: inline-block;
    height: 80px;
    line-height: 80px;
    min-width: 100px;
    position:absolute;
    right: 170px;
    top: 0px;
  }
  .line{
    width: 100%;
    min-width: 1180px;
    height: 5px;
    background-color: #0a5784;
  }
</style>
