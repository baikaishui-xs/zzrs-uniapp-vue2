<template>
  <!-- 用户信息 组件 -->
  <view class="user-info-container">
    
    <!-- 用户信息 区 -->
    <view class="user-info-area">
      <image class="img" :src="userInfo.avatarUrl">
      <text class="name">{{userInfo.nickName}}</text>
    </view>
    
    <!-- 主体 区 -->
    <view class="main-area">
      <view class="exit" @click="exit">退出登录</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        demo: '111',
        userInfo: this.$store.state.user.userInfo // 用户信息
      };
    },
    methods: {
      exit() { // 退出登录
        this.$store.commit( 'user/setToken', '' )
      }
    }
  }
</script>

<style lang="scss">
  .user-info-container {
    // 用户信息 区
    .user-info-area {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #C00200;
      .img {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        border-radius: 50%;
        border: 2px solid #fff;
      }
      .name {
        color: #fff;
        font-weight: 900;
      }
    }
    
    // 主体 区
    .main-area {
      margin: 20px;
      margin-top: -10px;
      padding: 10px;
      border-radius: 3px;
      background: #fff;
      .exit {
        text-align: center;
      }
    }
  }
</style>
