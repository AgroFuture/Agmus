<template lang="pug">
.tasks-form
    .modal-header
      h4.font-bold(v-if="task.uid")
        translate Vazifani o'zgartirish
      h4.font-bold(v-else-if="asset != 'General'")
        | {{ asset }}:
        |
        span.areatag {{ data.name }}        
        |
        |
        translate Ga yangi vazifa qo'shish
      h4.font-bold(v-else)
        translate Yangi vazifa qo'shish
    .modal-body
      b-form(@submit.prevent="validateBeforeSubmit")
        .form-row
          .col-xs-12.col-sm-12.col-md-8.col-lg-7
            .form-group
              label#label-due-date
                translate Muddati
              .input-group
                datepicker#due_date(
                  type="text"
                  v-validate="'required'"
                  :class="{'input': true, 'text-danger': errors.has('due date') }"
                  v-model="task.due_date"
                  name="due date"
                  input-class="form-control"
                  ref="openCal"
                )
                span.input-group-btn
                  button.btn.btn-primary(type="button" v-on:click="openPicker")
                    i.fas.fa-calendar-alt
              span.help-block.text-danger(v-show="errors.has('due date')")
                | {{ errors.first('due date') }}
          .col-xs-12.col-sm-12.col-md-4.col-lg-5
            .form-group
              label#label-priority
                translate Bu vazifa shoshilinchmi?
              .radio
                label.i-checks.i-checks-sm
                  input#priority(
                    type="radio"
                    name="priority"
                    value="URGENT"
                    checked="checked"
                    v-model="task.priority"
                    v-validate="'required'"
                  )
                  i
                  translate Ha
              .radio
                label.i-checks.i-checks-sm
                  input#priority(
                    type="radio"
                    name="priority"
                    value="NORMAL"
                    v-model="task.priority"
                    v-validate="'required'"
                  )
                  i
                  translate Yo'q
              span.help-block.text-danger(v-show="errors.has('priority')")
                | {{ errors.first('priority') }}
        .form-group
          label#label-category(for="category")
            translate Vazifa kategoriyasi
          select.form-control#category(
            v-validate="'required'"
            :class="{'input': true, 'text-danger': errors.has('category') }"
            v-model="task.category"
            name="category"
          )
            option(value="")
              translate Iltimos, toifani tanlang
            option(v-if="asset_name == 'AREA'" value="AREA")
              translate Maydon
            option(v-if="asset_name == 'RESERVOIR'" value="RESERVOIR")
              translate Suv manbai
            option(v-if="asset_name == 'GENERAL'" value="GENERAL")
              translate Umumiy
            option(v-for="category in options.taskCategories" :value="category.key")
              | {{ category.label }}
            option(v-if="asset_name == 'GENERAL'" value="INVENTORY")
              translate Inventarizatsiya
          span.help-block.text-danger(v-show="errors.has('category')")
            | {{ errors.first('category') }}
        .form-group
          label#label-title(for="title")
            translate Sarlavha
          input.form-control#title(
            type="text"
            v-validate="'required|max:100'"
            :class="{'input': true, 'text-danger': errors.has('title') }"
            v-model="task.title"
            name="title"
          )
          span.help-block.text-danger(v-show="errors.has('title')") {{ errors.first('title') }}
        .form-group
          label#label-description(for="description")
            translate Izoh
          textarea.form-control#description(
            type="text"
            :class="{'input': true, 'text-danger': errors.has('description') }"
            v-model="task.description"
            name="description"
            rows="3"
          )
          span.help-block.text-danger(v-show="errors.has('description')")
            | {{ errors.first('description') }}
        .form-group
          BtnCancel(v-on:click.native="$parent.$emit('close')")
          BtnSave(customClass="float-right")
</template>

<script>
import { mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import { StubTask } from '../../../stores/stubs';
import { TaskDomainCategories } from '../../../stores/helpers/farms/task';
import BtnCancel from '../../../components/common/btn-cancel.vue';
import BtnSave from '../../../components/common/btn-save.vue';

export default {
  name: 'FarmTasksForm',
  components: {
    Datepicker,
    BtnCancel,
    BtnSave,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    asset: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      task: Object.assign({}, StubTask),
      asset_name: '',
      options: {
        taskCategories: Array.from(TaskDomainCategories),
      },
    };
  },
  mounted() {
    if (typeof this.data.domain !== 'undefined') {
      this.task.uid = this.data.uid;
      this.task.due_date = this.data.due_date;
      this.task.priority = this.data.priority;
      this.task.category = this.data.category;
      this.task.title = this.data.title;
      this.task.description = this.data.description;
      this.asset_name = this.data.domain;
    } else {
      this.asset_name = this.asset.toUpperCase();
    }
  },
  methods: {
    ...mapActions([
      'openPicker',
      'submitTask',
    ]),
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submit();
        }
      });
    },
    openPicker() {
      this.$refs.openCal.showCalendar();
    },
    submit() {
      if (typeof this.data.domain !== 'undefined') {
        this.task.domain = this.data.domain;
      } else {
        this.task.asset_id = this.data.uid;
        this.task.domain = this.asset.toUpperCase();
      }
      this.submitTask(this.task)
        .then(() => this.$parent.$emit('close'))
        .catch(() => this.$toasted.error('Error in task submission'));
    },
  },
};
</script>

<style lang="scss" scoped>
i.fas.fa-check,
i.fas.fa-times {
  width: 30px;
}
</style>
