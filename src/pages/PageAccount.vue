<template lang="pug">
  div
    app-header
    div(class="account-container")
      h2 Account

      div(class="table")
        tm-list-item(dt="Address")
          template(slot="dd")
            span terra1zr7aswwzskhav7w57vwpaqsafuh5uj7nv8a964
            span.copy
              i.material-icons filter_none
              span.copied.on
        tm-list-item(dt="Created")
          template(slot="dd")
            span 2019.02.28 15:06:58 (UTC)
        tm-list-item(dt="Balance")
          template(slot="dd")
            span Total 1,734 Luna
            ul.chart
              li
                div.inner
                  div.pie
                    img(src="https://i.imgur.com/UWbvi1O.png")
                  span 1,024 Luna (66.12%)
                  span Available: 888 (80.23%)
                  span Delegated: 206 (19.76%)
                  span Reward: 1.203 (0.076%)
              li
                div.inner
                  div.pie
                    img(src="https://i.imgur.com/CzorzpD.png")
                  span 1,024 TerraKRW (33.21%)
                  span ~520 Luna
              li
                div.inner
                  div.pie
                    img(src="https://i.imgur.com/ioL3J3d.png")
                  span 1,024 TerraUSD (10.67%)
                  span ~520 Luna

        tm-list-item(dt="Delegations")
          template(slot="dd")
            ul.account-table
              li.title
                ul.row
                  li
                    p Validator
                  li
                    p Delegated
                  li
                    p Weight
                  li
                    p Rewards
              li
                ul.row
                  li TerraformLabs
                  li 100 Luna
                  li
                    span 60%
                    span.pie-sm
                      img(src="https://i.imgur.com/Pcoqs3r.png")
                  li 1.234 Luna
              li
                ul.row
                  li TerraformLabs
                  li 100 Luna
                  li
                    span 40%
                    span.pie-sm
                      img(src="https://i.imgur.com/TOCDbgZ.png")
                  li 1.234 Luna

        tm-list-item(dt="Transactions")
          template(slot="dd")
            ul.account-table
              li.title
                ul.row
                  li
                    p Tx hash
                  li
                    p Msg
                  li
                    p Block
                  li
                    p Timestamp (UTC)
              li
                ul.row
                  li
                    a(href="/") 0x8c07bee83216f832163216f832163216f83216
                  li.type 
                    div Delegated
                    span +2
                  li 100 Luna
                  li 2018.03.21 23:13:24
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { isEmpty } from "lodash"
import utility from "../scripts/utility"
import TmListItem from "../components/TmListItem"

import AppHeader from "../components/AppHeader"
import AppNotFound from "../components/AppNotFound"
import AppLoading from "../components/AppLoading"

const { format } = utility

export default {
  beforeCreate: function() {
    document.body.className = "page"
  },
  name: "page-account",
  components: {
    TmListItem,
    AppHeader,
    AppNotFound,
    AppLoading
  },
}
</script>

<style lang="stylus">
@require '../styles/variables'
.account-container
  width 100%
  max-width 1440px
  margin 0 auto
  padding 40px
  color #2043b5 !important

.account-container h2
  font-size 24px
  font-weight 500
  margin-bottom 20px

.account-container h2 span
  font-weight 300
  font-size 23px
  padding-left 6px

.account-container .table
  border solid 1px #d8ddf0
  border-radius 5px
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

.account-container .table .tm-li-dl
  display table
  table-layout fixed
  width 100%
  min-height 60px

.account-container .table .tm-li-dl .tm-li-dt
  display table-cell
  vertical-align middle

.account-container .table .tm-li-dl .tm-li-dd
  display table-cell
  padding 15px 30px
  vertical-align middle
  white-space normal
  text-overflow unset
  word-break break-all
  line-height 1.5

.copy
  position relative
  display inline-block
  width 22px
  height 22px
  margin-top -2px
  margin-left 6px;

.copy i
  position relative
  width 22px
  height 22px
  display block
  color #2845AE
  vertical-align middle
  border-radius 50%
  background-color #edf4fe
  text-align center
  transition .1s
  font-size 12px
  line-height 22px
  cursor pointer

