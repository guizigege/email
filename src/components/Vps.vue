
<template>
  <div class="vps">
    <div style="padding:20px 20px 0 20px;">
      <!--机器码弹框-->
      <div class="machineNumDialog">
        <el-dialog
          title=""
          :visible.sync="machineNumDialogVisible"
          width="30%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">机器码：<span style="text-decoration:underline">{{machineCode.currentMachineCode}}</span></div>
          <div>
            <div style="text-align: center;height:60px;line-height: 60px;">
              用户名：<el-input placeholder="请输入用户名" v-model="machineCode.userName" clearable style="width:250px"></el-input>
            </div>
            <div style="text-align: center;height:60px;line-height: 60px;">
              注册码：<el-input placeholder="请输入注册码" v-model="machineCode.regCode" clearable style="width:250px"></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="set_machine_user" type="primary">确 认</el-button>
    <el-button  @click="machineNumDialogVisible = false" style="margin-left: 20px;">取 消</el-button>
        </span>
        </el-dialog>
      </div>
      <!--详细信息弹框-->
      <div class="detailDialog">
        <el-dialog
          title=""
          :visible.sync="detailDialogVisible"
          width="26%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">连接信息</div>
          <div>
            <div style="text-align: center;height:60px;line-height: 60px;">
              <el-input v-model="machineDetail.ip" clearable style="width:250px"></el-input>
            </div>
            <div style="text-align: center;height:60px;line-height: 60px;">
              <el-input v-model="machineDetail.userName" clearable style="width:250px"></el-input>
            </div>
            <div style="text-align: center;height:60px;line-height: 60px;">
              <el-input v-model="machineDetail.passWord" clearable style="width:250px"></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="set_machine_extra" type="primary">确 认</el-button>
        </span>
        </el-dialog>
      </div>
      <!--确认操作-->
      <div class="detailDialog">
        <el-dialog
          :visible.sync="startTaskDialogVisible"
          width="24%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
          <!--<p><span style="font-weight: bold;">任务终端ID：</span>{{this.operation.currentId}}</p>-->
          <!--<p><span style="font-weight: bold;">机器码：</span>{{this.operation.currentMachineCode}}</p>-->
          <p>确定发送邮件吗？</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="start_task" >确 定</el-button>
            <el-button @click="startTaskDialogVisible = false" style="margin-left: 20px;">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="detailDialog">
        <el-dialog
          :visible.sync="stopTaskDialogVisible"
          width="24%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
          <span>确定停止发送邮件吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="stop_task" >确 定</el-button>
            <el-button @click="stopTaskDialogVisible = false" style="margin-left: 20px;">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="detailDialog">
        <el-dialog
          :visible.sync="restartTaskDialogVisible"
          width="24%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
          <span>确定重启该群发机吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="machine_restart" >确 定</el-button>
            <el-button @click="restartTaskDialogVisible = false" style="margin-left: 20px;">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!--重启成功提示-->
      <div class="detailDialog">
        <el-dialog
          :visible.sync="restartTip"
          width="24%"
          center>
          <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
          <span>重启成功！</span>
        </el-dialog>
      </div>
      <!--面包屑导航-->
      <div style="height:20px;line-height: 20px;padding-left: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="height:40px;">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/vps' }" ><span @click="load_machine_list">VPS管理</span></el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--表格头部-->
      <div class="list-header" >
        <div class="title" style="margin-left: 20px;">VPS系统管理({{tableData.length}})</div>
      </div>
      <!--vps数据表格-->
      <div class="vps-table">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%" border max-height="800px">

          <el-table-column
            prop="name"
            label="机器名"
            width="120">
          </el-table-column>
          <el-table-column label="群发操作"  width="288" class="operation">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="confirmRestart(scope.row.id)">重启群发机</el-button>
              <el-button size="mini" type="start" class="start" plain @click="confirmStart(scope.row.id,scope.row.machine_code)">发送邮件</el-button>
              <el-button size="mini" type="danger" plain @click="confirmStop(scope.row.id,scope.row.machine_code)">停止发送</el-button>
            </template>
          </el-table-column>
          <el-table-column label="群发机状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.machine_state|filMachineStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务状态" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.task_state|filTaskStatus}}|编号:{{scope.row.task_id}}</span>
            </template>
          </el-table-column>
          <el-table-column label="机器码" width="110">
            <template slot-scope="scope">
              <span :class="scope.row.machine_code==='未知'?'':(scope.row.has_username===1?'detail':'detail0')"  @click="openMachineNum(scope.row.machine_code)">{{ scope.row.machine_code}}</span>
            </template>
          </el-table-column>
          <el-table-column label="详细信息" width="80">
            <template slot-scope="scope">
              <span class="detail" @click="openMachineDetail(scope.row.machine_code)">详细信息</span>
            </template>
          </el-table-column>
          <el-table-column label="网络连接状态" width="220">
            <template slot-scope="scope">
              <span :class="/在线/.test(scope.row.net)===true?'green':'red'">{{ scope.row.net}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="任务终端ID"
            width="200">
          </el-table-column>

        </el-table>
      </div>
      <!--页码-->
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
    name: 'application',
    data () {
      return {
        machineNumDialogVisible: false, //“机器码”弹框是否显示 false：隐藏，true：显示
        detailDialogVisible:false,  //”详细信息“弹框是否显示 false：隐藏，true：显示
        startTaskDialogVisible:false, //“启动”弹框是否显示 false：隐藏，true：显示
        stopTaskDialogVisible:false,//“停止”弹框是否显示 false：隐藏，true：显示
        restartTaskDialogVisible:false,//“重启”弹框是否显示 false：隐藏，true：显示
        restartTip:false,
        //详细信息弹框对象
        machineCode:{
          currentMachineCode:"", //当前机器码
          userName:"", //用户名
          regCode:"", //注册码
        },
        //机器码弹框对象
        machineDetail:{
          currentMachineCode:"", //当前机器码
          ip:"", //ip
          userName:"",  //用户名
          passWord:"", //密码
        },
        //启动停止重启操作时对应的机器码和id
        operation:{
          currentMachineCode:"",
          currentId:"",
        },
        pagesize:10, //每页的数据条数
        currentPage:1, //默认开始页面
        tableData: [
          //vps系统接口传入的数据

        ]
      }
    },
    methods: {
      //读取机器列表及状态
      load_machine_list(){
        this.$get('/machine/list',{})
          .then((res)=>{
            this.tableData = res.data.machine_list;
          })
      },
      //读取机器详细信息
      get_machine_extra(machineCode){
        this.$get('/machine/get_extra',{machine_code:machineCode})
          .then((res)=>{
            this.machineDetail.currentMachineCode = machineCode;
            this.machineDetail.ip = res.data.ip;
            this.machineDetail.userName = res.data.username;
            this.machineDetail.passWord = res.data.passwd;
          });
      },
      //修改机器详细信息
      set_machine_extra(){
        this.$get('/machine/set_extra',
          {
            machine_code:this.machineDetail.currentMachineCode,
            ip:this.machineDetail.ip,
            username:this.machineDetail.userName,
            passwd:this.machineDetail.passWord
          })
          .then((res)=>{
            this.detailDialogVisible = false;
          });
      },
      //获取用户名、注册码
      get_machine_user(machineCode){
        this.$get('/machine/get_user',{machine_code:machineCode})
          .then((res)=>{
            this.machineCode.userName = res.data.username;
            this.machineCode.regCode = res.data.regcode;
          });
      },
      //修改用户名、注册码
      set_machine_user(){
        this.$get('/machine/set_user',
          {
            machine_code:this.machineCode.currentMachineCode,
            username:this.machineCode.userName,
            regcode:this.machineCode.regCode
          })
          .then((res)=>{
            this.machineNumDialogVisible = false;
          });
      },
      //重启软件
      machine_restart(){
        this.$get('/machine/restart',{id:this.operation.currentId})
          .then((res)=>{
            //回调函数
            this.restartTaskDialogVisible = false;
            this.restartTip = true;
            setTimeout(()=>{
              this.restartTip = false;
            },1500)
          });
      },
      //启动任务
      start_task(){
        this.$get('/task/start',{id:this.operation.currentId,machine_code:this.operation.currentMachineCode})
          .then((res)=>{
            //回调函数
            this.startTaskDialogVisible = false;
          });
      },
      //暂停任务
      stop_task(){
        this.$get('/task/stop',{id:this.operation.currentId,machine_code:this.operation.currentMachineCode})
          .then((res)=>{
            //回调函数
            this.stopTaskDialogVisible = false;
          });
      },

      //打开详细信息的弹窗
      openMachineDetail(machineCode){
        this.get_machine_extra(machineCode);
        this.detailDialogVisible = true;
      },
      //打开编辑机器码的弹窗
      openMachineNum(machineCode){
        //判断机器码的值，如果为“未知”，则点击失效
        if(machineCode==="未知"){
          return false;
        }else{
          this.machineNumDialogVisible = true;
          this.machineCode.currentMachineCode = machineCode;
          this.get_machine_user(machineCode);
        }
      },
      //“启动”弹框确定
      confirmStart(id, machineCode){
        this.startTaskDialogVisible = true;
        this.operation.currentId = id;
        this.operation.currentMachineCode = machineCode;
      },
      //“停止”弹框确定
      confirmStop(id, machineCode){
        this.stopTaskDialogVisible = true;
        this.operation.currentId = id;
        this.operation.currentMachineCode = machineCode;
      },
      //“重启”弹框确定
      confirmRestart(id){
        this.restartTaskDialogVisible = true;
        this.operation.currentId = id;
      },

      //设置页值
      handleSizeChange(size) {
        this.pagesize = size;
      },
      //当前页
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },
    },
    filters:{
      // 机器状态过滤
      filMachineStatus(value){
        switch(value){
          case 1: return '离线';break;
          case 2: return '未运行';break;
          case 3: return '运行中';break;
          case 4: return '未登入';break;
          case 5: return '登入失败';break;
          case -1: return '未知';break;
          default: return "未知";break;
        }
      },
      // 任务状态过滤
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
      //页面created时加载机器列表
      this.load_machine_list();
      //点击左边导航栏的“vps系统管理”条目时，请求机器列表
      bus.$on("vps",(res)=>{
        this.load_machine_list();
      })
    },
    beforeDestroy(){
      bus.$off("vps");
    }

  }
</script>

<style>

  .machineNumDialog .el-dialog--center .el-dialog__body{
    border-top: 1px solid #ccc;
    padding: 25px 25px 20px 25px;
  }
  .machineNumDialog .el-dialog__close{
    font-weight: 900;
  }
  .detailDialog .el-input__inner{
    color:#333;
  }
  .machineNumDialog .el-button--primary,.detailDialog .el-button--primary{
    background-color: steelblue;
  }
  .machineNumDialog .el-button--primary:hover,.detailDialog .el-button--primary:hover{
    opacity: 0.9;
  }

  .detailDialog .el-dialog.el-dialog--center{
    margin-top: 30vh!important;
  }
</style>
<style scoped>

  .detail{
    display: inline-block;
    color:steelblue;cursor:pointer;
    line-height: 20px;
  }
  .detail:hover{
    cursor: pointer;
    border-bottom:1px solid steelblue;
  }
  .detail0{
    display: inline-block;
    color:#ccc;cursor:pointer;
    line-height: 20px;
  }
  .detail0:hover{
    cursor: pointer;
    border-bottom:1px solid #ccc;
  }
  .red{
    color:red;
  }
  .green{
    color:green;
  }
</style>
