<template>
  <el-container>
    <el-aside :width="isCollapse ? '65px' : '200px'">
      <el-menu
        router
        style="background-color:rgba(221, 235, 32, 0.3)"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item
          index="/welcome"
          :style="{ width: isCollapse ? '65px' : '200px' }"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2" :style="{ width: isCollapse ? '65px' : '200px' }">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/articleadd">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :style="{ width: isCollapse ? '65px' : '200px' }">
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
         index="/account"
          :style="{ width: isCollapse ? '65px' : '200px' }"
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
// 导入公共bus的vue对象
import bus from '@/utils/bus.js'
export default {
  name: 'Home',
  data () {
    return {
      tmpname: '', // 临时账户名称
      tmpphoto: '', // 临时账户头像
      isCollapse: false
    }
  },
  // 计算属性应用
  computed: {
    // 获得账户名称
    name () {
      return this.tmpname || JSON.parse(window.sessionStorage.getItem('userInfo')).name
    },
    // 获得账户头像
    photo () {
      return this.tmpphoto || JSON.parse(window.sessionStorage.getItem('userInfo')).photo
    }
  },
  created () {
  // 1. 对  名称  进行更新
    bus.$on('upAccountName', nm => {
      console.log(nm)

      // 更新sessionStorage中name的信息
      const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      userInfo.name = nm
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      // 更新临时成员tmpname
      this.tmpname = nm
    })
    // 2. 对  名称  进行更新
    bus.$on('upAccountPhoto', ph => {
    // 更新sessionStorage中photo的信息
      const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      userInfo.photo = ph
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      // 更新临时成员tmpphoto
      this.tmpphoto = ph
    })
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
