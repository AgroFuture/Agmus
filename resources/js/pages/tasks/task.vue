<template lang="pug">
.container-fluid.bottom-space
  .row
    .col
      modal(v-if="showCropModal" @close="showCropModal = false")
        CropTaskForm(:asset="'Crop'" :data="data")
      modal(v-if="showModal" @close="showModal = false")
        TaskForm(:asset="'General'" :data="data")

      h3.title-page
        translate Tasks

  .row
    .col-xs-12.col-sm-12.col-md-8.col-lg-9
      BtnAddNew(:title="$gettext('Vazifa qoshish')" v-on:click.native="openModal()")

      .cards-wrapper
        TasksList(:category="selected_category" :priority="selected_priority" :status="status" @openModal="openModal")

    .col-xs-12.col-sm-12.col-md-4.col-lg-3
      b-form
        .form-group
          label.control-label
            translate Kategoriya

        .form-group
          select.form-control(:class="{'input': true, 'text-danger': errors.has('category') }" name="category" @change="categoryChange($event.target.value)" v-model="selected_category")
            option(value="")
              translate Barchasi
            option(value="AREA")
              translate Maydon
            option(value="RESERVOIR")
              translate Suv manbai
            option(value="CROP")
              translate Ekin
            option(value="GENERAL")
              translate Umumiy
            option(v-for="category in options.taskCategories" :value="category.key") {{ category.label }}
        .form-group
          label.control-label
            translate Ustuvorlik

          select.form-control(@change="priorityChange($event.target.value)" v-model="selected_priority")
            option(value="")
              translate Barchasi
            option(value=" URGENT")
              translate Shoshilinch
            option(value="NORMAL")
              translate Oddiy

      .wrapper
        b-list-group
          b-list-group-item(
            v-bind:class="{ active: isActive('COMPLETED') }"
            @click="statusSelected('COMPLETED')"
          )
            h5.text-info
              translate Bajarilgan
          b-list-group-item(
            v-bind:class="{ active: isActive('INCOMPLETE') }"
            @click="statusSelected('INCOMPLETE')"
          )
            h5.text-muted
              translate Tugallanmagan
          b-list-group-item(
            v-bind:class="{ active: isActive('OVERDUE') }"
            @click="statusSelected('OVERDUE')"
          )
            h5.text-danger
              translate Muddati o'tgan
          b-list-group-item(
            v-bind:class="{ active: isActive('TODAY') }"
            @click="statusSelected('TODAY')"
          )
            h5.text-success
              translate Bugungi
          b-list-group-item(
            v-bind:class="{ active: isActive('THISWEEK') }"
            @click="statusSelected('THISWEEK')"
          )
            h5.text-lt
              translate Shu haftadagi
          b-list-group-item(
            v-bind:class="{ active: isActive('THISMONTH') }"
            @click="statusSelected('THISMONTH')"
          )
            h5.text-lt
              translate Shu oydagi
</template>

<script>
import { mapActions } from 'vuex';
import Modal from '../../components/modal.vue';
import TasksList from '../farms/tasks/task-list.vue';
import TaskForm from '../farms/tasks/task-form.vue';
import CropTaskForm from '../farms/tasks/crop-task-form.vue';
import { TaskDomainCategories } from '../../stores/helpers/farms/task';
import BtnAddNew from '../../components/common/btn-add-new.vue';

export default {
  name: 'Tasks',
  components: {
    CropTaskForm,
    Modal,
    TaskForm,
    TasksList,
    BtnAddNew,
  },
  data() {
    return {
      data: {},
      options: {
        taskCategories: Array.from(TaskDomainCategories),
      },
      selected_category: '',
      selected_priority: '',
      showCropModal: false,
      showModal: false,
      status: 'INCOMPLETE',
    };
  },
  methods: {
    ...mapActions([
    ]),
    closeModal() {
      this.showModal = false;
    },
    categoryChange(type) {
      this.selected_category = type;
    },
    openModal(data) {
      if (data) {
        this.data = data;
        if (data.domain === 'CROP') {
          this.showCropModal = true;
        }
      } else {
        this.data = {};
      }
      if (!this.showCropModal) {
        this.showModal = true;
      }
    },
    priorityChange(type) {
      this.selected_priority = type;
    },
    statusSelected(status) {
      this.status = status;
    },
    isActive(status) {
      return this.status === status;
    },
  },
};
</script>

<style lang="scss" scoped>
h3.title-page {
  margin: 20px 0 30px 0;
}

.bottom-space {
  padding-bottom: 60px;
}

.cards-wrapper {
  margin-top: 20px;
}

form {
  padding-top: 30px;
}

.list-group-item:hover {
  cursor: pointer;
}
</style>
