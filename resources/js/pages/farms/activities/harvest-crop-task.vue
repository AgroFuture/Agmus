<template lang="pug">
  .harvest-crop-task
    .modal-header
      h4
        translate Yig'im-terim
        |
        |
        span.identifier {{ crop.batch_id }}
    .modal-body
      b-form(@submit.prevent="validateBeforeSubmit")
        .form-row
          .col-6
            .form-group
              label(for="source_area_id")
                translate Yig'im-terim uchun maydonni tanlang
              select.form-control#source_area_id(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('source_area_id') }" v-model="task.source_area_id" name="source_area_id")
                option(value="")
                  translate Iltimos maydonni tanlang
                option(v-for="area in areas" :value="area.uid") {{ area.name }}
              span.help-block.text-danger(v-show="errors.has('source_area_id')") {{ errors.first('source_area_id') }}
          .col-6
            .form-group
              label(for="harvest_type")
                translate Yig'im-terim turini tanlang
              select.form-control#harvest_type(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('harvest_type') }" v-model="task.harvest_type" name="harvest_type")
                option(value="PARTIAL")
                  translate Qisman
                option(value="ALL")
                  translate To'liq
              span.help-block.text-danger(v-show="errors.has('harvest_type')") {{ errors.first('harvest_type') }}
        .form-row
          .col-6
            .form-group
              label(for="produced_quantity")
                translate Miqdori
              input.form-control#produced_quantity(type="text" v-validate="'required|decimal'" :class="{'input': true, 'text-danger': errors.has('produced_quantity') }" v-model="task.produced_quantity" name="produced_quantity")
              span.help-block.text-danger(v-show="errors.has('produced_quantity')") {{ errors.first('produced_quantity') }}
          .col-6
            .form-group
              label(for="units")
                translate Birliklari
              select.form-control#produced_unit(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('produced_unit') }" v-model="task.produced_unit" name="produced_unit")
                option(value="Gr")
                  translate Gramm
                option(value="Kg")
                  translate Kilogram
              span.help-block.text-danger(v-show="errors.has('produced_unit')") {{ errors.first('produced_unit') }}
        .form-group
          label(for="notes")
            translate Izohlar
          textarea.form-control#notes(type="text" :class="{'input': true, 'text-danger': errors.has('notes') }" placeholder="Yig'im-terimning ixtiyoriy izohlarini qoldiring" v-model="task.notes" name="notes" rows="2")
          span.help-block.text-danger(v-show="errors.has('notes')") {{ errors.first('notes') }}
        .form-group
          button.btn.btn-addon.btn-primary.float-right(type="submit")
            i.fas.fa-check
            translate OK
          button.btn.btn-addon.btn-default(style="cursor: pointer;" @click="$parent.$emit('close')")
            i.fas.fa-times
            translate Bekor qilish
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { StubTask } from '../../../stores/stubs';

export default {
  name: 'HarvestCropTask',
  props: ['crop'],
  data() {
    return {
      task: Object.assign({}, StubTask),
    };
  },
  computed: {
    ...mapGetters({
      areas: 'getAllAreas',
    }),
  },
  mounted() {
    this.fetchAreas();
    this.task.harvest_type = 'PARTIAL';
    this.task.produced_unit = 'Gr';
  },
  methods: {
    ...mapActions([
      'fetchAreas',
      'harvestCrop',
    ]),
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.create();
        }
      });
    },
    create() {
      this.task.obj_uid = this.crop.uid;
      this.harvestCrop(this.task)
        .then(() => this.$parent.$emit('close'))
        .catch(() => this.$toasted.error('Error in harvest crop submission'));
    },
  },
};
</script>
