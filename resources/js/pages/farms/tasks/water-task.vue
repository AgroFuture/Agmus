<template lang="pug">
.upload-crop-task
    .modal-header
      h4.font-bold
        translate Sug'orish
    .modal-body
      b-form(@submit.prevent="validateBeforeSubmit")
        .form-group
          label(for="type")
            translate Sug'orish turini tanlang
          select.form-control#type(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('type') }" v-model="task.type" name="type" @change="typeChanged($event.target.value)")
            option(value="ALL")
              translate To'liq
            option(value="PARTIAL")
              translate Qisman
          span.help-block.text-danger(v-show="errors.has('type')") {{ errors.first('type') }}
        .form-group
          label
            translate Qaysi ekinni sug'ormoqchisiz?
          .checkbox(v-for="crop in crops")
            label.i-checks
              input(type="checkbox" name="selected crops" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('selected crops') }" v-model="task.crops" v-bind:value="crop.uid")
              i
              | {{ crop.inventory.name }}
              |
              |
              span.identifier-sm {{ crop.batch_id }}
          span.help-block.text-danger(v-show="errors.has('selected crops')") {{ errors.first('selected crops') }}
        .form-group
          BtnCancel(v-on:click.native="$parent.$emit('close')")
          BtnSave(customClass="float-right")
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment-timezone';
import { StubTask } from '../../../stores/stubs';
import BtnCancel from '../../../components/common/btn-cancel.vue';
import BtnSave from '../../../components/common/btn-save.vue';

export default {
  name: 'WaterTaskModal',
  props: ['crops', 'area'],
  components: {
    BtnCancel,
    BtnSave,
  },
  data() {
    return {
      task: Object.assign({}, StubTask),
    };
  },
  created() {
    this.task.type = 'PARTIAL';
    this.task.crops = [];
  },
  methods: {
    ...mapActions([
      'waterCrop',
    ]),
    create() {
      this.task.source_area_id = this.area.uid;
      this.task.watering_date = moment().format('YYYY-MM-DD HH:ss');
      for (let i = 0; i < this.task.crops.length; i += 1) {
        this.task.obj_uid = this.task.crops[i];
        this.waterCrop(this.task)
          .then(() => this.$parent.$emit('close'))
          .catch(() => this.$toasted.error('Error in water task submission'));
      }
    },
    typeChanged(type) {
      if (type === 'ALL') {
        for (let i = 0; i < this.crops.length; i += 1) {
          this.task.crops.push(this.crops[i].uid);
        }
      } else {
        this.task.crops = [];
      }
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.create();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
i.fa.fa-check,
i.fa.fa-close {
  width: 30px;
}
</style>
