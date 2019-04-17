<template>
  <div v-if="type === 'select'" class="tm-select">
    <select
      :class="css"
      :value="value"
      @input="updateValue($event.target.value)"
      @change="onChange"
      @keyup="onKeyup"
      @keydown="onKeydown"
    >
      <option
        value=""
        disabled="disabled"
        selected="selected"
        hidden="hidden"
        >{{ selectPlaceholder }}</option
      >
      <template>
        <option
          v-for="(option, index) in resolvedOptions"
          :key="index"
          :value="option.value"
          >{{ option.key }}</option
        >
      </template>
    </select>
    <div class="tm-field-select-addon">
      <i class="material-icons">arrow_drop_down</i>
    </div>
  </div>

  <textarea
    v-else-if="type === 'textarea'"
    :class="css"
    :placeholder="placeholder"
    :value="value"
    @change="onChange"
    @keyup="onKeyup"
    @keydown="onKeydown"
    @input="updateValue($event.target.value)"
  ></textarea>

  <label v-else-if="type === 'toggle'" :class="toggleClass" class="tm-toggle">
    <div class="tm-toggle-wrapper" @click.prevent="toggle">
      <span>{{
        currentToggleState ? resolvedOptions.checked : resolvedOptions.unchecked
      }}</span>
      <div class="toggle-option-checked">
        <div>{{ resolvedOptions.checked }}</div>
      </div>
      <div class="toggle-option-unchecked">
        <div>{{ resolvedOptions.unchecked }}</div>
      </div>
      <div class="toggle-handle"></div>
      <input :value="currentToggleState" type="checkbox" @change="onChange" />
    </div>
  </label>

  <input
    v-else
    ref="numTextInput"
    :type="type"
    :class="css"
    :placeholder="placeholder"
    :value="value"
    :max="max"
    :min="min"
    @change="onChange"
    @keyup="onKeyup"
    @keydown="onKeydown"
    @input="updateValue($event.target.value)"
  />
</template>

<script>
export default {
  name: `tm-field`,
  props: {
    type: {
      type: String,
      default: `text`
    },
    value: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    theme: {
      type: String,
      default: null
    },
    options: {
      type: [Array, Object],
      default: null
    },
    change: {
      type: Function,
      default: null
    },
    keyup: {
      type: Function,
      default: null
    },
    keydown: {
      type: Function,
      default: null
    },
    max: {
      type: [String, Number], // for convenience you can provide a string
      default: null
    },
    min: {
      type: [String, Number], // for convenience you can provide a string
      default: null
    }
  },
  data: () => ({
    defaultToggleOptions: {
      checked: `on`,
      unchecked: `off`
    },
    currentToggleState: false
  }),
  computed: {
    css() {
      let value = `tm-field`;
      if (this.type === `select`) {
        value += ` tm-field-select`;
      }
      // not used and screws with css when used
      // if (this.type === `toggle`) {
      //   value += ` tm-field-toggle`
      // }
      if (this.size) value += ` tm-field-size-${this.size}`;
      if (this.theme) value += ` tm-field-theme-${this.theme}`;
      return value;
    },
    toggleClass() {
      return !this.currentToggleState ? `unchecked` : undefined;
    },
    resolvedOptions() {
      if (this.type === `select`) {
        return this.options || [];
      }
      // else is always `toggle`
      return this.options || this.defaultToggleOptions;
    },
    selectPlaceholder() {
      if (this.placeholder) return this.placeholder;
      else return `Select option...`;
    }
  },
  watch: {
    value(newValue) {
      this.currentToggleState = !!newValue;
    }
  },
  mounted() {
    this.currentToggleState = !!this.value;
  },
  methods: {
    toggle() {
      this.currentToggleState = !this.currentToggleState;
    },
    updateValue(value) {
      let formattedValue = value;
      if (this.type == `number`) {
        formattedValue = this.forceMinMax(value);
      }
      // Emit the number value through the input event
      this.$emit(`input`, formattedValue);
    },
    onChange(...args) {
      if (this.change) return this.change(...args);
    },
    onKeyup(...args) {
      if (this.keyup) return this.keyup(...args);
    },
    onKeydown(...args) {
      if (this.keydown) return this.keydown(...args);
    },
    forceMinMax(value) {
      value = typeof value === `string` ? Number(value.trim()) : value;
      if (this.max && value > this.max) {
        value = Number(this.max);
      } else if (this.min && value && value < this.min) {
        value = Number(this.min);
      }
      return value;
    }
  }
};
</script>

<style lang="stylus">
@require '../styles/variables'

