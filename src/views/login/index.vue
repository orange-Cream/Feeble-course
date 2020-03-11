<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 绘制登录form表单 -->
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm">
        <el-form-item prop="mobile">
          <el-input
            v-model="loginForm.mobile"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="xieyi">
          <!-- 复选框，单个复选框直接设置v-model即可，接收true/false的信息，表示是否选中 -->
          <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
          <span
            >我已阅读并同意 <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%;" @click="login()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    // 自定义校验规则
    var xieyiTest = function (rule, value, callback) {
      value ? callback() : callback(new Error('请无条件遵守规矩'))
    }
    return {
      // 表单校验规则
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号码必填' },
          { pattern: /^1[35789]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [{ required: true, message: '验证码必填' }],
        xieyi: [
          { validator: xieyiTest }
        ]
      },
      // 表单数据对象
      loginForm: {
        mobile: '17852108713', // 手机号码
        code: '246810', // 验证码
        xieyi: true // 协议复选框
      }
    }
  },
  methods: {
    // 登录系统
    login () {
    // 表单校验(登录方式)
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return false
        }
        // 服务器端账号真实校验
        const pro = this.$http({
          url: '/mp/v1_0/authorizations',
          method: 'POST',
          data: this.loginForm
        })
        pro
          .then(result => {
            // 进入后台系统
            this.$router.push({ name: 'home' })
            // 客户端浏览器把服务器端返回的秘钥等相关信息通过sessionStorage做记录,表明是登录状态
            window.sessionStorage.setItem('userInfo', JSON.stringify(result.data.data))
          })
          .catch(err => {
            this.$message.error('手机号码或验证码错误:' + err)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-image: url("../../assets/images/bg01.jpg");
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 410px;
    height: 340px;
    background-color: rgba(255, 236, 125, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 75%;
    }
  }
}
</style>
