<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
            <div class="title-container">
                <h3 class="title">宠物领养系统后台</h3>
            </div>
            <el-form-item prop="mobile">
                <span class="svg-container">
                    <svg-icon icon-class="user"/>
                </span>
                <el-input v-model="loginForm.mobile"
                          placeholder="请输入登录手机号"
                          auto-complete="off"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"/>
                </span>
                <el-input v-model="loginForm.password"
                          placeholder="请输入密码"
                          auto-complete="off"
                          show-password
                />
            </el-form-item>
            <el-button class="loginbtn" :loading="loading" type="primary" @click.native.prevent="handleLogin">
                登录
            </el-button>
            <div class="tips">
                <span>提示：密码必须包含字母和数字，区分大小写</span>
            </div>
        </el-form>
    </div>
</template>

<script>
  import { validMobile, validPassword } from '@/utils/validate'

  export default {
    name: 'login',
    data() {
      const validateMobile = (rule, value, callback) => {
        if (!validMobile(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!validPassword(value)) {
          callback(new Error('请输入6-20位密码，区分大小写，不能使用空格'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          mobile: '',
          password: ''
        },
        loginRules: {
          mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            //$qs.stringify对传入的loginForm格式进行处理
            this.$store.dispatch('user/login', this.$qs.stringify(this.loginForm))
              .then(() => {
                // 成功回调(登录成功)，跳转到/(根目录)或者this.redirect(未登录前的页面)
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
    $bg: #283443;
    $light_gray: #fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .loginbtn {
            width: 100%;
            margin-bottom: 30px;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }
    }
</style>
