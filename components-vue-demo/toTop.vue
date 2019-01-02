<template>
    <!--transition标签 按钮出现附带动画-->
  <transition name="el-fade-in">
    <div class="page-component-up" @click="scrollToTop" v-show="toTopShow">
      <h-icon name="arrow-up-c"></h-icon>
    </div>
  </transition>
</template>
<script>
export default {
  data(){
    return{
      toTopShow:false
    }
  },
  methods:{
    handleScroll(){
      this.scrollTop = document.getElementById('deailContent').scrollTop;
      if(this.scrollTop>300){
        this.toTopShow = true
      }else{
        this.toTopShow = false
      }
    },
    scrollToTop() {
      let timer = null, _that = this
      //动画，使用requestAnimationFrame代替setInterval
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50
          document.getElementById("deailContent").scrollTop = _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer)
          _that.toTopShow = false
        }
      })
    },
  },
  mounted(){
    this.$nextTick(function(){
      let targetScroll = document.getElementById("deailContent")
      targetScroll.addEventListener('scroll',this.handleScroll)
    });
  },
  destroyed(){
    this.$nextTick(function(){
      let targetScroll = document.getElementById('deailContent')
      targetScroll.removeEventListener('scroll',this.handleScroll)
    })
  }
}

</script>

<style lang="less" scoped>
 .page-component-up{
    background-color: #409eff;
    position: fixed;
    right: 100px;
    bottom: 150px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
    z-index: 100;
    .arrow-up-c{
      color: #fff;
      display: block;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
    }
    p{
      display: none;
      text-align: center;
      color: #fff;
    }
    &:hover{
      opacity: .8;
    }
  }
</style>

