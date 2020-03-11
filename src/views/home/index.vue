<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i class="el-icon-s-fold"></i>
          <span>微乎</span>
        </div>
        <div id="rt">
          <el-input
            type="text"
            placeholder="请输入搜索的文章内容"
            style="width:300px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <span style="margin:0 10px;">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt width="40" height="40" />
              {{ name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github地址</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  // 计算属性应用
  computed: {
    // 获得账户名称
    name: function () {
      return JSON.parse(window.sessionStorage.getItem('userInfo')).name
    },
    // 获得账户头像
    photo: function () {
      return JSON.parse(window.sessionStorage.getItem('userInfo')).photo
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
   .el-aside {
    background-color: rgba(20, 240, 221, 0.3);
  }
  .el-header {
     background-color: rgba(221, 235, 32,0.3);
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 9px;
    min-width: 950px;
    #lt {
      height: 100%;
      width: 40%;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    #rt {
      height: 100%;
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
