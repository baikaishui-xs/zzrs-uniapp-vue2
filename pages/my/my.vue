<template>
  <view class="my-container">
    <!-- <Login v-if="true"></Login> -->
    <Login v-if="!token"></Login>
    <UserInfo v-else></UserInfo>
  </view>
</template>

<script>
  import login from '@/pages/my/components/login.vue'
  import UserInfo from '@/pages/my/components/UserInfo.vue'
  export default {
    data() {
      return {
      }
    },
    computed: {
      token() {
        return this.$store.state.user.token
      }
    },
    components: {
      login,
      UserInfo
    }
  }
</script>

<style lang="scss">
  page {
    width: 100%;
    height: 100%;
  }
  .my-container {
    width: 100%;
    height: 100%;
  }
</style>
