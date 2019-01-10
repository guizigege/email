<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  /*设置全局单选，多选按钮被选中时的颜色*/
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: steelblue;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color:steelblue;
  }
  .el-radio__input.is-checked+.el-radio__label{
    color:steelblue;
  }
  .el-radio__input.is-checked .el-radio__inner{
    background-color: steelblue;
  }
  /*启动按钮样式*/
  .el-button--start.is-plain{
    background-color:rgba(0,255,0,0.05);
    border:1px solid rgba(0,100,0,0.2);
    color:green;
  }
  .el-button--start.is-plain:focus,.el-button--start.is-plain:hover{
    background: rgba(0,100,0,0.7);
    border-color: rgba(0,100,0,0.7);
    color: #fff;
  }
  /*弹出框头部样式*/
  .detailDialog .el-dialog__header{
    padding:12px 10px;
    background-color: steelblue;
    color:#fff;
  }
  .detailDialog .el-dialog__close{
    display: inline-block;
    padding-top:-10px;
    vertical-align: top;
    color:#fff;
    font-weight: bolder;
  }
  .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
    color: steelblue;
    text-decoration: underline;
    text-underline: steelblue;
  }
  *{
    box-sizing: border-box;
  }
  html,body{
    margin: 0;
    padding: 0;
  }

  ul.el-menu-vertical-demo.el-menu{
    height:114%;
  }
  .el-button{
    padding: 10px 16px;
  }
  .el-button.is-plain:active{
    box-shadow: 1px 2px 3px #333 inset;
  }
  .el-button+.el-button{
    margin-left:0;
  }
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .el-pagination{
    height:100px;
  }


  .el-table{
    width: 100%;
    min-width: 900px;
  }
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #ccc;
  }
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #ccc;
  }
  .el-table--border, .el-table--group {
    border: 1px solid #ccc;
  }
  .el-button+.el-button {
    margin-left: 0px;
  }

  /*edit-table*/

  .edit-table table { width: 240px; min-height: 25px; line-height: 25px; text-align: center; border-color:#ccc; border-collapse: collapse; }
  .edit-table th{
    width: 120px;
    font: bold 14px  sans-serif;
    color: #444;
    border: 1px solid #ddd;
    letter-spacing: 2px;
    text-align: right;
    padding: 10px 6px;
    background: #f5f5f5  no-repeat;
  }
  .edit-table td {
    border: 1px solid #ddd;
    background: #fff;
    font-size:12px;
    padding: 10px 6px;
    color: #666;
  }
  .edit-table td:hover{
    background-color: #f2f6f9;
    color: #333;
  }
  .edit-table {
    margin-top: 14px;
    margin-left: 20px;
  }

  .search{
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    border: 1px solid #ddd;
    border-bottom: none;
  }

  .title{
    font-size: 14px;
    color: #888;
    font-weight: bolder;
    line-height: 40px;
    margin-left: 20px;
    float: left;
  }

  .list-header{
    height:40px;
    border:1px solid #ddd;
    border-bottom: none;
    background:linear-gradient(#fff,#e9eaec);
    margin-top: 20px;
  }

  .add-btn{
    width: 130px;
    height: 36px;
    border: 1px solid #dcdfe6;
    background: #0a6a97;
    color: #fff;
    margin-top:2px;
    margin-right: 20px;
  }
  .add-btn:hover,.add-btn:focus{
    background: #0a6a97;
    filter:alpha(opacity:90);
    opacity:0.9;
    color: #fff;
  }
  .page{
    width: 100%;
    height: 30px;
    padding-left: 30%;
    margin-top: 30px;
  }

  .el-input__icon{
    line-height: 0;
  }

  .red{
    color:#DE4C56;
  }
  .black{
    color:#000;
  }
  .fw{
    font-weight: bold;
  }

  .applyDialog .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #DE4C56;
    border-color:  #DE4C56;
  }
  .applyDialog .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#DE4C56;
  }

  .applyDialog .el-dialog.el-dialog--center{
    margin-top: 15vh!important;
  }
  .applyDialog .el-input__inner{
    color:#333;
  }
  .applyDialog .el-dialog__header{
    padding:12px 10px;
    background-color: steelblue;
    color:#fff;
  }
  .applyDialog .el-dialog__close{
    display: inline-block;
    padding-top:-10px;
    vertical-align: top;
    color:#fff;
    font-weight: bolder;
  }

  .applyDialog .el-button--primary{
    background-color: steelblue;
  }
  .applyDialog .el-button--primary:hover{
    opacity: 0.9;
  }
  .applyDialog .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  .applyDialog .el-checkbox.email-task{
    width:400px;height:30px;line-height: 30px;display: inline-block;
  }
  .applyDialog .el-dialog--center .el-dialog__body{
    padding: 10px 20px;
  }
#app {

}
</style>
