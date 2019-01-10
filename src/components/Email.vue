
<template>
  <div class="email">

    <div class="applyDialog">
      <el-dialog
        title=""
        :visible.sync="applyDialogVisible"
        width="1000px"
        :close-on-click-modal="false"
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">邮箱组号：<span >{{addEmail.id}}</span></div>
        <div v-loading.lock="fullscreenLoading"  element-loading-text="正在运用到邮箱小号组，请稍等..." element-loading-spinner="el-icon-loading">
          <div style="color:#222;letter-spacing: 1px;">已经应用当前邮箱组号的机器为选定的状态，机器名为<span class="red fw">红色</span>，其他未选定的机器名为<span class="fw">黑色</span>：</div>
          <div style="width:800px;margin-top: 10px;">
            <el-checkbox-group v-model="currentEmail.computer_list">
              <el-checkbox v-for="(item,index) in computerList" :key="index" :label="item.id"  name="type" class="email-task" :disabled="(item.sender_id!=-1)&&!(item.sender_id==currentEmail.id)||(item.machine_state===1)">{{item.machine_ip}}|{{item.machine_name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doApply" >确 认</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="addDialog">
      <el-dialog
        title=""
        :visible.sync="addDialogVisible"
        width="1000px"
        :close-on-click-modal="false"
        @close='reset'
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">组号：<span v-if="operation==='add'?false:true">{{addEmail.id}}</span></div>
        <div  v-loading.lock="fullscreenLoading2"  element-loading-text="请求响应中，请稍等..." element-loading-spinner="el-icon-loading">
          <div>
            <div style="color:#222;letter-spacing: 1px">请输入符合格式的数据<span class="red">（如选择上传数据文件，下列框中的数据不会生效）</span></div>
            <el-input type="textarea" v-model="addEmail.content" :rows="10" style="margin-top: 10px;" resize="none"></el-input>
            <div><span class="red" style="float: right;font-size: 12px;">最大长度限制1M</span></div>
          </div>
          <div style="margin-top: 20px;">
            <div style="color:#222;letter-spacing: 1px;">请选择应用的任务终端</div>
            <div style="width:800px;margin-top: 10px;">
              <el-checkbox-group v-model="addEmail.computer_list">
                <el-checkbox v-for="(item,index) in computerList" :key="index" :label="item.id" name="type" class="email-task" :disabled="((item.sender_id!=-1)&&!(item.sender_id==addEmail.id))||(item.machine_state===1)">{{item.machine_ip}}|{{item.machine_name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div style="margin-top: 20px;">
            <div style="display: inline-block;width:352px;">
              <el-radio-group v-model="addEmail.way">
                <el-radio :label="0" style="line-height: 30px;">平均分配</el-radio><br/>
                <el-radio :label="1" style="line-height: 30px;" >随机分配</el-radio>
              </el-radio-group>
            </div>
            <div style="display: inline-block">
              <span>备注：</span><el-input v-model="addEmail.comment" style="width:400px"></el-input>
            </div>
          </div>
          <div style="margin-top: 20px;">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="uploadUrl"
              :limit="1"
              :on-success="get_file"
              :file-list="addEmail.fileList"
            >
              <el-button slot="trigger" size="small" type="primary">上传文件</el-button> <span class="red" style="margin-left: 10px;">提示：如果使用上传功能，文本框的内容失效</span>

            </el-upload>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
        <el-button @click="doAddOrEdit" type="primary" style="margin-right: 50px;">确 认</el-button>
        <el-button @click="reset" v-if="operation==='add'?true:false">重 置</el-button>
        <el-button @click="recover(addEmail.id)" v-if="operation==='edit'?true:false">恢 复</el-button>
        </span>
      </el-dialog>
    </div>
    <div style="padding:20px 20px 0 20px;">
      <div style="height:20px;line-height: 20px;padding-left: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/email' }"><span @click="get_sender_list">邮箱小号管理</span></el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="list-header" >
        <div class="title">邮箱小号管理列表({{tableData.length}})</div>
      </div>
      <div class="search">
        <el-input v-model="search" placeholder="搜索终端..." style="width: 250px;margin-right: 20px;"></el-input><el-button icon="el-icon-search">搜索</el-button>      <el-button class="add-btn" plain icon="el-icon-plus" @click="toAdd" >新建</el-button>
      </div>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%" border max-height="800px">
        <el-table-column
          prop="id"
          label="组号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="comment"
          label="备注"
          width="150">
        </el-table-column>
        <el-table-column
          prop="sender_cnt"
          label="数量"
          width="80">
        </el-table-column>

        <el-table-column label="应用的终端" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.name_list.join("，")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="toEdit(scope.row.id)" plain>编辑</el-button>
            <el-button size="mini" @click="toApply(scope.row.id,scope.row.computer_list)" type="primary" plain>应用到</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    name: 'email',
    data () {
      return {
        fullscreenLoading:false,
        fullscreenLoading2:false,
        uploadUrl:"/upload",
        search:"",
        operation:"", //操作类型：“新建”还是“编辑”
        addDialogVisible: false, //“新建”和“编辑”窗口
        applyDialogVisible:false,//“应用到”窗口
        computerList:[

        ],
        currentEmail:{
          id:"",
          computer_list:[]
        },
        addEmail:{
          id:-1, //组号
          content:"", //小号内容，可能为空
          computer_list:[], //读取的应用的终端列表
          way:0, //分配方式，0表示平均分配、1表示随机分
          comment:"",//备注
          url:"",//小号url
          fileList:[] //上传的文件列表
        },
        // showHc:this.$global.showHc,
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        tableData: [
          // 邮箱小号列表传入的数据
        ],



      }
    },
    methods: {
      // 读取机器终端id列表
      machine_list_info(){
        this.$get('/machine/info',{})
          .then((res)=>{
            this.computerList = res.data.machine_list;
          })
      },
      //读取邮箱小号列表
      get_sender_list(){
        this.$get('/mailsender/list',{})
          .then((res)=>{
            this.tableData = res.data.sender_list;
          })
      },
      //添加邮箱小号
      add_mail_sender(){
        this.$post('/mailsender/add',{
          comment:this.addEmail.comment,
          computer_list:this.addEmail.computer_list,
          content:this.addEmail.content,
          url:this.addEmail.url,
          way:parseInt(this.addEmail.way)
        })
          .then((res)=>{
            //成功的回调
            this.addDialogVisible = false; //隐藏弹框
            this.fullscreenLoading2 = false;
            this.get_sender_list();
            this.reset();
          })
      },
      //读取邮箱小号
      get_mail_sender(id){
        this.$get('/mailsender/load',{
          id:id,
        })
          .then((res)=>{
            this.addEmail.id = res.data.id;
            this.addEmail.content = res.data.content;
            this.addEmail.computer_list = res.data.computer_list;
            this.addEmail.way = res.data.way;
            this.addEmail.comment = res.data.comment;
            this.addEmail.url = res.data.url;
          })
      },
      //修改邮箱小号
      modify_mail_sender(){
        this.$post('/mailsender/modify',{
          id:parseInt(this.addEmail.id),
          comment:this.addEmail.comment,
          computer_list:this.addEmail.computer_list,
          content:this.addEmail.content,
          url:this.addEmail.url,
          way:this.addEmail.way,

        })
          .then((res)=>{
            //成功的回调
            this.get_sender_list();
            this.reset();
            this.applyDialogVisible = false;
            this.addDialogVisible = false; //隐藏弹框
            this.fullscreenLoading = false;
            this.fullscreenLoading2 = false;
          })
      },
      get_file(response){
        console.log(response);
        this.addEmail.url = response.link;
      },
      toApply(id,computer_list){
        this.currentEmail.id = id;
        this.currentEmail.computer_list = computer_list;
        this.machine_list_info();
        this.get_mail_sender(id);
        this.applyDialogVisible = true;
      },
      doApply(){
        this.fullscreenLoading = true;
        this.addEmail.computer_list = this.currentEmail.computer_list;
        this.modify_mail_sender();
      },
      //新建按钮处理函数
      toAdd(){
        this.operation = "add";  //标记为“新建”操作
        this.addDialogVisible = true;  //显示“添加邮箱小号”弹框
        this.addEmail.id = this.tableData[this.tableData.length-1].id + 1;  //组号自动+1
      },
      //编辑按钮处理函数
      toEdit(id){
        this.operation = "edit";  //标记为“编辑”操作
        this.addDialogVisible = true; //显示“编辑邮箱小号”弹框
        this.addEmail.id = id;
        this.get_mail_sender(parseInt(id));
      },
      //弹框确定按钮
      doAddOrEdit(){
        this.fullscreenLoading2 = true;
        // 判断“新建”操作还是“编辑”操作
        if(this.operation === "edit"){
          this.modify_mail_sender();
        }else{
          this.add_mail_sender();
        }
      },
      handleSizeChange(size) {
        this.pagesize = size;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },
      reset(){

          this.addEmail.id = -1, //组号
          this.addEmail.content = "", //小号内容，可能为空
          this.addEmail.computer_list = [], //读取的应用的终端列表
          this.addEmail.way = 0, //分配方式，0表示平均分配、1表示随机分配
          this.addEmail.comment ="", //备注
          this.addEmail.url = "", //小号url
          this.addEmail.fileList = [] //上传的文件列表

      },
      recover(id){
        this.get_mail_sender(id);
      },

    },
    watch:{

    },
    created(){
      //页面created时,读取邮箱小号列表
      this.get_sender_list();
      this.machine_list_info();
      //点击左边导航栏的“邮箱小号管理”条目时，请求邮箱小号列表
      bus.$on("email",(res)=>{
        this.get_sender_list();
      })
    },
    beforeDestroy(){
      bus.$off("email");
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
