<template lang="pug">
.container-fluid.bottom-space
  .row
    .col
      h3.title-page
        translate Boshqaruv paneli

  .row
    .col-xs-12.col-sm-12.col-md-6
      b-card(
        :title="$gettext('Umumiy')"
        class="card-ui"
      )
        .row
          .col-xs-12.col-sm-12
            i.fa.fa-grip-horizontal
            router-link(:to="{ name: 'FarmAreas' }")
              | {{ areas.length }}
              |
              translate Maydonlar

          .col-xs-12.col-sm-12
            i.fa.fa-leaf
            router-link(:to="{ name: 'FarmCrops' }")
              | {{ cropInformation.total_plant_variety }}
              |
              translate Navlar

          .col-xs-12.col-sm-12
            i.fa.fa-clipboard
            router-link(:to="{ name: 'Task' }")
              | {{ tasksLength }}
              |
              translate Vazifalar

    // CROPS STATUS
    .col-xs-12.col-sm-12.col-md-6
      b-card(
        :title="$gettext('Yetishtirishda nimalar mavjud')"
        class="card-ui"
      )
        router-link(:to="{ name: 'FarmCrops' }" class="see-all")
          translate Barcha ekinlarni ko'rish

        table.table
          thead
            tr
              th
                translate Navlar
              th
                translate Miqdori
          tbody
            tr(v-if="crops.length == 0")
              td(colspan="2")
                translate Ekinlar mavjud emas.
                |
                |
                router-link(:to="{ name: 'FarmCrops' }") Birinchi ekiningizni qo'shing.
            tr(v-for="crop in crops")
              td
                router-link(:to="{ name: 'FarmCrop', params: { id: crop.uid } }")
                  | {{ crop.inventory.name }}
              td {{ crop.container.quantity }}
        Pagination(:pages="cropPages" @reload="getCrops")

  .row
    .col-xs-12.col-sm-12.col-md-12
      b-card(
        :title="$gettext('Vazifalar')"
        class="card-ui"
      )
        router-link(:to="{ name: 'Task' }" class="see-all")
          translate Barcha vazifalarni ko'rish
        TasksList(:domain="'HOME'")
        Pagination(:pages="taskPages" @reload="getTasks")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskLabel from './farms/tasks/task-label.vue';
import TasksList from './farms/tasks/task-list.vue';
import Pagination from '../components/pagination.vue';

export default {
  name: 'Home',
  components: {
    Pagination,
    TaskLabel,
    TasksList,
  },
  computed: {
    ...mapGetters({
      areas: 'getAllAreas',
      crops: 'getAllCrops',
      cropInformation: 'getInformation',
      cropPages: 'getCropsNumberOfPages',
      tasks: 'getTasks',
      taskPages: 'getTasksNumberOfPages',
      tasksLength: 'getNumberOfTasks',
    }),
  },
  mounted() {
    this.fetchAreas();
    this.getCrops();
    this.getTasks();
    this.getInformation();
  },
  methods: {
    ...mapActions([
      'fetchAreas',
      'fetchCrops',
      'fetchTasks',
      'getInformation',
    ]),
    getCrops() {
      let pageId = 1;
      if (typeof this.$route.query.page !== 'undefined') {
        pageId = parseInt(this.$route.query.page, 10);
      }
      this.fetchCrops({ pageId, status: 'ACTIVE' });
    },
    getTasks() {
      let pageId = 1;
      if (typeof this.$route.query.page !== 'undefined') {
        pageId = parseInt(this.$route.query.page, 10);
      }
      this.fetchTasks({ pageId });
    },
  },
};
</script>

<style lang="scss" scoped>
h3.title-page {
  margin: 20px 0 30px 0;
}

.card-ui {
  margin-bottom: 20px;

  i {
    width: 30px;
  }

  .see-all {
    display: block;
    margin-bottom: 15px;
  }
}

.bottom-space {
  padding-bottom: 60px;
}
</style>
