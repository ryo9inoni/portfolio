<template lang="pug">
.menu
  .menu__wrapper
    ul.menu__list.list
      li.list__item
        a.list__anchor(href="")
Button
</template>

<script>
import Button from "@/components/menu/button";

export default {
  components:{
    Button,
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>
.menu{
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.9);
  z-index: 1;
  opacity: 0;
  &__wrapper{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .list{
    &__item{
    }
  }
}
</style>