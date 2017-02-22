<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item"
         v-for="(item, index) of goods"
         :class="{'current':currentIndex === index}"
         @click="selectMenu(index, $event)">
          <span class="text">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <!--<h1 class="relative-title">{{toName}}</h1>
      <div class="foods-wrapper-hook">-->
        <ul>
          <li class="food-list food-list-hook" v-for="item of goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item" v-for="food of item.foods">
                <div class="icon">
                  <img v-show="food.icon" :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now"><i>￥</i>{{food.price}}</span><span class="old"
                      v-show="food.oldPrice"><i>￥</i>{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      <!--</div>-->
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
const ERR_OK = 0

export default {
  data () {
    return {
      goods: [],
      name: [],
      toName: '',
      listHeight: [],
      scrollY: 0,
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this.toName = this.name[i]
          return i
        }
      }
      return 0
    },
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    axios.get('/api/goods')
      .then((result) => {
        if (result.data.errno === ERR_OK) {
          this.goods = result.data.data
          for(let i = 0; i < this.goods.length; i++) {
            this.name.push(this.goods[i].name)
          }
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
  },
  methods: {
    // 滚动初始化
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        bounce: false,
        click: true,
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        bounce: false,
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 点击左侧menu,右侧滚动到对应位置
    selectMenu(index, event) {
      if (!event._constructed) {
        return false
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    // 滚动右侧，左侧menu对应改变
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for(let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }     
    },
  },
  components: { shopcart, cartcontrol }
}
</script>

<style lang="scss">
@import "../../common/sass/mixin";
@import "./goods";
</style>
