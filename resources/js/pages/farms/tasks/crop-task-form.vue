<template lang="pug">
.crop-task
    .modal-header
      span.h4.font-bold
        translate Ekin uchun Vazifa qo'shish
        |
        |
        span.identifier {{ batch_id }}
    .modal-body
      b-form(@submit.prevent="validateBeforeSubmit")
        .form-row
          .col-xs-12.col-sm-12.col-md-8
            .form-group
              label(for="due_date")
                translate Muddati
              .input-group
                datepicker#due_date(type="text" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('due_date') }" v-model="task.due_date" name="due_date" input-class="form-control" ref="openCal")
                span.input-group-btn
                  button.btn.btn-primary(type="button" v-on:click="openPicker")
                    i.fas.fa-calendar-alt
              span.help-block.text-danger(v-show="errors.has('due_date')") {{ errors.first('due_date') }}
          .col-xs-12.col-sm-12.col-md-4
            .form-group
              label(for="priority")
                translate Bu vazifa shoshilinchmi?
              .radio
                label.i-checks.i-checks-sm
                  input#priority(type="radio" name="priority" value="URGENT" checked="checked" v-model="task.priority" v-validate="'required'")
                  i
                    translate Ha
              .radio
                label.i-checks.i-checks-sm
                  input#priority(type="radio" name="priority" value="NORMAL" v-model="task.priority" v-validate="'required'")
                  i
                    translate Yo'q
              span.help-block.text-danger(v-show="errors.has('priority')") {{ errors.first('priority') }}
        .form-row
          .col-xs-12.col-sm-12
            .form-group
              label(for="area_id")
                translate Vazifangizni bajarish uchun maydonni tanlang
              select.form-control#area_id(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('area_id') }" v-model="task.area_id" name="area_id")
                option(value="")
                  translate Iltimos maydonni tanlang
                option(v-for="area in areas" :value="area.uid") {{ area.name }}
              span.help-block.text-danger(v-show="errors.has('area_id')") {{ errors.first('area_id') }}
          .col-xs-12.col-sm-12
            .form-group
              label(for="category")
                translate Vazifa Kategoriyasi
              select.form-control#category(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('category') }" v-model="task.category" name="category" @change="typeChanged($event.target.value)")
                option(value="")
                  translate Iltimos kategoriyani tanlang
                option(value="CROP")
                  translate Ekin
                option(value="NUTRIENT")
                  translate Oziqlantiruvchi
                option(v-for="category in options.taskCategories" :value="category.key") {{ category.label }}
              span.help-block.text-danger(v-show="errors.has('category')") {{ errors.first('category') }}
        .form-group(v-if="isfertilizer")
          label(for="fertilizer")
            translate Foydalanadigan o'g'itni tanlang
          select.form-control#fertilizer(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('fertilizer') }" v-model="task.material_id" name="fertilizer")
            option(value="")
              translate Iltimos, o'g'itni tanlang
            option(v-for="fertilizer in fertilizers" :value="fertilizer.uid") {{ fertilizer.name }}
          span.help-block.text-danger(v-show="errors.has('fertilizer')") {{ errors.first('fertilizer') }}
        .form-group(v-if="ispesticide")
          label(for="pesticide")
            translate Foydalanadigan pestitsidni tanlang
          select.form-control#pesticide(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('pesticide') }" v-model="task.material_id" name="pesticide")
            option(value="")
              translate Iltimos, pestitsidni tanlang
            option(v-for="pesticide in pesticides" :value="pesticide.uid") {{ pesticide.name }}
          span.help-block.text-danger(v-show="errors.has('pesticide')") {{ errors.first('pesticide') }}
        .form-group
          label(for="title")
            translate Sarlavha
          input.form-control#title(type="text" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('title') }" v-model="task.title" name="title")
          span.help-block.text-danger(v-show="errors.has('title')") {{ errors.first('title') }}
        .form-group
          label(for="description")
            translate Izoh
          textarea.form-control#description(type="text" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('description') }" v-model="task.description" name="description" rows="3")
          span.help-block.text-danger(v-show="errors.has('description')") {{ errors.first('description') }}
        .form-group
          button.btn.btn-addon.btn-primary.float-right(type="submit")
            i.fas.fa-check
            translate OK
          button.btn.btn-addon.btn-default(style="cursor: pointer;" @click="$parent.$emit('close')")
            i.fas.fa-times
            translate Bekor qilish
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import { StubTask } from '../../../stores/stubs'
import { TaskDomainCategories } from '../../../stores/helpers/farms/task'
import Datepicker from 'vuejs-datepicker';
export default {
  name: "CropTask",
  components: {
      Datepicker
  },
  computed : {
    ...mapGetters({
      areas: 'getAllAreas',
      pesticides: 'getAllPesticides',
      fertilizers: 'getAllFertilizers',
    })
  },
  data () {
    return {
      batch_id: '',
      crop_id: '',
      isfertilizer: false,
      ispesticide: false,
      task: Object.assign({}, StubTask),
      options: {
        taskCategories: Array.from(TaskDomainCategories),
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchAreas',
      'fetchAgrochemicalMaterials',
      'getCropByUid',
      'openPicker',
      'submitTask',
    ]),
    validateBeforeSubmit () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submit()
        }
      })
    },
    submit () {
      this.task.asset_id = this.crop_id
      this.task.crop_id = this.crop_id
      this.task.domain = "CROP"
      this.submitTask(this.task)
        .then(() => this.$parent.$emit('close'))
        .catch(() => this.$toasted.error('Error in task submission'))
    },
    openPicker () {
      this.$refs.openCal.showCalendar()
    },
    typeChanged (type) {
      this.isfertilizer = false
      this.ispesticide = false
      if (type == "NUTRIENT") {
        this.isfertilizer = true
      } else if (type == "PESTCONTROL") {
        this.ispesticide = true
      }
    }
  },
  mounted () {
    this.fetchAreas()
    if (typeof this.data.uid != "undefined") {
      this.task.uid = this.data.uid
      this.task.due_date = this.data.due_date
      this.task.priority = this.data.priority
      this.task.category = this.data.category
      this.task.title = this.data.title
      this.task.description = this.data.description
      this.task.area_id = this.data.domain_details.area.area_id
      this.crop_id = this.data.asset_id
      this.getCropByUid(this.data.asset_id)
        .then(({ data }) =>  {
          this.batch_id = data.batch_id
          }).catch(error => console.log(error))
    } else {
      this.batch_id = this.crop.batch_id
      this.crop_id = this.crop.uid
    }
    this.fetchAgrochemicalMaterials({ type: "O'G'IT" })
    this.fetchAgrochemicalMaterials({ type: "PESTITSID" })
  },
  props: ['crop', 'data'],
}
</script>
