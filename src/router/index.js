import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Vps from '@/components/Vps'

import Mould from '@/components/Mould'
import MouldAdd from '@/components/MouldAdd'
import MouldEdit from '@/components/MouldEdit'
import Email from '@/components/Email'
import Task from '@/components/Task'
import TaskAdd from '@/components/TaskAdd'
import TaskEdit from '@/components/TaskEdit'
import {get} from '@/utils/http'
Vue.use(Router);
const router = new Router({
  routes: [
    {path:"*",redirect:"/login"},
    {path:"/login",component:Login},
    {path:"/home",component:Home,
      meta:{
        title:'首页',
        requireAuth: true
      },
      children:[

        {path:"/home/vps",component:Vps,meta:{
            title:'vps系统管理页面',
            requireAuth: true
          }},
        {path:"/home/email",component:Email,meta:{
            title:'邮箱小号管理',
            requireAuth: true
          }},
        {path:"/home/mould",component:Mould,meta:{
            title:'参数设置及模板板块页面',
            requireAuth: true
          }},
        {path:"/home/mould/add",component:MouldAdd,meta:{
            title:'参数设置及模板板块新建页面',
            requireAuth: true
          }},
        {path:"/home/mould/edit/:id",component:MouldEdit,meta:{
          title:'编辑对应模板页面',
          requireAuth: true
        }},
        {path:"/home/task",component:Task,meta:{
            title:'任务页面',
            requireAuth: true
          }},
        {path:"/home/task/add",component:TaskAdd,meta:{
            title:'添加任务页面',
            requireAuth: true
          }},
        {path:"/home/task/edit/:id",component:TaskEdit,meta:{
            title:'添加任务页面',
            requireAuth: true
          }},




    ]
    }
  ]
});
//这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth) {
//     get('').then(res => {
//       if(res.data.result == 1) {
//         next();
//       } else {
//         console.log("没有登入太，回到登入页面");
//         //this.$alert('这是一段内容', '标题名称', {
//         //  confirmButtonText: '确定',
//         //  callback: action => {
//         //    this.$message({
//         //      type: 'info',
//         //      message: `action: ${ action }`
//         //    });
//         //  }
//         //});
//
//
//         next({
//           path: '/login'
//         });
//       }
//     });
//     //axios({
//     //  url: '/api',
//     //  method: 'GET',
//     //}).then(res => {
//     //  if(res.data.result == 1) {
//     //    next();
//     //  } else {
//     //    console.log("没有登入太，回到登入页面")
//     //    next({
//     //      path: '/login'
//     //    });
//     //  }
//     //});
//   } else {
//     next();
//   }
// });
export default router
