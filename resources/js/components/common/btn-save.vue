<template lang="pug">
b-button(
  variant="secondary"
  size="md"
  type="submit"
  :class="this.customClass"
)
  i.fa.fa-check
  translate Saqlash
</template>

<script>
export default {
  name: 'BtnSave',
  props: {
    customClass: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  text-align: center;
  margin-right: 10px;
}

.btn-secondary {
  color: #fff;
}
</style>