.copied
  position absolute
  top -28px
  left 50%
  margin-left: -28px
  width 60px
  height 26px
  text-align center
  background #1daa8e
  line-height 26px
  font-size 12px
  color #fff
  border-radius 2px
  z-index 100
  opacity 0
  transition .2s
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  pointer-events none

.copied.on
  opacity 1

.copied:after
  content 'Copied!'

.copied:before
  content ''
  display block
  position absolute
  background #1daa8e
  width 10px
  height 10px
  top 18px
  left 50%
  margin-left -5px
  z-index -1
  transform rotate(45deg)
  

.tm-li-dd.tm-li-dd-flush
  overflow visible


.account-container .chart
  font-size: 0;
  margin-top: 15px;
  margin-left: -10px;
  margin-right: -10px;

.account-container .chart li
  display: inline-block;
  width: 33.33%;
  text-align: center;
  padding: 0 10px;
  vertical-align: top;
  margin-bottom: 20px;

.account-container .chart li .inner
  border: solid 1px #ebeef7;
  font-size: 12px;
  padding: 20px 10px;
  border-radius: 5px;

.account-container .chart li .pie
  width: 80px;
  height: 80px;
  display: block;
  margin: 0 auto 20px;
  overflow: hidden;

.account-container .chart li .pie img 
  width: 80px;
  height: 80px;

.account-container .chart span
  display: block;
  margin: 5px 0;

.account-container .chart span:first-of-type
  margin: 20px 0 12px;
  font-size: 15px;
  font-weight: 500;

.account-table
  border-radius 5px
  border solid 1px #ebeef7
  width 100%
  background #fff
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  min-width unset
  font-size 14px
  margin 10px 0

.account-table .row
  display table
  min-height 54px
  border-top solid 1px #ebeef7
  width 100%
  table-layout fixed
  min-width: 700px

.account-table .row li
  padding 10px
  display table-cell
  vertical-align middle
  line-height 1

.account-table .row li:first-child
  padding-left 20px
  width 31%

.account-table .row li:last-child
  padding-left 20px

.account-table .row li
  width 23%

.account-table .title
  border-radius 3px 3px 0 0
  font-size 12px
  font-weight 500

 .account-table .title .row
  border-top 0
  background-color rgba(84, 147, 247, 0.1)

.account-table .row li .pie-sm
  display: inline-block;
  vertical-align: middle;
  height: 18px;
  width: 18px;
  margin-left: 10px;
  margin-top: -2px;
  overflow: hidden;

.account-table .row li .pie-sm img
  width: 18px;
  height: 18px;

.account-table a
  display inline-block
  text-overflow ellipsis
  white-space nowrap
  overflow hidden
  width 100%

.account-table .type div
  border-radius: 13px;
  height: 26px;
  overflow: hidden;
  background-color: rgba(40, 69, 174,0.1);
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: -0.3px;
  color: rgba(40, 69, 174, 1);
  padding 0 15px
  display inline-block
  vertical-align middle
  max-width: 80%;
  text-overflow ellipsis
  white-space nowrap
  overflow hidden

.account-table .type span
  display: inline-block;
  font-size: 11px;
  vertical-align: middle;
  margin-left: 5px;

@media screen and (max-width: 900px)
  .account-container
    padding 50px 15px

  .account-container h2
    padding 40px 0 30px
    border-bottom 1px solid #d8ddf0
    margin 0

  .account-container .table
    box-shadow none
    border 0

  .account-container .table .tm-li-dl
    display block
    padding 0
    height auto
    line-height 1.5

  .account-container .table .tm-li-dl .tm-li-dt
    display block
    background transparent
    padding 20px 0 10px
    word-wrap break-word
    white-space unset
    font-size 15px

  .account-container .table .tm-li-dl .tm-li-dd, .tm-li-dd.tm-li-dd-flush
    display block
    padding 0 0 20px
    font-size 15px
    word-wrap break-word
    white-space unset

  .account-container .chart li
    display: block;
    width: 100%;

  .account-container .chart li .inner
    font-size: 12px;

  .account-container .chart li .pie
    width: 60px;
    height: 60px;

  .account-container .chart li .pie img 
    width: 60px;
    height: 60px;

  .account-container .chart span
    display: block;
    margin: 5px 0;

  .account-container .chart span:first-of-type
    margin: 20px 0 12px;
    font-size: 14px;
</style>
