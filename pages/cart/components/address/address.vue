<template>
  <!-- 地址 区 -->
  <view class="address-container">
    <view class="address-area">
      <button class="address-btn" @click="chooseAddress">请选择收货地址+</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      chooseAddress() { // 选择收货地址
        const dizhi = uni.chooseAddress()
        console.log( dizhi )
      }
    }
  }
</script>

<style lang="scss">
  .address-container {
    .address-area {
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #eee;
      background: #fff;
      .address-btn {
        display: inline;
        background: #19AD1A;
        font-size: 14px;
        color: #fff;
      }
    }
  }
</style>
