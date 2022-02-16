<template lang="pug">
.wrapper
  header.header
    .header__wrapper
      Menu
  .contents
    RouterView
  footer.footer
</template>

<script>
import Menu from "@/components/menu/"
export default {
  components:{
    Menu
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
}
.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  &__wrapper{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 16px 24px;
  }
}
.heading {
  
}
.contents{
  margin: 0 auto;
}
</style>