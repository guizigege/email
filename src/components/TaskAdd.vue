
<template>
  <div class="task-edit">
    <div class="detailDialog">
      <el-dialog
        :visible.sync="confirmDialogVisible"
        width="24%"
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
        <p>确定添加该任务吗？</p>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmAdd" >确 定</el-button>
            <el-button @click="confirmDialogVisible = false" style="margin-left: 20px;">取 消</el-button>
          </span>
      </el-dialog>
    </div>
    <div style="padding:20px 20px 0 20px;">
      <!--面包屑-->
      <div style="height:20px;line-height: 20px;padding-left: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/task' }">任务板块</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/task/add' }">新建任务</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--新建任务-->
      <div class="setParamDialog" style="padding:20px 0;box-sizing: border-box">
        <div style="background-color: steelblue;color:#fff;height:30px;line-height: 30px;padding-left: 20px;font-size: 14px;font-weight: bold;">创建新的任务</div>
        <div style="border:1px solid steelblue;padding:5px 20px 20px 20px">

          <div>
            <p class="setParamTitle">邮箱地址（请输入邮件地址列表，支持邮件地址和ADS格式邮件地址），如果使用上传功能，下列文本框的内容失效</p>
            <el-input type="textarea" :rows="12" resize="none" v-model="addTask.mail_list_content"></el-input>
            <div><span style="float: right;font-size: 12px;color:#DE4C56">最大长度限制1M</span></div>
            <el-upload style="margin-top: 20px;"
                       class="upload-demo"
                       action="/upload"
                       :limit="1"
                       :file-list="fileList"
                       :on-success="uploadEmailFile"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="task-item">
            <p class="setParamTitle">设置自动变量</p>
            <table>
              <thead>
              <tr>
                <td>自动变量名称</td>
                <td>变量的值</td>
                <td>上传</td>
                <td>同名变量值保持一致</td>
              </tr>
              </thead>
              <tr>
                <td>V1</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v1_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV1File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v1_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V2</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none"  v-model="addTask.v2_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV2File"
                  >
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v2_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V3</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v3_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV3File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v3_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V4</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v4_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV4File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v4_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V5</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v5_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV5File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v5_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V6</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v6_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV6File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v6_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V7</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v7_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV7File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v7_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V8</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v8_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV8File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v8_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V9</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v9_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV9File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v9_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
              <tr>
                <td>V10</td>
                <td><el-input type="textarea" :rows="contentRow" resize="none" v-model="addTask.v10_content"></el-input></td>
                <td>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :limit="1"
                    :file-list="fileList"
                    :on-success="setParamV10File">
                    <el-button size="small" type="primary">上传文件</el-button>
                  </el-upload>
                </td>
                <td> <el-checkbox-group v-model="addTask.v10_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                </el-checkbox-group></td>
              </tr>
            </table>
          </div>
          <div class="task-item">
            <p class="setParamTitle">设定邮件内容</p>
            <div style="height:40px;line-height: 30px;">邮件标题：<el-input style="width:30%;" v-model="addTask.mail_subject"></el-input></div>
            <div style="height:40px;line-height: 30px;">邮件内容（HTML格式）</div>
            <el-input type="textarea" :rows="20" resize="none" v-model="addTask.mail_content"></el-input>
            <div><span style="float: right;font-size: 12px;color:#DE4C56">最大长度限制1M</span></div>
            <div >
              <div style="height:40px;line-height: 30px;">
                <el-checkbox-group v-model="addTask.attach_flag">
                  <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0 >随机生成附件内容</el-checkbox>
                </el-checkbox-group>
              </div>
              <div style="height:40px;line-height: 30px;">
                <span>名称：</span><el-input style="width:300px" v-model="addTask.attach_name"></el-input>
                <span>大小：</span><el-input-number v-model="addTask.attach_size_min" :controls="false"  style="width:100px"></el-input-number><span style="margin-left: 6px">kb</span><span style="margin:0 4px;font-weight: bolder;">------</span><el-input-number v-model="addTask.attach_size_max" :controls="false"  style="width:100px"></el-input-number><span style="margin-left: 6px">kb</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <p class="setParamTitle">请选择任务终端</p>
            <div style="width:800px;margin-top: 10px;">
              <el-checkbox-group v-model="addTask.computer_list">
                <el-checkbox v-for="(item,index) in computerList" :key="index" :label="item.id" name="type" class="email-task" :disabled="(item.task_id!=-1)&&!(item.task_id==addTask.id)||(item.machine_state===1)">{{item.machine_ip}}|{{item.machine_name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="task-item">
            <p class="setParamTitle">选择任务时间</p>
            <el-radio-group v-model="addTask.start_type">
              <el-radio :label="1">立即开始</el-radio>
              <el-radio :label="2">时间段执行</el-radio>
              <el-radio :label="3">每日执行</el-radio>
            </el-radio-group>

            <el-date-picker
              v-model="timeStart"
              type="datetime"
              placeholder="选择日期时间"  value-format="yyyy-MM-dd HH:mm:ss" @change="startDate">
            </el-date-picker>
            <el-date-picker
              v-model="timeEnd"
              type="datetime"
              placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="endDate">
            </el-date-picker>
          </div>
          <div class="task-item">
            <p class="setParamTitle">其他</p>
            <div><span>线程数量：</span><el-input-number v-model="addTask.thread_cnt" :controls="false" :min="1" :max="99" style="width:200px"></el-input-number><div style="display: inline-block;margin-left: 20px;">备注：<el-input v-model="addTask.comment"  style="width:300px"></el-input></div></div>
          </div>

          <div style="margin-top: 10px;padding-left:150px;padding-top:10px;border-top:1px solid #ddd">
            <el-button @click="doAdd" type="primary" plain style="margin-right: 80px;">确定</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'task-edit',
    data () {

      return {
        confirmDialogVisible:false,
        uploadUrl:"/upload",
        contentRow:4,
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
        fileList:[],
        timeStart:"", //
        timeEnd:"", //
        computerList:[], //获取的应用终端

      }
    },
    methods: {

      //添加任务
      add_task(){
        this.$post('/task/add',this.addTask).then((res)=>{
          // 修改任务成功的回调
          this.$router.push({path:'/home/task'});
        })
      },
      // 读取机器终端id列表
      machine_list_info(){
        this.$get('/machine/info',{})
          .then((res)=>{
            this.computerList = res.data.machine_list;
          })
      },
      //确定添加任务配置信息
      doAdd() {
        this.confirmDialogVisible = true;
      },
      confirmAdd(){
        this.confirmDialogVisible = false;
        this.add_task();
      },
      //获取开始日期和开始时间
      startDate(date){
        this.timeStart = date;
        this.addTask.begin_date = date.split(" ")[0];
        this.addTask.begin_time = date.split(" ")[1];
      },
      //获取结束日期和结束时间
      endDate(date){
        this.timeEnd = date;
        this.addTask.end_date = date.split(" ")[0];
        this.addTask.end_time = date.split(" ")[1];
      },
      //重置
      reset(){
        this.get_task();
      },
      //上传邮件地址文件
      uploadEmailFile(response){
        this.addTask.mail_url = response.link;
      },
      setParamV1File(response){
        this.addTask.v1_url = response.link;
        console.log(this.addTask.v1_url);
      },
      setParamV2File(response){
        this.addTask.v2_url = response.link;
      },
      setParamV3File(response){
        this.addTask.v3_url = response.link;
      },
      setParamV4File(response){
        this.addTask.v4_url = response.link;
      },
      setParamV5File(response){
        this.addTask.v5_url = response.link;
      },
      setParamV6File(response){
        this.addTask.v6_url = response.link;
      },
      setParamV7File(response){
        this.addTask.v7_url = response.link;
      },
      setParamV8File(response){
        this.addTask.v8_url = response.link;
      },
      setParamV9File(response){
        this.addTask.v9_url = response.link;
      },
      setParamV10File(response){
        this.addTask.v10_url = response.link;
      },


    },

    created(){
      this.machine_list_info();
    },
  }
</script>
<style>

  .setParamDialog .el-input__inner{
    color:#333;
  }
  .internal .el-checkbox.email-task{
    width:400px;height:30px;line-height: 30px;display: inline-block;
  }

  .setParamDialog .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .setParamDialog  .el-input__inner{
    height:30px;
  }
  .setParamDialog .setNet .el-input-number.is-without-controls .el-input__inner{
    width: 80px;
  }
  .setParamDialog .el-checkbox__label{
    padding-left: 2px;
  }
  .internal .el-checkbox__label{
    padding-left: 10px;
  }
  .setParamDialog .el-checkbox-group .el-checkbox{
    margin-left: 6px;
  }

  .setParamDialog .internal .el-checkbox-group .el-checkbox{
    margin-left: 0px;
  }

  .row .el-checkbox-group{
    display: inline-block;
  }
  .setParamDialog .el-button--primary{
    background-color: #fff;
    color:steelblue;
    border:1px solid steelblue;
  }
  .setParamDialog .el-button--primary:focus,.setParamDialog .el-button--primary:hover{
    background-color: steelblue;
    color:#fff;
    border:1px solid #fff;
  }
</style>
<style scoped>
  .setParamTitle{
    color:steelblue;letter-spacing: 0.5px;line-height: 0;
  }
  .task-item{
    margin-top: 40px;
  }

  table,table tr th, table tr td { border:1px solid #666; }
  table thead{
    background-color: steelblue;
    color:#fff;
  }
  table tr td:nth-child(2){
    min-width: 400px;
    padding:10px;
  }
  table tr td:nth-child(3){
    min-width: 120px;
    padding:10px;
  }
  table { width: 80%; min-width:1000px; min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse; padding:2px;}
</style>
