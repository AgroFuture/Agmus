<template lang="pug">
  form(@submit.prevent="create")
    .wrapper-md
      .m-n.font-thin.h3.text-black
        translate Bosh sahifa
    .wrapper-md
      .row
        .col-sm-8.col-sm-offset-2.col-md-6.col-md-offset-3
          .panel.panel-default
            .panel-heading
              span.h4.font-bold
                translate Xo;jalik yaratish
            .panel-body
              error-message(:message="message.error_message")
              .form-group
                label(for="name")
                  translate Ferma nomi
                input.form-control#name(type="text" placeholder="" v-model="farm.name")
              .form-group
                label(for="name")
                  translate Xojalik tasnifi
                textarea.form-control#description(placeholder="" rows="4" v-model="farm.description")
              .form-group
                label(for="type")
                  translate Ferma turi
                select.form-control#type(placeholder="" v-model="farm.farm_type")
                  option(v-for="type in types" :value="type.code") {{ type.name }}
              .row
                .col-xs-12
                  .form-group
                    label Joylashuv
                    button.btn.btn-default.pull-right(@click="findMe" type="button")
                      i.fa.fa-crosshairs
              .form-group
                .row
                  .col-xs-6
                    input.form-control(type="text" placeholder="Latitude" v-model="farm.latitude")
                  .col-xs-6
                    input.form-control(type="text" placeholder="Longitude" v-model="farm.longitude")
              .form-group
                .row
                  .col-xs-6
                    label Davlat
                    select.form-control(v-model="farm.country_code" @change="countryChanged($event.target.value)")
                      option(v-for="country in countries" :value="country.ID") {{ country.Name }}
                  .col-xs-6
                    label Shahar/Tuman
                    select.form-control(v-model="farm.city_code")
                      option(v-for="city in cities" :value="city.ID") {{ city.Name }}
              .form-group.text-center.m-t
                button.btn.btn-addon.btn-primary(type="submit")
                  i.fa.fa-long-arrow-right
                  translate Davom ettirish
</template>

<script>
import mixins from './mixins'
export default {
  name: 'FarmCreate',
  mixins: [ mixins ],
  methods: {
    redirectTo (data) {

    },
  }
}
</script>
