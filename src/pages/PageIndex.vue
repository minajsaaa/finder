<template lang="pug">
  div(class='main-container')
    div(class='content-container')
      div(class='logo-container')
        img(src="https://s3.ap-northeast-2.amazonaws.com/terra.money.home/static/finder/logo.svg")
      tm-form-struct(:submit="search")
        tm-form-group
          .tm-modal-search
            tm-field#search-input(
              type="text"
              placeholder="Search Block / Tx / Account"
              required
              v-model="query"
              autocomplete="off"
              title="1 to 60 characters")
            tm-btn(type="submit" icon="search")
    tm-form-group.select-network
      tm-field(
        type="select"
        v-model="curNetwork"
        placeholder="Select network..."
        :options="networks"
        :change="setNetwork"
        )
    div(class="background-cover")
    <video playsinline autoplay muted loop id="background" poster="https://s3.ap-northeast-2.amazonaws.com/terra.money.home/static/finder/terrafinder.jpg">
      <source src="https://s3.ap-northeast-2.amazonaws.com/terra.money.home/static/finder/terrafinder.mp4" type="video/mp4">
    </video>

</template>

<script>
import TmFormGroup from "../components/TmFormGroup";
import TmFormStruct from "../components/TmFormStruct";
import TmBtn from "../components/TmBtn";
import TmField from "../components/TmField";
import { handleSearch } from "../scripts/utility";
import networks from "../networks";

export default {
  beforeCreate: function() {
    document.body.className = "home";
  },
  name: "page-index",
  components: {
    TmFormGroup,
    TmFormStruct,
    TmBtn,
    TmField
  },
  data: () => ({
    query: ``,
    curNetwork: ``
  }),
  computed: {
    networks: () => networks
  },
  methods: {
    search() {
      this.$router.push({ path: handleSearch(this.query, this.curNetwork) });
    },
    setNetwork(e) {
      this.curNetwork = e.target.value;
    },
    track() {
      this.$ga.page("/");
    }
  },
  async mounted() {
    this.curNetwork = networks[0].value;
  }
};
</script>

<style lang="stylus" scoped>
.main-container
  display table
  position fixed
  top 50%
  left 50%
  min-width 100%
  min-height 100%
  width 100%
  height 100%
  transform translateX(-50%) translateY(-50%)

.content-container
  display table-cell
  vertical-align middle
  text-align center

.logo-container
  margin-top: -130px
  padding-bottom 80px

.logo-container img
  width 264px
  height 34px

input:-webkit-autofill
  -webkit-text-fill-color #fff !important
  transition background-color 5000s ease-in-out 0s

.main-container .tm-form
  display block
  margin 0 auto
  width 100%
  max-width 640px

.main-container .tm-form-group__field
  position relative
  width 100%

.main-container .tm-form-group input
  border 0px
  border-bottom 1px solid #FFFFFF !important
  font-size 22px
  font-family 'Gotham A', 'Gotham B', 'Helvetica Neue', 'Arial', sans-serif
  height 50px
  font-weight 300
  color #FFFFFF
  background transparent
  letter-spacing -0.3px
  padding-left 10px !important
  padding-right 40px !important
  border-radius 0 !important


.main-container .tm-form-group input::-webkit-input-placeholder
  color rgba(255,255,255,0.3)
  letter-spacing -0.3px

.main-container .tm-form-group input:-moz-placeholder
  color rgba(255,255,255,0.3)
  letter-spacing -0.3px

.main-container .tm-form-group input::-moz-placeholder
  color rgba(255,255,255,.3)
  letter-spacing -0.3px

.main-container .tm-form-group input:-ms-input-placeholder
  color rgba(255,255,255,.3)
  letter-spacing -0.3px

.main-container .tm-btn
  position absolute
  right 16px
  top 0.5rem
  height 49px
  line-height 49px
  cursor pointer
  background transparent
  outline 0

.main-container .tm-btn i
  font-size 24px

#background
  position fixed
  top 50%
  left 50%
  min-width 100vw
  min-height 100vh
  width auto
  height auto
  z-index -100
  transform translateX(-50%) translateY(-50%)
  background #01040d url('https://s3.ap-northeast-2.amazonaws.com/terra.money.home/static/finder/terrafinder.jpg') no-repeat
  background-size cover
  background-position center

.background-cover
  position fixed
  top 50%
  left 50%
  min-width 100vw
  min-height 100vh
  width auto
  height auto
  z-index -99
  transform translateX(-50%) translateY(-50%)
  background rgba(8,32,128,.85)

.select-network
  position absolute
  top 20px
  right 20px
  padding 0
  margin 0
  display block

@media screen and (max-width: 767px)
  .logo-container
    margin-top: -40px
    padding-bottom 40px

  .logo-container img
    width 196px
    height 25px

  .main-container .tm-form-group input
    font-size 16px
    height 45px
    font-weight 400
    padding-left 5px !important

  .main-container .tm-form-group input::-webkit-input-placeholder
    font-size 16px

  .main-container .tm-form-group input:-moz-placeholder
    font-size 16px

  .main-container .tm-form-group input::-moz-placeholder
    font-size 16px

  .main-container .tm-form-group input:-ms-input-placeholder
    font-size 16px

  .main-container .tm-btn
    right 11px

@media (max-height: 700px) and (min-width: 768px)
  .main-container .tm-form
    margin-bottom -130px
</style>
