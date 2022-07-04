<template>
  <view class="goods_search-container">
      <!-- 搜索 栏 -->
      <view class="search-box">
      <uni-search-bar plac eholder="请输入搜索内容" :radius="100" cancelButton="none" @input="input">请输入搜索内容</uni-search-bar>
      </view>
      
      <uni-tag :text="item" v-for="(item, i) in historyList" :key="i"></uni-tag>
      
      <!-- 商品列表 区 -->
      <view class="goods-list-area">
        <view class="item" v-for="item in goodsList" :key="item.id">
          <image class="image" :src="item.pic" />
          <view class="info-box">
            <view class="name">{{item.name}}</view>
            <view class="price">￥{{item.minPrice}}</view>
            <text class="sold">已售 0 件</text>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
  import { getAllGoodsList } from '@/api/mallModule.js'
  export default {
    data() {
      return {
        timer: null, // 定时器
        goodsList: [] // 商品列表
      };
    },
    methods: {
      input( text ) { // 获取 搜索的商品
        clearTimeout( this.timer ) // 清除定时器
        this.timer = setTimeout( async () => { // 500 毫秒内没有触发新的输入事件，则发送请求
          if ( text.length !== 0 ) {
            const result = await getAllGoodsList( { nameLike: text } )
            this.goodsList = result.data.data.result
          } else {
            this.goodsList = []
          }
        }, 500 )
      }
    }
  }
</script>

<style lang="scss">
  .goods_search-container {
    background: #fff;
    .search-box {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #fff;
    }
    
    .goods-list-area {
      .item {
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #eee;
        .image {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        .info-box {
          .name {
            font-weight: 900;
            font-size: 18px;
          }
          .price {
            font-weight: 900;
            font-size: 16px;
            margin-bottom: 2px;
          }
          .sold {
            border: 1px solid #e82626;
            font-size: 12px;
            color: #e82626;
          }
        }
      }
    }
  }
</style>
