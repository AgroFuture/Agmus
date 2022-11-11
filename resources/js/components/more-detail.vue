<template lang="pug">
  div(v-if="description.length > 0")
    p.small(v-if="clicked")
      span {{ description }}
    p
      a(@click="toggle()")
        small.text(v-if="clicked")
          translate Tafsilotlarni yopish
          i.fa.fa-angle-up
        small.text(v-else)
          translate Tafsilotlarni o'qish
          i.fa.fa-angle-down
</template>

<script>
export default {
  name: 'MoreDetail',
  props: ['description'],
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    toggle() {
      this.clicked = !this.clicked;
    },
  },
};
</script>
