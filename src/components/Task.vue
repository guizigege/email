
<template>
  <div class="task">
    <div class="applyDialog">
      <el-dialog
        title=""
        :visible.sync="applyDialogVisible"
        width="1000px"
        :close-on-click-modal="false"
        @close='reset'
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">任务号：<span >{{currentTask.id}}</span></div>

        <div>
          <div style="color:#222;letter-spacing: 1px;">已经应用当前任务号的机器为选定的状态，机器名为<span class="red fw">红色</span>，其他未选定的机器名为<span class="fw">黑色</span>：</div>
          <div style="width:800px;margin-top: 10px;">
            <el-checkbox-group v-model="currentTask.computer_list">
              <el-checkbox v-for="(item,index) in computerList" :key="index" :label="item.id"  name="type" class="email-task" :disabled="(item.task_id!=-1)&&!(item.task_id==currentTask.id)||(item.machine_state===1)">{{item.machine_ip}}|{{item.machine_name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doApply">确 认</el-button>
        </span>
      </el-dialog>
    </div>
    <div style="padding:20px 20px 0 20px;">
      <!--启动弹框确认-->
      <div class="detailDialog">
        <el-dialog
          :visible.sync="startTaskDialogVisible"
          width="24%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
          <p>确定要启动该任务吗？</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmStart" >确 定</el-button>
            <el-button @click="startTaskDialogVisible = false" style="margin-left: 20px;">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--停止弹框确认-->
      <div class="detailDialog">
        <el-dialog
          :visible.sync="stopTaskDialogVisible"
          width="24%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
          <span>确定要停止该任务吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmStop" >确 定</el-button>
            <el-button @click="stopTaskDialogVisible = false" style="margin-left: 20px;">取 消</el-button>
          </span>
        </el-dialog>
      </div>

      <!--面包屑导航-->
      <div style="height:20px;line-height: 20px;padding-left: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/task' }"><span @click="get_task_list">任务管理</span></el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--任务表头部-->
      <div class="list-header" >
        <div class="title">任务列表({{tableData.length}})</div>
      </div>
      <!--“新建”任务等-->
      <div class="search">
        <el-button class="add-btn" plain icon="el-icon-plus" @click="toAdd" >新建</el-button>
      </div>
      <!--任务表数据-->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%" border max-height="800px">
        <el-table-column
          prop="id"
          label="任务号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="备注"
          width="150">
        </el-table-column>
        <el-table-column label="应用的终端" width="300">
          <template slot-scope="scope">
            <span>{{scope.row.name_list.join("，")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务操作"  width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="start" class="start" plain @click="doStart(scope.row.id)">启动</el-button>
            <el-button size="mini" type="danger" plain @click="doStop(scope.row.id)" >停止</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="user"
          label="任务属主"
          width="120">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="启动时间"
          width="200">
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.state|filTaskStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="toEdit(scope.row.id)" plain>编辑</el-button>
            <el-button size="mini" @click="toApply(scope.row.id,scope.row.computer_list)" type="primary">应用到</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--页-->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../utils/eventBus.js'
  export default {
    name: 'task',
    data () {
      return {
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        tableData: [
          //任务列表及状态
        ],
        computerList:[],
        startTaskDialogVisible:false, //“启动”任务的确认弹窗 false:隐藏 true:显示
        stopTaskDialogVisible:false, //“暂停”任务的确认弹窗 false:隐藏 true:显示
        applyDialogVisible:false,
        operation:{
          currentId:"", //当前操作的任务号id
        },
        addTask:{
          id:-1,//任务号
          comment:"",
          mail_list_content:"",//编辑框里的邮箱列表
          mail_url:"",//邮箱列表url
          v1_content:"",
          v1_url:"",
          v1_flag:0,
          v2_content:"",
          v2_url:"",
          v2_flag:0,
          v3_content:"",
          v3_url:"",
          v3_flag:0,
          v4_content:"",
          v4_url:"",
          v4_flag:0,
          v5_content:"",
          v5_url:"",
          v5_flag:0,
          v6_content:"",
          v6_url:"",
          v6_flag:0,
          v7_content:"",
          v7_url:"",
          v7_flag:0,
          v8_content:"",
          v8_url:"",
          v8_flag:0,
          v9_content:"",
          v9_url:"",
          v9_flag:0,
          v10_content:"",
          v10_url:"",
          v10_flag:0,
          computer_list:[],
          mail_subject:"",//邮件标题
          mail_content:"", //邮件内容
          attach_flag:0,//是否随机生成邮件内容，1表示选中，0表示不选中
          attach_name:"",//附件名称
          attach_size_min:"", //附件最小大小 number类型
          attach_size_max:"",//附件最大大小 number类型
          start_type:1,   //任务启动类型 number类型
          begin_date:"",   //开始日期
          end_date:"",     //结束日期
          begin_time:"", //开始时间
          end_time:"",   //结束时间
          thread_cnt:1, //线程数量 number类型
        },
        currentTask:{
          id:"",
          computer_list:[]
        }
      }
    },
    methods: {
      // 读取任务列表及状态
      get_task_list(){
        this.$get('/task/list',{})
          .then((res)=>{
            this.tableData = res.data.task_list;
          })
      },
      //启动任务
      start_task(){
        this.$get('/task/start',{id:parseInt(this.operation.currentId),machine_code:""})
          .then((res)=>{
            //回调函数
            this.startTaskDialogVisible = false;
          });
      },
      //暂停任务
      stop_task(){
        this.$get('/task/stop',{id:parseInt(this.operation.currentId),machine_code:""})
          .then((res)=>{
            //回调函数
            this.stopTaskDialogVisible = false;
          });
      },
      //读取单个任务的配置信息
      get_task(id){
        this.$get('/task/info',{id:parseInt(id)}).then((res)=>{
          this.addTask = res.data;
        });

      },
      //修改任务
      modify_task(){
        this.$post('/task/modify',this.addTask).then((res)=>{
          // 修改任务成功的回调
          this.get_task_list();
          this.resetCurrentTask();
          this.applyDialogVisible = false;

        })
      },
      // 读取机器终端id列表
      machine_list_info(){
        this.$get('/machine/info',{})
          .then((res)=>{
            this.computerList = res.data.machine_list;
          })
      },

      // 前往新建任务页面
      toAdd(){
        this.$router.push({path:"/home/task/add"})
      },
      // 前往编辑任务页面
      toEdit(id) {
        this.$router.push({path:"/home/task/edit/"+id})
      },
      toApply(id,computer_list){
        this.currentTask.id = id;
        this.currentTask.computer_list = computer_list;
        this.machine_list_info();
        this.get_task(id);
        this.applyDialogVisible = true;
      },
      doApply(){
        this.addTask.computer_list = this.currentTask.computer_list;
        this.modify_task();
      },
      handleSizeChange(size) {
        this.pagesize = size;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },

      doStart(id){
        this.startTaskDialogVisible= true;
        this.operation.currentId = id;
      },
      doStop(id){
        this.stopTaskDialogVisible = true;
        this.operation.currentId = id;
      },
      confirmStart(){
        this.start_task();
      },
      confirmStop(){
        this.stop_task();
      },
      resetCurrentTask(){
        this.currentTask.id = "";
        this.currentTask.computer_list = [];
      }
    },
    filters:{
      //过滤任务状态
      filTaskStatus(value){
        switch(value){
          case 1: return '未执行';break;
          case 2: return '执行中';break;
          case 3: return '未知';break;
          case 4: return '停止';break;
          case 5: return '结束';break;
          default: return "未知";break;
        }
      }
    },
    created(){
      this.get_task_list();
      this.machine_list_info();
      //点击左边导航栏的“任务管理”条目时，请求任务列表
      bus.$on("task",(res)=>{
        this.get_task_list();
      })
    },
    beforeDestroy(){
      bus.$off("task");
    }

  }
</script>
<style>

  .addDialog .el-dialog.el-dialog--center{
    margin-top: 8vh!important;
  }
  .addDialog .el-input__inner{
    color:#333;
  }
  .addDialog .el-dialog__header{
    padding:12px 10px;
    background-color: steelblue;
    color:#fff;
  }
  .addDialog .el-dialog__close{
    display: inline-block;
    padding-top:-10px;
    vertical-align: top;
    color:#fff;
    font-weight: bolder;
  }

  .addDialog .el-button--primary{
    background-color: steelblue;
  }
  .addDialog .el-button--primary:hover{
    opacity: 0.9;
  }
  .addDialog .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .addDialog .el-checkbox.email-task{
    width:400px;height:30px;line-height: 30px;display: inline-block;
  }

</style>

<style scoped>



  .add-btn{
    width: 100px;
    height: 36px;
    border: 1px solid #dcdfe6;
    background: #0a6a97;
    color: #fff;
    margin-right: 60px;
    float: right;
    margin-top: 22px;
  }

</style>
