<template>
  <div class="home">
    <nav-header></nav-header>
    <sub-menu></sub-menu>
    <div style="min-width:1280px;height: 1000px;padding-left: 200px;box-sizing: border-box;">
      <router-view>123</router-view>
    </div>
  </div>
</template>

<script>
  import SubMenu from './SubMenu'
  import NavHeader from './NavHeader'

  export default {
    name: 'home',
    data () {
      return {

      }
    },
    components:{
      NavHeader,SubMenu
    },
    created(){
      // this.$router.push({path:"/home/application"});
      // this.$post('/auth/user/get',{}).then((res)=>{
      //   console.log(res)
      //   if(res.data.result==1){
      //     let isSuperuser = res.data.data.extra_info.is_superuser;
      //     if(isSuperuser==1){
      //       this.$global.showHc = true;
      //     }
      // }
      // })
    }
  }
</script>


<style scoped>

</style>
