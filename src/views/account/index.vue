<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <!-- 匿名插槽 卡片主体内容 -->
      <div class="text item cardbody">
        <div id="lt">
          <el-form
            ref="accountFormRef"
            :model="accountForm"
            label-width="100px"
          >
            <el-form-item label="用户名：">
              <el-input v-model="accountForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model="accountForm.mobile" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="accountForm.email"></el-input>
            </el-form-item>
            <el-form-item label="简介：">
              <el-input type="textarea" v-model="accountForm.intro"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">更新账户</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div id="rt">头像展示区域</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data () {
    return {
      accountForm: {
        // 各个成员来自api参考【2.4 编辑用户资料】
        id: '', // id
        name: '', // 名称
        mobile: '', // 手机号码
        email: '', // 邮箱
        intro: '' // 简介
      }
    }
  },
  created () {
    this.getAccountInfo()
  },
  methods: {
    // 获取账户的基本信息
    getAccountInfo () {
      const pro = this.$http({
        url: '/mp/v1_0/user/profile',
        method: 'get'
      })
      pro.then(result => {
        console.log(result)
        this.accountForm = result.data.data
      })
        .catch(err => {
          return this.$message.error('获得账户信息失败:' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 给表单 和 头像区域做布局样式设计
.cardbody {
  display: flex;
  justify-content: space-between;
  #lt {
    width: 40%;
    background-color: pink;
  }
  #rt {
    width: 30%;
    background-color: lightgreen;
  }
}
</style>
