<template>
  <view class="cart-container">
    <!-- 收货地址 区 -->
    <view class="address-area">
      <button class="address-btn">请选择收货地址+</button>
    </view>
    
    <!-- 商品列表 区 -->
    <!-- <view class="goodsList">
      <view class="item" v-for="item in goodsList" :key="item.goodsId">
        <view class="active-box">
          <view class="active"></view>
        </view>
        <image class="img" :src="item.pic" />
        <view class="goods-info-box">
          <view class="name">{{item.name}}</view>
          <view class="price">￥{{item.price}}</view>
          <text class="sold">已售 0 件</text>
          <uni-number-box class="number" :min="1" :value="item.number"></uni-number-box>
        </view>
      </view>
    </view> -->
    
    <uni-swipe-action class="goodsList">
       <block v-for="item in goodsList" :key="item.goodsId">
        <uni-swipe-action-item :right-options="options" @click="slidingDel(item.key)">
          <view class="item">
            <view class="active-box">
              <view class="active"></view>
            </view>
            <image class="img" :src="item.pic" />
            <view class="goods-info-box">
              <view class="name">{{item.name}}</view>
              <view class="price">￥{{item.price}}</view>
              <text class="sold">已售 0 件</text>
              <uni-number-box class="number" :min="1" :value="item.number"></uni-number-box>
            </view>
          </view>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  import { getShopCartInfo, delShopCartGoods } from '@/api/mallModule.js'
  
  export default {
    onLoad() {
      this.getShopCartInfo()
    },
    data() {
      return {
        goodsList: [], // 商品列表
        options: [{
          // 文本内容
          text: '删除',
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    methods: {
      async getShopCartInfo() { // 获取 购物车信息
        const result = await getShopCartInfo()
        this.goodsList = result.data.data.items
      },
      async delShopCartGoods( key ) { // 删除购物车商品
        await delShopCartGoods( { key } )
      },
      slidingDel( key ) { // 滑动删除
        this.delShopCartGoods( key )
        this.getShopCartInfo()
      }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    // 收货地址 区
    .address-area {
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
      background: #fff;
      .address-btn {
        display: inline;
        background: #19AD1A;
        font-size: 14px;
        color: #fff;
      }
    }
    
    // 商品列表 区
    .goodsList {
      .item {
        display: flex;  
        padding: 10px;
        position: relative;
        background: #fff;
        .active-box {
          display: flex;
          justify-content: center;
          align-items: center;
          .active {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            border: 1px solid #ccc;
          }
        }
        .img {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        .goods-info-box {
          .name {
            margin-top: 6px;
            font-weight: 900;
          }
          .price {
            font-size: 16px;
            color: #e82626;
          }
          .sold {
            font-size: 12px;
            border: 1px solid #e82626;
            color: #e82626;
          }
          .number {
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
        }
      }
    }
  }
</style>
