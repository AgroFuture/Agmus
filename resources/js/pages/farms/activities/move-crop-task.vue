<template lang="pug">
  .move-crop-task
    .modal-header
      h4
        translate Ko'chirish
        |
        |
        span.identifier {{ crop.batch_id }}
      span.pull-right.text-muted(style="cursor: pointer;" @click="$parent.$emit('close')")
        i.fa.fa-close
    .modal-body
      b-form(@submit.prevent="validateBeforeSubmit")
        .form-group
          label(for="source_area_id")
            translate Manba maydonini tanlang
          select.form-control#source_area_id(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('source_area_id') }" v-model="task.source_area_id" name="source_area_id" @change="areaChange($event.target.value)")
            option(value="")
              translate Iltimos maydonni tanlang
            option(v-for="area in current_areas" :value="area.area_id") {{ area.name }}
          span.help-block.text-danger(v-show="errors.has('source_area_id')") {{ errors.first('source_area_id') }}
        .form-group
          label(for="destination_area_id")
            translate Belgilangan hududni tanlang
          select.form-control#destination_area_id(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('destination_area_id') }" v-model="task.destination_area_id" name="destination_area_id")
            option(value="")
              translate Iltimos maydonni tanlang
            option(v-for="area in areas" :value="area.uid") {{ area.name }}
          span.help-block.text-danger(v-show="errors.has('destination_area_id')") {{ errors.first('destination_area_id') }}
        .form-group
          label(for="quantity")
            translate Qancha o'simlikni ko'chirmoqchisiz?
          vue-slider(v-model="task.quantity" v-bind:min="1" v-bind:max="max_value")
          span.help-block.text-danger(v-show="errors.has('quantity')") {{ errors.first('quantity') }}
        .form-group
          button.btn.btn-addon.btn-primary.float-right(type="submit")
            i.fas.fa-check
            translate OK
          button.btn.btn-addon.btn-default(style="cursor: pointer;" @click="$parent.$emit('close')")
            i.fas.fa-times
            translate Bekor qilish
</template>


<script>
import vueSlider from 'vue-slider-component';
import { mapGetters, mapActions } from 'vuex';
import { StubTask } from '../../../stores/stubs';

export default {
  name: 'MoveCropTask',
  components: {
    vueSlider,
  },
  props: ['crop'],
  data() {
    return {
      max_value: 100,
      current_areas: [],
      task: Object.assign({}, StubTask),
    };
  },
  computed: {
    ...mapGetters({
      areas: 'getAllAreas',
    }),
  },
  created() {
    this.task.quantity = 1;
    if (this.crop.initial_area.current_quantity > 0) {
      this.current_areas.push(this.crop.initial_area);
    }
    for (let i = 0; i < this.crop.moved_area.length; i += 1) {
      if (this.crop.moved_area[i].current_quantity > 0) {
        this.current_areas.push(this.crop.moved_area[i]);
      }
    }
  },
  mounted() {
    this.fetchAreas();
  },
  methods: {
    ...mapActions([
      'fetchAreas',
      'moveCrop',
      'areaChange',
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
      this.moveCrop(this.task)
        .then(() => this.$parent.$emit('close'))
        .catch(() => this.$toasted.error('Error in move crop submission'));
    },
    areaChange(areaId) {
      for (let i = 0; i < this.current_areas.length; i += 1) {
        if (this.current_areas[i].area_id === areaId) {
          this.max_value = this.current_areas[i].current_quantity;
          this.task.quantity = 1;
          break;
        }
      }
    },
  },
};
</script>
