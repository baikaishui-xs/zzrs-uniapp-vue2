<template>
  <view class="goods-info-container">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-active-color="#fff" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsInfo.pics2" :key="i">
        <image :src="item"  @click="preview(i)"/>
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
  
    <!-- 详情页 区 -->
    <rich-text class="details-pages-area" :nodes="goodsInfo.content"></rich-text>
    
    <!-- 商品导航 -->
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="leftBottom" @buttonClick="rightBottom" />
  </view>
</template>

<script>
  import { getGoodsInfo, addShopCart } from '@/api/mallModule.js'
  export default {
    onLoad( pageParameter ) {
      this.id = pageParameter.id
      this.getGoodsInfo()
    },
    data() {
      return {
        id: 0, // 商品ID
        goodsInfo: {}, // 商品信息
        options: [{ // 左侧按钮组的配置对象
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: this.$store.state.user.shopCartInfo.number
        }],
        buttonGroup: [{ // 右侧按钮组的配置对象
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        },
        {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }]
      }
    },
    methods: {
      async getGoodsInfo() { // 获取 商品信息
        const result = await getGoodsInfo( this.id )
        this.goodsInfo = result.data.data
      },
      async addShopCart() { // 加入购物车
        await addShopCart( {
          goodsId: this.id,
          number: 1
        } )
        await this.$store.dispatch( 'user/getShopCartInfo' )
        this.options[1].info = this.$store.state.user.shopCartInfo.number
      },
      preview( i ) { // 轮播图预览
        uni.previewImage( {
          current: i, // 预览时，默认显示的图片索引
          urls: this.goodsInfo.pics2 // 预览图片地址。数组形式
        } )
      },
      leftBottom( e ) { // 左侧按钮组的点击事件
        if ( e.content.text === '店铺' ) {
          uni.switchTab( {
            url: '/pages/home/home'
          } )
        } else if ( e.content.text === '购物车' ) {
          uni.switchTab( {
            url: '/pages/cart/cart'
          } )
        }
      },
      rightBottom( e ) { // 右侧按钮组的点击事件
        if ( e.content.text === '加入购物车' ) {
          this.addShopCart()
        } else if ( e.content.text === '立即购买' ) {
        }
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
  
    // 详情页 区
    .details-pages-area {
      .wscnph {
        width: 100%;
        vertical-align: bottom; // 解决图片空白间隙的问题
      }
    }
    
    // 商品导航
    .uni-goods-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
</style>
