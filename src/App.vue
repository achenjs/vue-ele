<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/googs">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/reller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
import axios from 'axios'

const ERR_OK = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    axios.get('/api/seller')
      .then((result) => {
        if (result.data.errno === ERR_OK) {
          this.seller = result.data.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  components: { 'v-header': header }
}
</script>

<style lang="scss">
@import "common/sass/mixin";
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
