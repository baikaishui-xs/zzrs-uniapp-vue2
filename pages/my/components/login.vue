<template>
  <!-- 登录 组件 -->
  <view class="lgoin-container">
    <uni-icons type="contact-filled" size="160"></uni-icons>
    <button class="login-btn" type="primary" open-type="getUserInfo"  @click="login">一键登录</button>
    <button class="register-btn" type="primary" open-type="getUserInfo"  @click="register">注册用户</button>
    <!-- <text class="text">{{$store.state.user.demo}}</text> -->
    <text class="text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import { login, register } from '@/api/wxXiaoChenXu.js'
  export default {
    data() {
      return {
      };
    },
    methods: {
      async login() { // 获取 token
        uni.getUserProfile( { // 获取当前微信的用户信息 // 该方法最好放在当前作用域的最前面，因为前面最好不要有代码，负责容易进入失败的回调函数中
          desc: '你的授权信息',
          success: async userInfo => {
            this.$store.commit( 'user/setUserInfo', userInfo.userInfo )
          },
          fail: ( res ) => {
            return uni.$showMsg( '您取消了登录授权' )
          }
        } )
        
        const [err, res] = await uni.login().catch( err => err ) //  临时凭证 code
        const result = await login( { code: res.code } )
        if( result.data.code !== 0 ) {
          uni.$showMsg( '您还没有账号，请注册~' )
          return
        }
        
        this.$store.commit( 'user/setToken', result.data.data.token )
        this.$store.dispatch( 'user/getShopCartInfo' )
        console.log( this.$store.state.user.shopCartInfo )
      },
      async register() { // 注册用户
        uni.getUserProfile( { // 获取当前微信的用户信息
          desc: '你的授权信息',
          success: async userInfo => {
            const [err, res] = await uni.login().catch( err => err ) //  临时凭证 code
            register( Object.assign( userInfo, { code: res.code } ) ) // 调用注册用户的接口
          },
          fail: ( res ) => {
            return uni.$showMsg( '您取消了登录授权' )
          }
        } )
      }
    }
  }
</script>

<style lang="scss">
  .lgoin-container {
    height: 100%;
    margin-top: -60px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .contact-filled {}
    > button {
      width: 100%;
      height: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 20px;
      border-radius: 20px;
    }
    .login-btn {
      background: #C00200;
    }
    .register-btn {
      margin-top: 10px;
      background: #93E600;
    }
    .text {
      margin-top: 20px;
      font-size: 14px;
    }
  }
</style>
