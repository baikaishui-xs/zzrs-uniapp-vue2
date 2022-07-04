<template>
  <view class="goods-info-container">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-active-color="#fff" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsInfo.pics2" :key="i">
        <image :src="item" />
      </swiper-item>
    </swiper>
    
    <!-- 信息 区 -->
    <view class="info-area">
      <view class="price-box">
        <text class="text">￥{{goodsInfo.basicInfo.minPrice - 3}}</text>
        <text class="text1">￥{{goodsInfo.basicInfo.minPrice}}</text>
      </view>
      <view class="title-box">
        <view class="left-box">
          <text class="title">{{goodsInfo.basicInfo.name}}</text>
          <text class="describe">{{goodsInfo.basicInfo.characteristic}}</text>
          <view class="subtitle">快递：免运费</view>
        </view>
        <view class="right-box">
          <uni-icons type="heart" size="30"></uni-icons>
          <text class="collection">收藏</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getGoodsInfo } from '@/api/mallModule.js'
  export default {
    onLoad( pageParameter ) {
      this.id = pageParameter.id
      this.getGoodsInfo()
    },
    data() {
      return {
        id: 0, // 商品ID
        goodsInfo: {} // 商品信息
      }
    },
    methods: {
      async getGoodsInfo() { // 获取 商品信息
        const result = await getGoodsInfo( this.id )
        this.goodsInfo = result.data.data
      }
    }
  }
</script>

<style lang="scss">
  .goods-info-container {
    // 轮播图
    .swiper {
      height: 375px; // swiper 高度 = swiper 宽度 * 原图高度 / 原图宽度

      image {
        width: 100%;
        height: 100%;
      }
    }
    
    // 信息 区
    .info-area {
      padding: 10px;
      .price-box {
        .text {
          font-size: 30px;
          color: #e82626;
        }
        
        .text1 {
          font-size: 20px;
          margin-left: 6px;
          color: #AAA;
          text-decoration: line-through;
        }
      }
      
      .title-box {
        display: flex;
        .left-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          .title {
            font-size: 26px;
            font-weight: 900;
          }
            
          .describe {
            color: #AAA;
            margin: 6px 0;
          }
          
          .subtitle {
            color: #AAA;
          }
        }
        
        .right-box {
          width: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-left: 1px solid #ccc;
          .uni-icons {
            
          }
          
          .text {
          }
        }
      }
      
      
    }
  }
</style>
