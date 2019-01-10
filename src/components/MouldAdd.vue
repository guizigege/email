
<template>
  <div class="mould-add">
    <!--确认操作-->
    <div class="detailDialog">
      <el-dialog
        :visible.sync="confirmDialogVisible"
        width="24%"
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
        <p>确定添加该模板吗？</p>
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
          <el-breadcrumb-item :to="{ path: '/home/mould' }">参数设置及模板板块</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/mould/add' }">新建模板</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="setParamDialog" style="padding:20px 0;box-sizing: border-box">
        <div style="background-color: steelblue;color:#fff;height:30px;line-height: 30px;padding-left: 20px;">参数设置</div>
        <div style="border:1px solid steelblue;padding:12px 20px 20px 20px">
          <div class="setParamTitle" style="height:40px;">模板名称： <el-input type="text" v-model="params.name" style="width:400px" placeholder="请输入模板名称"></el-input></div>
          <div class="setEmail">
            <div class="setParamTitle">邮箱设置</div>
            <el-table
              :data="setEmailData"
              border
              style="width: 100%"
              type="index">
              <el-table-column label="参数名"  width="400">
                <template slot-scope="scope">
                  <span>{{scope.row.param}}</span>
                </template>
              </el-table-column>
              <el-table-column label="设置值"  width="290">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="params.use_helo" v-if="(scope.$index)===0?true:false">
                    <el-checkbox   class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group v-model="params.reset_pday" v-if="(scope.$index)===1?true:false">
                    <el-checkbox   class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                  </el-checkbox-group>
                  <div v-if="(scope.$index)===2?true:false">
                    <el-input-number v-model="params.chgnum_min" :controls="false"  :min="0" :max="99" style="width:48px"></el-input-number> ------  <el-input-number v-model="params.chgnum_max" :controls="false" :min="0" :max="99" style="width:48px"></el-input-number>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="描述"  width="241">
                <template slot-scope="scope">
                  <span>{{scope.row.desc}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="setNet">
            <div class="setParamTitle">网络设置</div>
            <el-table
              :data="setNetData"
              border
              style="width: 100%"
              type="index">
              <el-table-column label="参数名"  width="400">
                <template slot-scope="scope">
                  <span>{{scope.row.param}}</span>
                </template>
              </el-table-column>
              <el-table-column label="设置值"  width="290">
                <template slot-scope="scope">
                  <div v-if="(scope.$index)===0?true:false" class="setEmail">
                    <el-input-number v-model="params.rcount" :controls="false"  :min="1" :max="10000" style="width:200px"></el-input-number>
                  </div>
                  <el-checkbox-group v-model="params.auto2helo" v-if="(scope.$index)===1?true:false">
                    <el-checkbox class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                  </el-checkbox-group>
                  <div v-if="(scope.$index)===2?true:false" class="setEmail">
                    <el-input v-model="params.net_name" style="width:150px;" maxlength="8" :disabled="!params.auto2helo"></el-input>
                  </div>
                  <div v-if="(scope.$index)===3?true:false">
                    <el-input-number v-model="params.disconn_maxtime" :controls="false"  :min="0" :max="60" :disabled="!params.auto2helo"></el-input-number>
                  </div>
                  <div v-if="(scope.$index)===4?true:false">
                    <el-input-number v-model="params.recontm" :controls="false"  :min="0" :max="60" :disabled="!params.auto2helo"></el-input-number>
                  </div>
                  <div v-if="(scope.$index)===5?true:false">
                    <el-input-number v-model="params.wait_afterconn" :controls="false"  :min="0" :max="60" :disabled="!params.auto2helo"></el-input-number>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="描述"  width="241">
                <template slot-scope="scope">
                  <span>{{scope.row.desc}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="setEmailOption">
            <div class="setParamTitle">邮件选项</div>
            <el-table
              :data="setEmailOptionData"
              :span-method="emailOption"
              border
              style="width: 100%"
              type="index">
              <el-table-column label="参数名"  width="400">
                <template slot-scope="scope">
                  <span>{{scope.row.param}}</span>
                </template>
              </el-table-column>
              <el-table-column label="设置值"  width="290">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="senderType0" v-if="(scope.$index)===0?true:false" @change="sendertype0">
                    <el-checkbox :label=0 class="email-task">随机生成字符串</el-checkbox>
                    <el-checkbox :label=1 class="email-task">中文百家姓+名</el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group v-model="senderType1" v-if="(scope.$index)===1?true:false" @change="sendertype1">
                    <el-checkbox :label=2 class="email-task">自定义列表</el-checkbox>
                    <el-checkbox :label=3 class="email-task">不显示发件人名称</el-checkbox>
                  </el-checkbox-group>
                  <div v-if="(scope.$index)===2?true:false" class="setEmail">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :action="uploadUrl"
                      :file-list="fileList"
                      :limit="1"
                      :on-success="nameListUrl"
                      :disabled="!(params.sendertype===2)"
                    >
                      <el-button slot="trigger" size="small" type="primary" :disabled="!(senderType1[0]===2)">选取文件</el-button>
                    </el-upload>
                  </div>
                  <el-checkbox-group v-model="nameSeperateWay" v-if="(scope.$index)===3?true:false" @change="seperateWay" >
                    <el-checkbox :label=1  class="email-task" :disabled="!(senderType1[0]===2)">平均分配</el-checkbox>
                    <el-checkbox :label=2  class="email-task" :disabled="!(senderType1[0]===2)">全部分配</el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group v-model="params.auto_t2n" v-if="(scope.$index)===4?true:false">
                    <el-checkbox label="选中" name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column label="描述"  width="241">
                <template slot-scope="scope">
                  <span>{{scope.row.desc}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="setEmailHead">
            <div class="setParamTitle">邮件头</div>
            <el-table
              :data="setEmailHeadData"
              :span-method="emailHeader"
              border
              style="width: 100%"
              type="index">
              <el-table-column label="参数名"  width="400">
                <template slot-scope="scope">
                  <span>{{scope.row.param}}</span>
                </template>
              </el-table-column>
              <el-table-column label="设置值"  width="290">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="params.buseownhead" v-if="(scope.$index)===0?true:false">
                    <el-checkbox class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                  </el-checkbox-group>
                  <el-checkbox-group v-model="params.mh_auto_crack" v-if="(scope.$index)===1?true:false">
                    <el-checkbox class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                  </el-checkbox-group>
                  <div v-if="(scope.$index)===2?true:false" class="setEmail">
                    <el-input type="textarea" v-model="params.mh_content" :rows="5" :disabled="!params.buseownhead" resize="none"></el-input>
                  </div>
                  <div v-if="(scope.$index)===3?true:false" class="row">
                    <el-checkbox-group v-model="params.mh_no_xmailer" >
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>X-Mailer</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="params.mh_no_mimever" >
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>MIME-Version</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="params.mh_no_priority" >
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>Priority</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div  v-if="(scope.$index)===4?true:false" class="row">
                    <el-checkbox-group v-model="params.mh_no_msgid">
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>Message-ID</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="params.mh_no_date" >
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>Date</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="params.mh_no_from" >
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>From</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-if="(scope.$index)===5?true:false" class="row">
                    <el-checkbox-group v-model="params.mh_no_to" >
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>To</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="params.mh_no_subject" >
                      <el-checkbox class="email-task" :true-label=1 :false-label=0>Subject</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="描述"  width="241">
                <template slot-scope="scope">
                  <span>{{scope.row.desc}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="setOtherOption">
            <div class="setParamTitle">其他设置</div>
            <el-table
              :data="setOtherOptionData"
              :span-method="emailHeader"
              border
              style="width: 100%"
              type="index">
              <el-table-column label="参数名"  width="400">
                <template slot-scope="scope">
                  <span>{{scope.row.param}}</span>
                </template>
              </el-table-column>
              <el-table-column label="设置值"  width="290">
                <template slot-scope="scope">
                  <div v-if="(scope.$index)===0?true:false">
                    <el-input-number v-model="params.resendnum" :controls="false" :min="0" :max="64" style="width:70px;"></el-input-number>
                  </div>
                  <div v-if="(scope.$index)===1?true:false">
                    <el-input-number v-model="params.allsent_perhour" :controls="false"  :min="0" :max="100000" style="width:90px;"></el-input-number>
                  </div>
                  <div v-if="(scope.$index)===2?true:false" class="row">
                    <el-checkbox-group v-model="params.reg_mail_use">
                      <el-checkbox  class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                    </el-checkbox-group>
                    <el-input-number v-model="params.ret_mail_n" :controls="false"  :min="0" :max="100000" style="width:90px;" :disabled="!params.reg_mail_use"></el-input-number>
                  </div>
                  <div v-if="(scope.$index)===3?true:false" class="setEmail">
                    <el-input type="text" v-model="params.reg_mail_to" style="width:80%" :disabled="!params.reg_mail_use"></el-input>
                  </div>


                </template>
              </el-table-column>
              <el-table-column label="描述"  width="241">
                <template slot-scope="scope">
                  <span>{{scope.row.desc}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 20px;" class="internal">
            <div class="setParamTitle">请选择应用的任务终端</div>
            <div style="width:800px;margin-top: 10px;">
              <el-checkbox-group v-model="params.computer_list">
                <el-checkbox v-for="(item,index) in computerList" :key="index" :label="item.id" name="type" class="email-task" :disabled="((item.template_id!=-1)&&!(item.template_id==params.id))||(item.machine_state===1)">{{item.machine_ip}}|{{item.machine_name}}</el-checkbox>
              </el-checkbox-group>
            </div>
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
    name: 'mould-add',
    data () {
      return {
        confirmDialogVisible:false,
        uploadUrl:"/upload",
        fileList:[],
        setEmailData: [
          {
            param: "使用HELO域名设置自动创建虚拟邮箱（仅支持专递）",
            desc: "默认选中"
          },
          {
            param: "每次首次发送重置邮箱已发数量",
            desc: "默认选中"
          },
          {
            param: "发送X时后更换邮箱",
            desc: "默认2—4"
          },
        ],
        setNetData: [
          {
            param: "发送X时后重新拨号或换IP",
            desc: "默认40"
          },
          {
            param: "启动自动重新拨号功能",
            desc: "本项不选中，下列4项无效"
          },
          {
            param: "拨号连接名称",
            desc: "VPS默认值为宽带连接"
          },
          {
            param: "断开最长等待时间",
            desc: "数值范围在0-60"
          },
          {
            param: "连接网络之前等待",
            desc: "数值范围在0-60"
          },
          {
            param: "连接网络之后等待",
            desc: "数值范围在0-60"
          },

        ],
        setEmailOptionData:[
          {
            param: "发件人名称栏",
            desc: "如果选中【自定义】列表，必须上传姓名列表"
          },
          {
            param: "发件人名称栏",
            desc: "姓名列表有平均分配和全部数据两种方式"
          },
          {
            param: "自定义列表",
            desc: "平均分配：上传列表里有的姓名数量平均分配给应用该模板的终端。"
          },
          {
            param: "列表分配方式",
            desc: "全列表：每个应用该模板的终端都有该列表全部的数量。"
          },
          {
            param: "随机转换汉字为数字编码",
            desc: "默认不选中"
          },
        ],
        setEmailHeadData:[
          {
            param: "在文件头添加以下内容",
            desc: "默认不选中，选择后【邮件内容】才生效"
          },
          {
            param: "自动编码修正",
            desc: "默认选中"
          },
          {
            param: "邮件头内容",
            desc: "【在邮件头添加以下内容】项选中后生效"
          },
          {
            param: "禁用以下选中的邮件头",
            desc: "默认全部不选中"
          },
          {
            param: "禁用以下选中的邮件头",
            desc: "默认全部不选中"
          },
          {
            param: "禁用以下选中的邮件头",
            desc: "默认全部不选中"
          },
        ],
        setOtherOptionData:[
          {
            param: "发送失败地址重新发送【】次",
            desc: "默认33，数值范围0-64"
          },
          {
            param: "总发送量1小时不超过",
            desc: "默认0，数值范围0-100000"
          },
          {
            param: "每发送【】封后邮件到",
            desc: "默认不选中，选中后数值才生效"
          },
          {
            param: "邮箱地址",
            desc: "上一项选中后才生效"
          },
        ],
        senderType0:[0],
        senderType1:[],
        nameSeperateWay:[1],
        params:{
          id:0,//模板id
          name:"",//应用的终端列表
          computer_list:[],//应用的终端列表
          use_helo:1,//使用HELO域名设置自动创建虚拟邮箱选项，1表示选中，0表示没选中
          reset_pday:1,//每日首次发送重置邮箱已发数量，1表示选中，0表示没选中
          chgnum_min:2,//发送X封后更换邮箱-----小
          chgnum_max:4,//发送X封后更换邮箱-----大
          rcount:40,//发送x封后重新拨号或换IP
          auto2helo:0,//启用自动重新拨号功能，1表示选中，0表示没选中
          net_name:"宽带连接",//拨号连接名称
          disconn_maxtime:0,//断开最长等待时间
          recontm:0,//连接网络之前等待
          wait_afterconn:0,//连接网络之后等待
          sendertype:0,//发件人名称栏，0表示随机生成字符串，1表示中文百家姓+名，2表示自定义列表，3表示不显示发件人名称
          name_list_url:"",//自定义列表文件链接
          name_seperate_way:1,//列表分配方式，1表示平均分配，2表示全部分配
          auto_t2n:0,//随机转换汉字为数字编码，1表示选中，0表示没选中
          buseownhead:0,//邮件头中添加以下内容，1表示选中，0表示没选中
          mh_auto_crack:1,//自动编码修正，1表示选中，0表示没选中
          mh_content:"",//邮件头内容
          mh_no_xmailer:0,//禁用以下选中的邮件头(X-Mailer)，1表示选中，0表示没选中
          mh_no_mimever:0,//禁用以下选中的邮件头(MIME-Version)，1表示选中，0表示没选中
          mh_no_priority:0,//禁用以下选中的邮件头(Priority)，1表示选中，0表示没选中
          mh_no_msgid:0,//禁用以下选中的邮件头(Date)，1表示选中，0表示没选中
          mh_no_date:0,//禁用以下选中的邮件头(Date)，1表示选中，0表示没选中
          mh_no_from:0,//禁用以下选中的邮件头(From)，1表示选中，0表示没选中
          mh_no_to:0,//禁用以下选中的邮件头(To)，1表示选中，0表示没选中
          mh_no_subject:0,//禁用以下选中的邮件头(Subject)，1表示选中，0表示没选中
          resendnum:33,//发送失败地址重新发送x次
          allsent_perhour:0,//总发送量1小时不超过
          reg_mail_use:0,//每发送x封后发邮件(勾选框)，1表示选中，0表示没选中
          ret_mail_n:0,//每发送x封后发邮件(数量)
          reg_mail_to:"",//邮件地址
        },
        computerList:[],
      }
    },
    methods: {
      emailOption({ row, column, rowIndex, columnIndex }){
        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if(rowIndex===1){
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      emailHeader({ row, column, rowIndex, columnIndex }){
        if (columnIndex === 0||columnIndex === 2) {
          if (rowIndex === 3) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else if(rowIndex===4||rowIndex===5){
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },


      seperateWay(value){
        if(value.length>1){
          value.shift();
        }
        this.params.name_seperate_way = value[0];
        console.log(this.params.name_seperate_way)
      },
      sendertype0(value){
        this.senderType1 = [];
        if(value.length>1){
          value.shift();
        }
        this.params.sendertype = value[0];
      },
      sendertype1(value){
        this.senderType0 = [];
        if(value.length>1){
          value.shift();
        }
        this.params.sendertype = value[0];
      },
      // 新建模板
      add_template(){
        this.$post('/template/add',this.params).then((res)=>{
          this.confirmDialogVisible = false;
          this.$router.push({path:'/home/mould'});
        })
      },
      // 读取机器终端id列表
      machine_list_info(){
        this.$get('/machine/info',{})
          .then((res)=>{
            this.computerList = res.data.machine_list;
          })
      },
      //点击确定时触发的函数
      doAdd(){
       this.confirmDialogVisible = true;
      },
      confirmAdd(){
        this.add_template();
      },
      //重置
      reset(){
          this.params.use_helo = 1;//使用HELO域名设置自动创建虚拟邮箱选项，1表示选中，0表示没选中
          this.params.reset_pday = 1;//每日首次发送重置邮箱已发数量，1表示选中，0表示没选中
          this.params.chgnum_min = 2;//发送X封后更换邮箱-----小
          this.params.chgnum_max = 4;//发送X封后更换邮箱-----大
          this.params.rcount = 40;//发送x封后重新拨号或换IP
          this.params.auto2helo = 0;//启用自动重新拨号功能，1表示选中，0表示没选中
          this.params.net_name = "宽带连接";//拨号连接名称
          this.params.disconn_maxtime = 0;//断开最长等待时间
          this.params.recontm = 0;//连接网络之前等待
          this.params.wait_afterconn = 0;//连接网络之后等待
          this.params.sendertype = 0;//发件人名称栏，0表示随机生成字符串，1表示中文百家姓+名，2表示自定义列表，3表示不显示发件人名称
          this.params.name_list_url = "";//自定义列表文件链接
          this.params.name_seperate_way = 1;//列表分配方式，1表示平均分配，2表示全部分配
          this.params.auto_t2n = 0;//随机转换汉字为数字编码，1表示选中，0表示没选中
          this.params.buseownhead = 0;//邮件头中添加以下内容，1表示选中，0表示没选中
          this.params.mh_auto_crack = 1;//自动编码修正，1表示选中，0表示没选中
          this.params.mh_content = "";//邮件头内容
          this.params.mh_no_xmailer = 0;//禁用以下选中的邮件头(X-Mailer)，1表示选中，0表示没选中
          this.params.mh_no_mimever = 0;//禁用以下选中的邮件头(MIME-Version)，1表示选中，0表示没选中
          this.params.mh_no_priority = 0;//禁用以下选中的邮件头(Priority)，1表示选中，0表示没选中
          this.params.mh_no_msgid = 0;//禁用以下选中的邮件头(Date)，1表示选中，0表示没选中
          this.params.mh_no_date = 0;//禁用以下选中的邮件头(Date)，1表示选中，0表示没选中
          this.params.mh_no_from = 0;//禁用以下选中的邮件头(From)，1表示选中，0表示没选中
          this.params.mh_no_to = 0;//禁用以下选中的邮件头(To)，1表示选中，0表示没选中
          this.params.mh_no_subject = 0;//禁用以下选中的邮件头(Subject)，1表示选中，0表示没选中
          this.params.resendnum = 33;//发送失败地址重新发送x次
          this.params.allsent_perhour = 0;//总发送量1小时不超过
          this.params.reg_mail_use = 0;//每发送x封后发邮件(勾选框)，1表示选中，0表示没选中
          this.params.ret_mail_n = 0;//每发送x封后发邮件(数量)
          this.params.reg_mail_to = "";//邮件地址
      },
      nameListUrl(response){
        this.params.name_list_url = response.link;
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
    color:steelblue;letter-spacing: 1px;line-height: 30px;
  }
</style>
