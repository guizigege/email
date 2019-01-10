
<template>
  <div class="mould">
    <div class="applyDialog">
      <el-dialog
        title=""
        :visible.sync="applyDialogVisible"
        width="1000px"
        :close-on-click-modal="false"
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">模板名称：<span >{{currentTemplate.name}}</span></div>

        <div>
          <div style="color:#222;letter-spacing: 1px;">已经应用当前模板的机器为选定的状态，机器名为<span class="red fw">红色</span>，其他未选定的机器名为<span class="fw">黑色</span>：</div>
          <div style="width:800px;margin-top: 10px;">
            <el-checkbox-group v-model="currentTemplate.computer_list">
              <el-checkbox v-for="(item,index) in computerList" :key="index" :label="item.id"  name="type" class="email-task" :disabled="((item.template_id!=-1)&&!(item.template_id==params.id))||(item.machine_state===1)">{{item.machine_ip}}|{{item.machine_name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doApply">确 认</el-button>
        </span>
      </el-dialog>
    </div>
    <div style="padding:20px 20px 0 20px;">
      <div style="height:20px;line-height: 20px;padding-left: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home/mould' }"><span @click="get_template_list">参数设置及模板板块</span></el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="list-header" >
        <div class="title">模板列表({{tableData.length}})</div>
      </div>
      <div class="search">
        <el-button class="add-btn" plain icon="el-icon-plus" @click="toAdd" >新建</el-button>
      </div>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%" border max-height="800px">
        <el-table-column
          prop="id"
          label="模板编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="模板名称"
          width="200">
        </el-table-column>
        <el-table-column label="应用的终端" width="620">
          <template slot-scope="scope">
            <span>{{ scope.row.name_list.join("，")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="toEdit(scope.row.id)" plain>编辑</el-button>
            <el-button size="mini" @click="toApply(scope.row.id,scope.row.name,scope.row.computer_list)" type="primary" plain>应用到</el-button>
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
    name: 'mould',
    data () {
      return {
        applyDialogVisible:false,
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        tableData: [

        ],
        computerList:[

        ],
        currentTemplate:{
          computer_list:[],
          name:"",
        },
        params:{

        },

      }
    },
    methods: {
      // 读取模板列表
      get_template_list(){
        this.$get('/template/list',{})
          .then((res)=>{
            this.tableData = res.data.template_list;
          })
      },
      // 读取模板信息
      get_template_info(id){
        this.$get('/template/info',{id:parseInt(id)})
          .then((res)=>{
            this.params = res.data;
          })
      },
      // 修改模板
      modify_template(){
        this.$post('/template/modify',
          this.params).then((res)=>{
          this.applyDialogVisible = false;
          this.get_template_list();
        })
      },
      // 读取机器终端id列表
      machine_list_info(){
        this.$get('/machine/info',{})
          .then((res)=>{
            this.computerList = res.data.machine_list;
            this.computerList.sort(this.compare(['machine_name']));
          })
      },
      //按字母排序
      compare(prop) {
        return function (obj1, obj2) {
          let val1 = obj1[prop];
          let val2 = obj2[prop];
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        }
      },
      // 前往新建模板页面
      toAdd(){
        this.$router.push({path:"/home/mould/add"})
      },
      //前往编辑模板页面
      toEdit(id) {
        this.$router.push({path:"/home/mould/edit/"+id});
      },
      toApply(id,name,computer_list){
        this.machine_list_info();
        this.get_template_info(id);
        this.currentTemplate.name = name;
        this.currentTemplate.computer_list = computer_list;
        this.applyDialogVisible = true;
      },
      doApply(){
        this.params.computer_list = this.currentTemplate.computer_list;
        this.modify_template();
      },
      handleSizeChange(size) {
        this.pagesize = size;
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },
    },

    created(){
      window.scrollTo(0,0);
      this.get_template_list();
      //点击左边导航栏的“参数设置及模块管理”条目时，请求模板列表
      bus.$on("mould",(res)=>{
        this.get_template_list();
      })
    },
    beforeDestroy(){
      bus.$off("mould");
    }

  }
</script>
<style>

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
