<template>
  <view class="home-container">
    <!-- 搜索 区 -->
    <view class="search-area">
      <uni-icons type="search" size="20"></uni-icons>
      <text class="search-area-text">搜索</text>
    </view>

    <!-- 轮播图 -->
    <swiper class="swiper" indicator-active-color="#fff" :indicator-dots="true" :autoplay="true" :interval="3000"
      :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in bannerList" :key="i">
        <image :src="item.picUrl" />
      </swiper-item>
    </swiper>

    <!-- 所有商品 区 -->
    <view class="all-goods-area" @click="goAllGoodsListPage">所有商品</view>

    <!-- 分类 区 -->
    <view class="category-area">
      <view class="category-area-item" v-for="item in goodsCategory" :key="item.id">
        <image class="category-area-item-image" :src="item.icon"></image>
        <text class="category-area-item-text">{{item.name}}</text>
      </view>
    </view>

    <!-- 楼层 区 -->
    <view class="floor-area">
      <view class="floor-area-item" v-for="(item, i) in floorPoster" :key="i">
        <view class="floor-area-item-hd">{{item[0].remark}}</view>
        <view class="floor-area-item-bd">
          <view class="left-box">
            <image class="left-box-img" mode="aspectFill" :src="item[0].picUrl"></image>
          </view>
          <view class="center-box">
            <image class="center-box-img-top" mode="aspectFill" :src="item[1].picUrl"></image>
            <image class="center-box-img-bottom" mode="aspectFill" :src="item[2].picUrl"></image>
          </view>
          <view class="right-box">
            <image class="right-box-img-top" mode="aspectFill" :src="item[3].picUrl"></image>
            <image class="right-box-img-bottom" mode="aspectFill" :src="item[4].picUrl"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getBanner
  } from '@/api/siteSettings.js'
  import {
    getGoodsCategory
  } from '@/api/mallModule.js'
  export default {
    onLoad() {
      this.getBanner()
      this.getGoodsCategory()
      this.getFloorPoster()
    },
    data() {
      return {
        bannerList: [], // 轮播图
        goodsCategory: [], // 商品类别
        floorPoster: [], // 楼层区海报
      }
    },
    methods: {
      async getBanner() { // 获取 轮播图
        const result = await getBanner( {
          type: 'banner'
        } )
        this.bannerList = result.data.data
      },
      async getGoodsCategory() { // 获取 商品类别
        const result = await getGoodsCategory()
        this.goodsCategory = result.data.data.slice( 0, 5 )
      },
      async getFloorPoster() { // 获取 楼层区海报
        const result = await getBanner( {
          type: 'fruit, drinks'
        } )
        let data = result.data.data
        let newData = []
        let j = 5
        for ( let i = 0; i < data.length; i += 5 ) {
          newData.push( data.slice( i, j ) )
          j += 5
        }
        this.floorPoster = newData
      },
      goAllGoodsListPage() { // 前往 所有商品列表页
        uni.navigateTo( {
          url: '/subpkg/goods_all-list/goods_all-list'
        } )
      }
    }
  }
</script>

<style lang="scss">
  .home-container {

    // 搜索 区
    .search-area {
      height: 30px;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: #fff;

      .search {
        margin-right: 2px;
      }

      .search-area-text {}
    }

    // 轮播图
    .swiper {
      height: 360rpx; // swiper 高度 = swiper 宽度 * 原图高度 / 原图宽度

      image {
        width: 100%;
        height: 100%;
      }
    }

    // 所有商品 区
    .all-goods-area {
      height: 36px;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 10px;
      font-weight: 900;
    }

    // 分类 区
    .category-area {
      height: 96px;
      margin: 10px;
      display: flex;
      background: #fff;
      border-radius: 10px;

      .category-area-item {
        flex: 1;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .category-area-item-image {
          width: 100%;
          height: 100%;
          margin-bottom: 2px;
        }

        .category-area-item-text {
          font-weight: 900;
        }
      }
    }

    // 楼层 区
    .floor-area {
      margin: 10px;
      font-weight: 900;

      .floor-area-item {
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;

        .floor-area-item-hd {
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
        }

        .floor-area-item-bd {
          height: 240px;
          display: flex;
          background: #fff;
          border-radius: 0 0 10px 10px;
          overflow: hidden;

          image {
            width: 100%;
            height: 100%;
          }

          .left-box {
            flex: 1;
            margin-right: 3px;

            .left-box-img {}
          }

          .center-box {
            flex: 1;
            margin-right: 3px;
            display: flex;
            flex-direction: column;


            .center-box-img-top {
              margin-bottom: 3px;
            }

            .center-box-img-bottom {}
          }

          .right-box {
            flex: 1;
            display: flex;
            flex-direction: column;

            .right-box-img-top {
              margin-bottom: 3px;
            }

            .right-box-img-bottom {}
          }
        }
      }
    }
  }
</style>
