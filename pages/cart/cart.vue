<template>
  <view class="cart-container">
    <!-- 收货地址 区 -->
    <Address></Address>
    
    <!-- 商品列表 区 -->
    <uni-swipe-action class="goodsList">
       <block v-for="item in goodsList" :key="item.goodsId">
        <uni-swipe-action-item :right-options="options" @click="slidingDel(item.key)">
          <view class="item">
            <view class="active-box">
              <view :class="['active', item.selected ? 'select' : '']" @click="modifySelected(item)"></view>
            </view>
            <image class="img" :src="item.pic" />
            <view class="goods-info-box">
              <view class="name">{{item.name}}</view>
              <view class="price">￥{{item.price}}</view>
              <text class="sold">已售 0 件</text>
              <uni-number-box class="number" :min="1" :value="item.number" @change="modifyNumber($event, item)"></uni-number-box>
            </view>
          </view>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 结算 区 -->
    <view class="settlement-area">
      <view class="active-box">
        <view :class="['active', selectAll ? 'select' : '']"  @click="batchModifySelected"></view>
        <text class="select-all">全选</text>
      </view>
      <text class="sum">合计：￥{{shopCartInfo.price}}</text>
      <view class="settlement">结算({{settlementNumber}})</view>
    </view>
  </view>
</template>

<script>
  import { getShopCartInfo, delShopCartGoods, modifySelected, modifyNumber } from '@/api/mallModule.js'
  import Address from './components/address/address'
  export default {
    onLoad() {
      this.getShopCartInfo()
    },
    data() {
      return {
        shopCartInfo: {}, // 购物车信息
        goodsList: [], // 商品列表
        options: [{
          // 文本内容
          text: '删除',
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }],
        settlementNumber: 0, // 结算数量
        selectAll: false // 全选
      };
    },
    methods: {
      async getShopCartInfo() { // 获取 购物车信息
        const result = await getShopCartInfo()
        this.goodsList = result.data.data.items
        this.shopCartInfo = result.data.data
        this.settlementNumber = result.data.data.number
        this.ifSelectAll()
      },
      async delShopCartGoods( key ) { // 删除购物车商品
        await delShopCartGoods( { key } )
      },
      async modifySelected( item ) { // 修改 购物车选中状态
        await modifySelected( {
          key: item.key,
          selected: !item.selected
        } )
        this.getShopCartInfo()
      },
      batchModifySelected() { // 全选按钮。批量 修改 购物车选中状态
        this.goodsList.map( async ( item ) => {
          await modifySelected( {
            key: item.key,
            selected: !this.selectAll
          } )
        } ) 
        setTimeout( async() => {
          this.getShopCartInfo()
        }, 100 )
      },
      async modifyNumber( value, item ) { // 修改数量
        await modifyNumber( {
          key: item.key,
          number: value
        } )
        this.getShopCartInfo()
      },
      slidingDel( key ) { // 滑动删除
        this.delShopCartGoods( key )
        this.getShopCartInfo()
      },
      ifSelectAll(){ // 判断是否权限
        this.selectAll = this.goodsList.every( item => item.selected )
      }
    },
    components: {
      Address
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
    
    // 商品列表 区
    .goodsList {
      .item {
        display: flex;  
        padding: 10px;
        position: relative;
        background: #fff;
        border-bottom: 1px solid #eee;
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
          .select {
            background: #e82626;
            border: 1px solid #fff;
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
            bottom: 20px;
          }
        }
      }
    }
  
    // 结算 区
    .settlement-area {
      width: 100%;
      height: 50px;
      display: flex;
      position: fixed;
      bottom: 0;
      background: #fff;
      .active-box {
        flex: 1;
        display: flex;
        align-items: center;
        .active {
          width: 20px;
          height: 20px;
          margin: 0 10px;
          border: 1px solid #ccc;
        }
        .select {
          background: #e82626;
          border: 1px solid #fff;
        }
        .select-all {
        }
      }
      .sum {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .settlement {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: #e82626;
        color: #fff;
      }
    }
  }
</style>
