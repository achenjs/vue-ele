<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount > 0}">
                        <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
                    </div>
                    <div class="num" v-show="totalCount > 0">
                        {{totalCount}}
                    </div>
                </div>
                <div class="price" :class="{'highlight': totalPrice > 0}">
                    {{totalPrice}}元
                </div>
                <div class="desc">
                    另需配送费 ￥{{deliveryPrice}}元
                </div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <!--购物车详情-->
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty">清空</span>
            </div>
            <div class="list-content">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price * food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div><!--购物车详情结束-->
    </div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';
export default {
    data () {
        return {
            fold: true,
        }
    },
    props: {
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    computed: {
        // 所有商品总价
        totalPrice() {
            let total = 0
            this.selectFoods.forEach((food) => {
                total += food.price * food.count
            })
            return total
        },
        // 商品总数
        totalCount() {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`
            } else if (this.totalPrice < this.minPrice){
                let diff = this.minPrice - this.totalPrice
                return `还差￥${diff}元起送` 
            } else {
                return '去结算'
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true
                return false;
            }
            let show = !this.show
            return show
        }
    },
    components: {
        cartcontrol
    }
}
</script>

<style lang="scss">
    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 48px;
        .content {
            display: flex;
            background-color: #141d27;
            font-size: 0px;
            color: rgba(255, 255, 255, 0.4);
            .content-left {
                flex: 1;
                .logo-wrapper {
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background-color: #141d27;
                    .logo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        text-align: center;
                        background-color: #2b343c;
                        &.highlight {
                            background: rgb(0, 160, 220);
                        }
                        .icon-shopping_cart {
                            display: inline-block;
                            line-height: 44px;
                            font-size: 24px;
                            color: #80858a;
                            &.highlight {
                                color: #fff;
                            }
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        border-radius: 50%;
                        font-size: 9px;
                        color: #fff;
                        font-weight: 700;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                        background-color: rgb(240, 20, 20);
                    }
                }
                .price {
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 12px;
                    line-height: 24px;
                    padding-right: 12px;
                    box-sizing: border-box;
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 16px;
                    font-weight: 700;
                    &.highlight {
                        color: #fff;
                    }
                }
                .desc {
                    display: inline-block;
                    vertical-align: top;
                    margin: 12px 0 0 12px;
                    line-height: 24px;
                    font-size: 10px;
                    font-weight: 500;
                }
            }
            .content-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    background-color: #2b333b;
                    &.not-enough {
                        background-color: #2b333b;
                    }
                    &.enough {
                        background-color: #00b43c;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>