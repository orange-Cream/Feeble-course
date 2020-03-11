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
          <el-button type="primary" style="width:100%;" @click="login()" :loading="isLoading" :disabled="isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import './gt'
export default {
  name: 'Login',
  data () {
    // 自定义校验规则
    var xieyiTest = function (rule, value, callback) {
      value ? callback() : callback(new Error('请无条件遵守规矩'))
    }
    return {
      capObj: null, // 极验对象
      isLoading: false, // 按钮是否等待禁用
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
        // 判断是否已有极验对象
        if (this.capObj) {
          return this.capObj.verify()
        }
        this.isLoading = true
        // B. 人机交互验证
        const pro = this.$http({
          url: '/mp/v1_0/captchas/' + this.loginForm.mobile,
          method: 'get'
        })
        pro.then(result => {
          console.log(result)
          const { data } = result.data
          window.initGeetest({
            // 以下配置参数来自服务端 SDK
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
            product: 'bind'
          }, captchaObj => {
            captchaObj.onReady(() => {
              // 验证码ready之后才能调用verify方法显示验证码
              captchaObj.verify() // 显示验证码窗口
              this.isLoading = false // 激活按钮设置
              this.capObj = captchaObj // 接收极验对象
            }).onSuccess(() => {
            // 行为校验正确的处理
              // A. 账号真实校验
              this.loginAct()
            }).onError(() => {
              // 行为校验错误处理
            })
          })
        })
          .catch(err => {
            return this.$message.error('获取极验秘钥失败：' + err)
          })
      })
    },
    loginAct () {
      // 服务器端账号真实校验
      const pro = this.$http({
        url: '/mp/v1_0/authorizations',
        method: 'POST',
        data: this.loginForm
      })
      pro
        .then(result => {
          // 客户端浏览器把服务器端返回的秘钥等相关信息通过sessionStorage做记录,表明是登录状态
          window.sessionStorage.setItem('userInfo', JSON.stringify(result.data.data))
          // 进入后台系统
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          this.$message.error('手机号码或验证码错误:' + err)
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
