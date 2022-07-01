<template>
  <view class="goods-all-list-container">
    <view class="item" v-for="item in allGoodsList" :key="item.id">
      <image class="image" :src="item.pic" />
      <view class="right-box">
        <view class="name">{{item.name}}</view>
        <view class="price">￥{{item.minPrice}}</view>
        <view class="sale">已售 0 件</view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getAllGoodsList
  } from '@/api/mallModule.js'
  export default {
    onLoad() {
      this.getAllGoodsList()
    },
    data() {
      return {
        getAllGoodsField: { // 获取 所有商品列表 字段
          page: 1,
          pageSize: 10,
          total: 0,
        },
        allGoodsList: [], // 所有商品列表
      };
    },
    methods: {
      async getAllGoodsList() { // 获取 所有商品列表
        const result = await getAllGoodsList( this.getAllGoodsField )
        this.getAllGoodsField.total = result.data.data.totalRow
        this.allGoodsList = [...this.allGoodsList, ...result.data.data.result]
      }
    },
    onReachBottom() { // 触底事件
      if ( this.getAllGoodsField.page * this.getAllGoodsField.pageSize >= this.getAllGoodsField.total ) return uni.$showMsg( '已经没有更多商品了' ) // 判断 是否还有下一条数据
      this.getAllGoodsField.page++
      this.getAllGoodsList()
    }
  }
</script>

<style lang="scss">
  .goods-all-list-container {

    .item {
      padding: 10px;
      display: flex;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #eee;

      .image {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }

      .right-box {
        .name {
          font-weight: 900;
        }

        .price {
          color: #e82626;
          font-weight: 900;
          margin: 2px 0;
        }

        .sale {
          padding: 1px;
          display: inline;
          color: #e82626;
          border: 1px solid #e82626;
          font-size: 13px;
        }
      }
    }
  }
</style>
