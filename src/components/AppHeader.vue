<template lang="pug">
  div(class='header')
    div(class='header-inner')
      div(class='logo-container')
        router-link(to="/" exact): img(src="https://s3.ap-northeast-2.amazonaws.com/terra.money.home/static/finder/logo.svg")
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
</template>

<script>
import { mapGetters } from "vuex";
import TmFormGroup from "./TmFormGroup";
import TmFormStruct from "./TmFormStruct";
import TmBtn from "./TmBtn";
import TmField from "./TmField";
import { handleSearch } from "../scripts/utility";
import networks from "../networks";

export default {
  name: "app-header",
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
    ...mapGetters(["config"]),
    networks: () => networks
  },
  methods: {
    search() {
      this.$router.push({
        path: handleSearch(this.query, this.curNetwork)
      });
    },
    setNetwork(e) {
      this.curNetwork = e.target.value;
    }
  },
  async mounted() {
    this.curNetwork = this.$route.params.network;
  }
};
</script>

<style lang="stylus">
@require '../styles/variables'

.header
  position relative
  background #0C3694
  height 80px
  box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)

.header-inner
  width 100%
  margin 0 auto
  max-width 1440px
  position relative

.header .logo-container
  display inline-block

.header .logo-container a
  display block
  padding 28px 40px
  line-height 1

.header .logo-container img
  width 160px
  height 21px

.header .tm-form
  position absolute
  top 20px
  right 230px
  display inline-flex
  height 40px
  width 34%
  max-width 640px
  margin-left: -320px;

.header .tm-form-group__field
  position relative

.header .tm-form-group
  padding 0

.header .tm-form-group input::-webkit-input-placeholder
  color rgba(255,255,255,.3)

.header .tm-form-group input:-moz-placeholder
  color rgba(255,255,255,.3)

.header .tm-form-group input::-moz-placeholder
  color rgba(255,255,255,.3)

.header .tm-form-group input:-ms-input-placeholder
  color rgba(255,255,255,.3)

.header .tm-form-group input
  border 0px
  border-bottom 1px solid rgba(255,255,255,.9)
  font-size 16px
  height 40px
  color #fff
  background transparent
  padding-left 10px !important
  padding-right 45px !important
  border-radius 0 !important

.header .tm-btn
  position absolute
  right: 0;
  bottom: 1px;
  height: 40px;
  outline: 0;

@media screen and (max-width: 767px)
  .header .logo-container
    display block

  .header
    height 44px

  .header .logo-container
    height 45px
    line-height 45px
    padding 0
    display flex
    flex-direction row
    justify-content flex-start
    align-items center

  .header .logo-container img
    height 15px
    width 116px

  .header .logo-container a
    padding 13px 15px

  .header .tm-form
    top 54px
    right 0
    padding 0
    width 100%
    padding: 0 15px
    max-width none

  .header .tm-form-group input
    border-radius 0 !important
    background #fff
    color #2043b5
    border-bottom : solid 1px rgba(32, 67, 181, .8);
    padding-left 5px !important
    padding-right 35px !important

  .header .tm-form-group input::-webkit-input-placeholder
    color: rgba(32, 67, 181,.3);

  .header .tm-form-group input:-moz-placeholder
    color: rgba(32, 67, 181,.3);

  .header .tm-form-group input::-moz-placeholder
    color: rgba(32, 67, 181,.3);

  .header .tm-form-group input:-ms-input-placeholder
    color: rgba(32, 67, 181,.3);
</style>
