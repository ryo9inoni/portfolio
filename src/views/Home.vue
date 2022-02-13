<template lang="pug">
.home(@wheel="Wheel")

  .home__wrapper(ref="wrapper")

    main.home__main.main(ref="main")
      section.main__section(:data-id="section.id" ref="sections" v-for="section in sections")
        h2.main__heading
          a.main__anchor(href="")
            img.main__image(:src="section.img", :alt="section.alt", ref="images")

    .parameter(ref="parameter")
      span.parameter__section(:data-id="section.id" data-on="false" ref="parameterSection" v-for="section in sections")
      span.parameter__frame(ref="parameterFrame")
      span.parameter__main(ref="parameterMain")
</template>

<script>
export default {
  name: "Home",
	components: {
	},
  data(){
    return{
      sections:[
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
      isWheel: false,
      isDrag: false,
      isDirection: false, // trueは縦方向、falseは横方向,
      current: 0,
      meter: 0,
      width: 0,
      height: 0,
      moveX: 0,
      moveY: 0,
      onX: 0,
      toX: 0,
    }
  },
  watch:{},
  computed:{},
  mounted(){
    this.width = (this.$refs["main"].clientWidth - window.innerWidth);

    for (let index = 0; index < this.$refs["sections"].length; index++) {
      const RectLeft = this.$refs["sections"][index].getBoundingClientRect().left;
      const pos = RectLeft / this.width * this.$refs["parameter"].clientWidth;
      this.$refs["parameterSection"][index].style.left = pos - (this.$refs["parameterSection"][index].clientWidth / 2)+"px";
      this.$refs["parameterSection"][index].dataset.pos = pos - (this.$refs["parameterSection"][index].clientWidth / 2);
    }

    this.$refs["parameterSection"][0].dataset.on = true;
  },
  methods:{
    Parameter(){
      this.meter = this.moveX / this.width * this.$refs["parameter"].clientWidth;
      this.$refs["parameterMain"].style.width = this.meter+"px";

      for (let index = 0; index < this.$refs["parameterSection"].length; index++) {
        const pos = this.$refs["parameterSection"][index].dataset.pos;
        const toBoolean = (data) => { return data === "true"; }
        const Boolean = toBoolean(this.$refs["parameterSection"][index].dataset.on);
        if(this.meter >= pos && !Boolean){
          this.$refs["parameterSection"][index].dataset.on = true;
          this.isDirection = true;
          this.current++;
          this.height = this.$refs["sections"][this.current].clientHeight;
          this.moveY = 0;
        }else if(this.meter <= pos && Boolean){
          this.$refs["parameterSection"][index].dataset.on = false;
          if(this.current == this.$refs["sections"].length - 1) {
            this.isDirection = false;
          } else{
            this.isDirection = true;
          }
          this.current--;
          this.height = this.$refs["sections"][this.current].clientHeight;
          this.moveY = this.height;
        }
      }
    },
    Wheel(e){
      if(!this.isDirection && this.moveX >= 0 && this.moveX <= this.width){
        // 移動範囲取得
        this.moveX += e.deltaX;
        this.moveX += e.deltaY;

        // 移動範囲を超えてしまった場合、最大・最小値に戻す
        if(this.moveX <= 0){
          this.moveX = 0;
        }else if(this.moveX >= this.width){
          this.moveX = this.width;
        }

        // 横方向に移動
        this.$refs["main"].style.transform = "translate3d(-"+this.moveX+"px, 0, 0)";

        // 移動パラメーター設定
        this.Parameter();
      }else if(this.isDirection && this.moveY >= 0 && this.moveY <= this.height){
        // 移動範囲取得
        this.moveY += e.deltaX;
        this.moveY += e.deltaY;

        // 移動範囲を超えてしまった場合、最大・最小値に戻す
        if(this.moveY <= 0){
          this.moveY = 0;
          this.isDirection = false;
        }else if(this.moveY >= this.height){
          this.moveY = this.height;
          if(this.current == this.$refs["sections"].length - 1) return;
          this.isDirection = false;
        }

        // 縦方向に移動
        this.$refs["sections"][this.current].style.transform = "translate3d(0, -"+this.moveY+"px, 0)";
      }
    },
    On(e){
      this.isDrag = true;
      this.onX = e.pageX;
    },
    To(e){
      if(!this.isDrag) return;
      if(this.move >= 0 && this.move <= this.width){
        // 移動範囲取得
        this.toX = e.pageX;
        this.move += this.onX - this.toX;

        // 移動範囲を超えてしまった場合、最大・最小値に戻す
        if(this.move <= 0){
          this.move = 0;
        }else if(this.move >= this.width){
          this.move = this.width;
        }

        // 移動範囲設定
        this.$refs["main"].style.transform = "translate3d(-"+this.move+"px, 0, 0)";

        // 移動パラメーター設定
        this.Parameter();
      }
    },
    Off(){
      this.isDrag = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  &__wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .main{
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 100%;
    &__section{
      flex-shrink: 0;
      width: 100vw;
      min-height: 100vh;
      text-align: center;
      pointer-events: none;
    }
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

    .about{
      padding: 24px;
      text-align: left;
      &__heading{
      }
    }
  }
  .parameter{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 60px;
    margin: 0 auto;
    width: 300px;
    height: 2px;
    &__section{
      @include middle("y");
      width: 8px;
      height: 8px;
      background-color:#eee;
      border-radius: 50%;
      z-index: 1;
      @include transition(300);
    }
    &__section[data-on="true"]{
      background-color: #000;
    }
    &__frame{
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
    }
  }
}
</style>