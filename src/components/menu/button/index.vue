<template lang="pug">
button.btn(:class="{'is-active' : isActive}" @click="Active")
  span.btn__line
  span.btn__line
  span.btn__line
  span.btn__line
</template>
<script>
export default {
  data(){
    return{
      isActive: false
    }
  },
  computed:{
  },
  methods:{
    Active(){
      this.isActive = !this.isActive;
    }
  }
}
</script>
<style lang="scss" scoped>
.btn{
  position: relative;
  width: 21px;
  height: 21px;
  z-index: 2;
  cursor: pointer;
  &__line{
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #000;
    transition-duration: 300ms;
    transition-timing-function: $easeOutSine;
    &:nth-of-type(1){
      top: 0;
      transition-duration: 100ms;
      transition-delay: 100ms;
    }
    &:nth-of-type(2){
      top: 0;
      bottom: 0;
      margin: auto;
    }
    &:nth-of-type(3){
      top: 0;
      bottom: 0;
      opacity: 0;
      margin: auto;
    }
    &:nth-of-type(4){
      bottom: 0;
      transition-duration: 100ms;
      transition-delay: 100ms;
    }
  }
  .is-active &__line{
    &:nth-of-type(1){
      opacity: 0;
      transform: translate3d(0, 8px, 0);
    }
    &:nth-of-type(2){
      transform: rotate(45deg);
      transition-delay: 200ms;
    }
    &:nth-of-type(3){
      opacity: 1;
      transform: rotate(135deg);
      transition-delay: 200ms;
    }
    &:nth-of-type(4){
      opacity: 0;
      transform: translate3d(0, -8px, 0);
    }
  }
}
</style>