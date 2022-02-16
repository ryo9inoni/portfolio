<template lang="pug">
main.home
  .board(ref="board")
  .road(ref="wrapper")
    .truck(ref="truck")
      section.section(:data-id="section.id" ref="section" v-for="section in sectionArray")
        h2.section__heading
          a.section__anchor(href="")
            img.section__image(:src="section.img", :alt="section.alt", ref="images")
    .parameter(ref="parameter")
      span.parameter__body(ref="parameterBody")
      span.parameter__main(ref="parameterMain")
</template>

<script>
export default {
  name: "Home",
	components: {
	},
  data(){
    return{
      sectionArray:[
				{
          id: "home",
          img: "/assets/img/r.i.png",
          alt: "R.I.",
        },
				{
          id: "about",
          img: "/assets/img/about.png",
          alt: "ABOUT",
        },
				{
          id: "works",
          img: "/assets/img/works.png",
          alt: "WORKS",
        },
				{
          id: "contact",
          img: "/assets/img/contact.png",
          alt: "CONTACT",
        },
			],
    }
  },
  watch:{},
  computed:{},
  mounted(){
    window.addEventListener("scroll", this.Scroll);
    this.$refs["board"].style.height = (this.$refs["truck"].clientWidth + window.innerHeight - window.innerWidth)+"px";
  },
  methods:{
    Scroll(){
      this.$refs["truck"].style.transform = "translate3d(-"+window.scrollY+"px, 0 ,0)";

      this.Parameter();
    },
    Parameter(){
      const value = window.scrollY / (this.$refs["truck"].clientWidth - window.innerWidth) * this.$refs["parameterBody"].clientWidth;
      this.$refs["parameterMain"].style.width = value+"px";
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  .board{

  }
  .road{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .truck{
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 100%;
    @include transition(300);
  }
  .parameter{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 60px;
    margin: 0 auto;
    width: 300px;
    height: 2px;
    &__body{
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #eee;
    }
    &__main{
      position: absolute;
      display: inline-block;
      width: 0;
      height: 100%;
      background-color: #000;
      @include transition(300);
    }
  }
  .section{
    flex-shrink: 0;
    width: 100vw;
    min-height: 100vh;
    text-align: center;
    pointer-events: none;
    &__heading{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
    }
    &__anchor{}
    &__image{
      width: 100%;
      max-width: 320px;
    }
  }
}
</style>