.tm-field
  -webkit-appearance none

  border 1px solid var(--input-bc, #ccc)
  border-radius 0

  vertical-align top

  padding 0.1875rem 0.5rem

  display block
  width 100%
  min-width 0

  background var(--input-bg, #fff)

  font-size 16px
  line-height 1.5rem

.tm-field:disabled
  color var(--dim, #666)
  text-shadow none
  box-shadow none
  background var(--app-fg, #eee)
  border var(--app-fg, #eee)

.tm-field:focus
  outline none
  box-shadow none
  border 1px solid var(--link, #00f)

input.tm-field
  height 2rem

textarea.tm-field
  height 4rem
  resize vertical

.tm-toggle
  border 1px solid var(--input-bc, #ccc)
  height 2rem
  padding 0 2px
  border-radius 1rem
  *
    cursor pointer
  .tm-toggle-wrapper
    padding 0 1.25rem
    transform: rotate(0deg);
    margin-right calc(1.625rem / 2)
    margin-left calc(1.625rem / 2)
    &:before, &:after
      content ''
      width 1.625rem
      height 1.625rem
      position absolute
      top 2px
      z-index: 0
    &:before
      background var(--success, #4acf4a)
      border-radius 1em 0 0 1em
      left calc(-1.625rem / 2)
    &:after
      background var(--danger, #8c8fa6)
      border-radius 0 1em 1em 0
      right calc(-1.625rem / 2)
    .toggle-option-checked,
    .toggle-option-unchecked
      z-index: 1
      position absolute
      top 2px
      overflow hidden
      height 1.625rem
      clip: rect(0, auto, auto, 0);
      transition width 500ms ease
      > div
        position fixed
        left 0
        width 100%
        top 2px
        text-align center
    .toggle-option-checked
      background: var(--success, #4acf4a)
      left 0
      width 100%
    .toggle-option-unchecked
      background: var(--danger, #8c8fa6)
      right 0
      width 0%
    .toggle-handle
      &:after
        transition right 500ms ease, left 500ms ease
        position absolute
        top 2px
        right calc(-1.65rem/2)
        left auto
        width 1.625rem
        height 1.625rem
        background var(--bc, #d4d5de)
        border-radius 1rem
        z-index z(listItem)

        // display flex
        // align-items center
        // justify-content center
        content ''
        // content 'drag_handle'
        // font-size x
        // font-family 'Material Icons'
        // transform  rotate(90DEG)
        // color var(--bc, hsl(233, 22%, 23%))
    input[type="checkbox"]
      display none
  &.unchecked
    .toggle-option-checked
      width 0
    .toggle-option-unchecked
      width 100%
    .toggle-handle:after
      right calc(100% - .7500rem)

.tm-select
  position relative

  select
    appearance none
    border-radius 0
    background var(--input-bg, #fff)
    width 100%
    color var(--txt, #333)
    padding-right 2rem

    &:invalid
      color dim

    option
      color txt
      background var(--input-bg, #fff)
      font-family sans
      &:checked
        color var(--bright, #000)
        background var(--hover-bg, #ccf)

  .tm-field-select-addon
    position absolute
    top 0
    right 0

    display flex
    align-items center
    justify-content center
    box-sizing border-box
    height 2rem
    width 2rem
    border-left 1px solid var(--input-bc, #ccc)

    background var(--input-bg, #fff)
    text-align center
    color var(--txt, #333)
    pointer-events none

/*==============================================================================*/

.tm-datetime
  position relative

.tm-datetime:after
  display flex
  align-items center
  justify-content center
  box-sizing border-box
  width 2rem
  height 2rem
  position absolute
  top 0
  right 0
  border 1px solid var(--input-bc, #ccc)
  background var(--app-bg, #fff)
  font-family FontAwesome
  content "\f073"
  text-align center
  color var(--bright)
  pointer-events none

/*==============================================================================*/

.input-group-addon
  background var(--input-bg, #fff)
  border 1px solid var(--input-bc, #ccc)
  border-left none
  padding 0 0.5rem
  color var(--txt, #333)
  line-height 1.875rem
  font-size 0.75rem

@media screen and (min-width 360px)
  .input-group-addon
    font-size 1rem

/*==============================================================================*/
/* WebKit, Blink, Edge */

.tm-field::-webkit-input-placeholder
  color var(--dim, #666)

/* Mozilla Firefox 4 to 18 */
.tm-field:-moz-placeholder
  color var(--dim, #666)
  opacity 1

/* Mozilla Firefox 19+ */
.tm-field::-moz-placeholder
  color var(--dim, #666)
  opacity 1

/* Internet Explorer 10-11 */
.tm-field:-ms-input-placeholder
  color var(--dim, #666)

/* Standard (https//drafts.csswg.org/selectors-4/#placeholder) */
.tm-field:placeholder-shown
  color var(--dim, #666)

/*==============================================================================*/
/* sizes */

.tm-field.tm-field-size-sm
  height 1.5rem
  font-size 0.75rem
  padding-left 0.5rem
  padding-right 0.5rem

.tm-field.tm-field-size-lg
  // height 3rem
  font-size 1.125rem
  padding-left 0.75rem
  padding-right 0.75rem

/*==============================================================================*/
/* tendermint styles */

.tm-field.tm-field-theme-tendermint
  color #fff
  background hsl(210,70%,18%)
  border-color hsl(210,70%,38%)

.tm-field.tm-field-theme-tendermint:focus
  border-color hsl(210,70%,43%)

.tm-field.tm-field-theme-tendermint::-webkit-input-placeholder
  color hsl(210,70%,70%)

/* Mozilla Firefox 4 to 18 */
.tm-field.tm-field-theme-tendermint:-moz-placeholder
  color hsl(210,70%,70%)
  opacity 1

/* Mozilla Firefox 19+ */
.tm-field.tm-field-theme-tendermint::-moz-placeholder
  color hsl(210,70%,70%)
  opacity 1

/* Internet Explorer 10-11 */
.tm-field.tm-field-theme-tendermint:-ms-input-placeholder
  color hsl(210,70%,70%)

/* Standard (https//drafts.csswg.org/selectors-4/#placeholder) */
.tm-field.tm-field-theme-tendermint:placeholder-shown
  color hsl(210,70%,70%)
</style>
