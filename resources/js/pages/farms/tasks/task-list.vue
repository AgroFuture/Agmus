<template lang="pug">
  .task-list.table-responsive
    table.table.m-b-none(v-if="domain == 'AREA' || domain == 'RESERVOIR' || domain == 'HOME'")
      thead
        tr
          th
          th
            translate Narsalar
          th
            translate Kategoriya
          th(v-if="domain != 'AREA' && domain != 'RESERVOIR'")
      tbody
        tr(v-if="tasks.length == 0")
          td(colspan="3")
            translate Vazifalar yaratilmagan
        tr(v-for="task in tasks")
          td
            .checkbox
              label.i-checks
                input(
                  type="checkbox"
                  v-on:change="setTaskStatus(task.uid, task.status)"
                  :checked="isCompleted(task.status)"
                )
                i
          td
            a(href="#")
              div {{ task.title }}
              MoreDetail(:data="task" :description="task.description")
              small.text-muted(v-if="task.due_date") Muddati:
                |
                | {{ task.due_date | moment('timezone', 'Asia/Tashkent').format('DD/MM/YYYY') }}
                TaskLabel(:type="'PRIORITY'" :task="task")
                span.text-danger(v-if="task.is_due == true")
                  translate Muddati o'tgan!
                span.text-success(v-if="isToday(task.due_date)")
                  translate Bugun
          td
            TaskLabel(:type="'CATEGORY'" :task="task")
          td(v-if="domain != 'AREA' && domain != 'RESERVOIR' && domain != 'HOME'")
            a.h3(style="cursor: pointer;" @click="openModal(task)")
              i.fas.fa-edit

    .wrapper(v-else)
      b-list-group
        b-list-group-item(v-if="tasks.length == 0")
          translate Vazifalar yaratilmagan
        b-list-group-item.clearfix(v-for="task in tasks" :key="task.uid")
          .row
            .col-sm-1.col-md-1.col-lg-1
              .checkbox
                label.i-checks
                  input(
                    type="checkbox"
                    v-on:change="setTaskStatus(task.uid, task.status)"
                    :checked="isCompleted(task.status)"
                  )
                  i
            .col-sm-8.col-md-6.col-lg-8
              span.h4.text-dark(v-if="task.category == 'PESTCONTROL' || task.category == 'NUTRIENT'")
                translate Topshirish
                |
                |
                u(v-if="task.domain_details.material")
                  | {{ task.domain_details.material.material_name }}
                |
                |
                span.identifier-sm(v-if="task.domain_details.crop")
                  | {{ task.domain_details.crop.crop_batch_id }}
                |
                |
                translate ga
                |
                |
                translate sana: 
                |
                |
                span.areatag-sm(v-if="task.domain_details.area")
                  | {{ task.domain_details.area.area_name }}
              span.h4.text-dark(v-else-if="task.category == 'AREA'")
                span.areatag-sm(v-if="task.domain_details.area")
                  |{{ task.domain_details.area.area_name }}
                i.fas.fa-long-arrow-alt-right
                |  {{ task.title }}
              span.h4.text-dark(v-else-if="task.category == 'RESERVOIR'")
                u(v-if="task.domain_details.reservoir")
                  | {{ task.domain_details.reservoir.reservoir_name }}
                i.fas.fa-long-arrow-alt-right
                |  {{ task.title }}
              span.h4.text-dark(v-else-if="task.category == 'CROP'")
                span.identifier-sm(v-if="task.domain_details.crop")
                  | {{ task.domain_details.crop.crop_batch_id }}
                translate on
                span.areatag-sm(v-if="task.domain_details.area")
                  | {{ task.domain_details.area.area_name }}
                i.fas.fa-long-arrow-alt-right
                |  {{ task.title }}
              span.h4.text-dark(
                v-else-if="task.category == 'SAFETY' || task.category == 'SANITATION'"
              )
                span.areatag-sm(v-if="task.domain_details.area")
                  | {{ task.domain_details.area.area_name }}
                i.fas.fa-long-arrow-alt-right
                |  {{ task.title }}
              span.h4.text-dark(v-else) {{ task.title }}
              MoreDetail(:data="task" :description="task.description")
              div
                small.text-muted Muddati: 
                  |
                  | {{ task.due_date | moment('timezone', 'Asia/Tashkent').format('DD/MM/YYYY') }}
                .status.status-urgent(v-if="task.priority == ' URGENT'")
                  translate  Shoshilinch
                span.text-danger(v-if="task.is_due == true")
                  translate Muddati o'tgan!
            .col-sm-2.col-md-3.col-lg-2
              TaskLabel(:type="'CATEGORY'" :task="task")
            .col-sm-1.col-md-2.col-lg-1.text-right
              a.h3(v-if="!isCompleted(task.status)" style="cursor: pointer;" @click="openModal(task)")
                i.fas.fa-edit
        Pagination(:pages="pages" @reload="getTasks")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment-timezone';
import MoreDetail from '../../../components/more-detail.vue';
import TaskLabel from './task-label.vue';
import Pagination from '../../../components/pagination.vue';

export default {
  name: 'TasksList',
  components: {
    MoreDetail,
    Pagination,
    TaskLabel,
  },
  props: ['asset_id', 'category', 'domain', 'priority', 'reload', 'status'],
  computed: {
    ...mapGetters({
      tasks: 'getTasks',
      pages: 'getTasksNumberOfPages',
    }),
  },
  created() {
    this.getTasks();
  },
  mounted() {
    this.$watch('reload', () => {
      this.getTasks();
    }, {});
    this.$watch('category', () => {
      this.getTasks();
    }, {});
    this.$watch('priority', () => {
      this.getTasks();
    }, {});
    this.$watch('status', () => {
      this.getTasks();
    }, {});
  },
  methods: {
    ...mapActions([
      'getTasksByDomainAndAssetId',
      'getTasksByCategoryAndPriorityAndStatus',
      'getTasks',
      'fetchTasks',
      'isToday',
      'isCompleted',
      'setTaskCompleted',
      'setTaskDue',
      'setTaskStatus',
    ]),
    getTasks() {
      let pageId = 1;
      if (typeof this.$route.query.page !== 'undefined') {
        pageId = parseInt(this.$route.query.page, 10);
      }
      if (this.domain) {
        this.getTasksByDomainAndAssetId({ domain: this.domain, assetId: this.asset_id, pageId });
      } else if (this.category !== '' || this.priority !== '' || this.status !== '') {
        const status = (this.status === 'INCOMPLETE') ? '' : this.status;
        this.getTasksByCategoryAndPriorityAndStatus({
          category: this.category,
          priority: this.priority,
          status,
          pageId,
        });
      } else {
        this.fetchTasks({ pageId });
      }
    },
    isCompleted(status) {
      return (status === 'COMPLETED');
    },
    isToday(date) {
      return moment(date).tz('Asia/Tashkent').isSame(moment(), 'day');
    },
    openModal(data) {
      this.data = data;
      this.$emit('openModal', this.data);
    },
    setTaskStatus(taskId) {
      this.setTaskCompleted(taskId)
        .then(() => { this.getTasks(); })
        .catch(({ data }) => {
          this.message = data;
          return this.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 20px 0;
}
</style>
