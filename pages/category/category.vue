<template>
  <view class="category-container">
    <scroll-view class="scroll-view-left" scroll-y="true" :style="{height: wh + 'px'}">
      <view :class="['item', i === activeIndex ? 'active' : '']" @click="activeChanged(i, item.id)" v-for="(item, i) in goodsCategory" :key="item.id">{{item.name}}</view>
    </scroll-view>
    <scroll-view class="scroll-view-right" scroll-y="true" :style="{height: wh + 'px'}">
      <view class="item" v-for="item in goodsList" :key="item.id" @click="goGoodsInfo(item.id)">
        <image class="img" :src="item.pic"></image>
        <view class="info-box">
          <view class="name">{{item.name}}</view>
          <view class="price">￥{{item.minPrice}}</view>
          <text class="sold">已售 0 件</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import { getGoodsCategory, getAllGoodsList } from '@/api/mallModule.js'
  export default {
    onLoad() {
      this.getGoodsCategory()
      this.getAllGoodsList()
      
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight // 获取 屏幕设备可用高度
    },
    data() {
      return {
        wh: 0, // 当前设备可用高度
        goodsCategory: [], // 商品类别
        activeIndex: 0, // 当前选中项下标
        categoryID: 263919, // 当前选中项类别 ID
        goodsList: [] // 商品列表
      };
    },
    methods: {
      async getGoodsCategory() { // 获取 商品类别
        const result = await getGoodsCategory()
        this.goodsCategory = result.data.data
      },
      activeChanged( i, categoryID ) { // 对当前选中项进行操作
        this.activeIndex = i
        this.categoryID = categoryID
        this.getAllGoodsList()
      },
      async getAllGoodsList() { // 获取 商品列表
        const result = await getAllGoodsList( { categoryId: this.categoryID } )
        this.goodsList = result.data.data.result
      },
      goGoodsInfo(goodsID) {
        uni.navigateTo({
          url: '/subpkg/goods_info/goods_info?id=' + goodsID
        })
      }
    },
  }
</script>

<style lang="scss">
  .category-container {
    display: flex;
    .scroll-view-left {
      width: 100px;
      display: flex;
      flex-direction: column;
      
      .item {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
      }
      
      .active {
        border-left: 4px solid #e82626;
        color: #e82626;
        background: #fff;
      }
    }
    
    .scroll-view-right {
      flex: 1;
      background: #fff;
      
      .item {
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #eee;
        .img {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
        .info-box {
          
          .name {
            width: 170px;
            margin-top: 6px;
            font-weight: 900;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            font-weight: 900;
            font-size: 15px;
            color: #e82626;
          }
          .sold {
            font-size: 12px;
            color: #e82626;
            border: 1px solid #e82626;
          }
        }
      }
    }
  }
</style>
