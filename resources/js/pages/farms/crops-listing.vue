<template lang="pug">
.table-responsive.table-wrapper
  table.table
    thead
      tr
        th
          translate Ekin Navlari
        th
          translate Ekin partiyasi identifikatori
        th(v-if="domain == 'AREA'")
          translate Ekish sanasi
        th
          translate Ekishdan keyingi kunlar
        th(v-if="domain == 'AREA'")
          translate Miqdori
        th(v-if="domain == 'CROPS'")
          translate Dastlabki miqdori
        th(v-if="domain == 'CROPS'")
          translate Holati
        th(v-if="domain == 'AREA'")
          translate So'ngi Sug'orish
        th(v-if="domain == 'CROPS'")
    tbody
      tr(v-if="crops.length == 0")
        td(colspan="6")
          translate Ekinlar mavjud emas.
      tr(v-for="crop in crops")
        td: router-link(:to="{ name: 'FarmCrop', params: { id: crop.uid } }") {{ crop.inventory.name }}
        td: span.identifier {{ crop.batch_id }}
        td(v-if="domain == 'AREA'") {{ crop.seeding_date | moment('timezone', 'Asia/Tashkent').format('DD/MM/YYYY') }}
        td(v-if="domain == 'CROPS'")  {{ crop.initial_area.created_date | moment("from", new Date()) }}
        td(v-if="domain == 'AREA'")  {{ crop.days_since_seeding }}
        td(v-if="domain == 'AREA'") {{ crop.current_quantity }} {{ getCropContainer(crop.container.type, crop.container.quantity) }}
        td(v-if="domain == 'CROPS'") {{ crop.initial_area.initial_quantity }}
        td(v-if="domain == 'CROPS'")
          | {{ crop.area_status.seeding }}
          | &nbsp;
          translate Ekish
          | ,
          | &nbsp;
          | {{ crop.area_status.growing }}
          | &nbsp;
          translate O'sib borayotgan
          | ,
          | &nbsp;
          | {{ crop.area_status.dumped }}
          | &nbsp;
          translate Tashlab yuborilgan
        td(v-if="domain == 'AREA' && crop.last_watered") {{ crop.last_watered | moment('timezone', 'Asia/Tashkent').format('DD/MM/YYYY') }}
        td(v-if="domain == 'AREA' && !crop.last_watered") -
        td(v-if="domain == 'CROPS' && batch && crop.initial_area.initial_quantity == crop.initial_area.current_quantity")
          a.pull-right(style="cursor: pointer;" @click="editCropModal(crop)")
            i.fa.fa-edit
</template>

<script>
import { FindContainer } from '../../stores/helpers/farms/crop';

export default {
  name: 'FarmCropsListing',
  props: ['batch', 'crops', 'domain'],
  methods: {
    editCropModal(crop) {
      this.$emit('editCrop', crop);
    },
    getCropContainer(key, count) {
      return FindContainer(key).label + ((count !== 1) ? 's' : '');
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  margin-top: 20px;
}
</style>
