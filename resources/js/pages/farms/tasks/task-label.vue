<template lang="pug">
  span
    span(v-if="type == 'CATEGORY'")
      span.label.label-pestcontrol(v-if="task.category == 'PESTCONTROL'")
        translate Zararkunandalarga Qarshi Kurash
      span.label.label-sanitation(v-if="task.category == 'SANITATION'")
        translate SANITARIYA
      span.label.label-area(v-if="task.category == 'AREA'")
        translate MAYDON
      span.label.label-reservoir(v-if="task.category == 'RESERVOIR'")
        translate SUV MANBAI
      span.label.label-safety(v-if="task.category == 'SAFETY'")
        translate XAVFSIZLIK
      span.label.label-finance(v-if="task.category == 'FINANCE'")
        translate MOLIYA
      span.label.label-crop(v-if="task.category == 'CROP'")
        translate EKIN
      span.label.label-water(v-if="task.category == 'WATER'")
        translate SUV
      span.label.label-inventory(v-if="task.category == 'INVENTORY'")
        translate OMBORXONA
      span.label.label-general(v-if="task.category == 'GENERAL'")
        translate UMUMIY
      span.label.label-nutrient(v-if="task.category == 'NUTRIENT'")
        translate OZIQLANTIRUVCHI
    span(v-if="type == 'PRIORITY'")
      span.status.status-urgent(v-if="task.priority == 'URGENT'")
        translate SHOSHILINCH
      span.status.status-normal(v-if="task.priority == 'NORMAL'")
        translate ODDIY
</template>

<script>
export default {
  name: 'TaskLabel',
  props: ['type', 'task'],
};
</script>
