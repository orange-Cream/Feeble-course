<template>
  <el-container>
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="background-color:rgba(221, 235, 32, 0.3)"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item
          index="1"
          :style="{ width: iscollapse ? '65px' : '200px' }"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="{ width: iscollapse ? '65px' : '200px' }">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="2-2">内容列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :style="{ width: iscollapse ? '65px' : '200px' }">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>粉丝管理</span>
          </template>
          <el-menu-item index="3-1">图文数据</el-menu-item>
          <el-menu-item index="3-2">粉丝概况</el-menu-item>
          <el-menu-item index="3-3">粉丝画像</el-menu-item>
          <el-menu-item index="3-4">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item
          index="4"
          :style="{ width: iscollapse ? '65px' : '200px' }"
        >
          <i class="el-icon-setting"></i>
          <span slot="title">账户信息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i
            slot="prefix"
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            style="cursor:pointer;"
            @click="isCollapse = !isCollapse"
          ></i>
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
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!-- 子页面的占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: false
    }
  },
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
  },
  methods: {
    logout () {
      this.$confirm('此操作将退出系统, 是否继续?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清空sessionStorage数据
          window.sessionStorage.clear()
          // 导航到登录页面
          this.$router.push({ name: 'login' })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: rgba(221, 235, 32, 0.3);
  }
  .el-header {
    background-color: rgba(221, 235, 32, 0.3);
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
