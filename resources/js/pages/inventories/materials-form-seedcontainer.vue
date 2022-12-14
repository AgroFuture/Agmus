<template lang="pug">
  .materials-create
    b-form(@submit.prevent="validateBeforeSubmit")
      .form-row
        .col-6
          label(for="name")
            translate Nomi
          input.form-control#name(type="text" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('name') }" v-model="inventory.name" name="name")
          span.help-block.text-danger(v-show="errors.has('name')") {{ errors.first('name') }}
        .col-6
          label(for="container_type")
            translate Turi
          select.form-control#container_type(v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('container_type') }" v-model="inventory.container_type" name="container_type")
            option(v-for="container in options.containers" v-bind:value="container.key") {{ container.label }}s
          span.help-block.text-danger(v-show="errors.has('container_type')") {{ errors.first('container_type') }}
      .form-row
        .col-6
          label(for="price_per_unit")
            translate Tan narxi
          b-input-group(:prepend="$gettext('som')")
            input.form-control#price_per_unit(type="text" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('price_per_unit') }" v-model="inventory.price_per_unit" name="price_per_unit")
          span.help-block.text-danger(v-show="errors.has('price_per_unit')") {{ errors.first('price_per_unit') }}
        .col-6
          label.control-label(for="quantity")
            translate Miqdori
          b-input-group(:append="$gettext('Dona')")
            input.form-control#quantity(type="text" v-validate="'required|decimal|min:0'" :class="{'input': true, 'text-danger': errors.has('quantity') }" v-model="inventory.quantity" name="quantity")
          span.help-block.text-danger(v-show="errors.has('quantity')") {{ errors.first('quantity') }}
      .form-group
        label.control-label
          translate Ishlab chiqaruvchi
        input.form-control#produced_by(type="text" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('produced_by') }" v-model="inventory.produced_by" name="produced_by")
        span.help-block.text-danger(v-show="errors.has('produced_by')") {{ errors.first('produced_by') }}
      .form-group
        label.control-label(for="notes")
          translate Qo'shimcha izohlar
        textarea.form-control#notes(type="text" :class="{'input': true, 'text-danger': errors.has('notes') }" v-model="inventory.notes" name="notes" rows="2")
        span.help-block.text-danger(v-show="errors.has('notes')") {{ errors.first('notes') }}
      .form-group
        BtnCancel(v-on:click.native="closeModal()")
        BtnSave(customClass="float-right")
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import { StubInventory } from '../../stores/stubs';
import { Containers } from '../../stores/helpers/farms/crop';
import BtnCancel from '../../components/common/btn-cancel.vue';
import BtnSave from '../../components/common/btn-save.vue';

export default {
  name: 'InventoriesMaterialsFormLabelCrop',
  components: {
    BtnCancel,
    BtnSave,
  },
  props: ['data'],
  data() {
    return {
      inventory: Object.assign({}, StubInventory),
      options: {
        containers: Array.from(Containers),
      },
    };
  },
  mounted() {
    if (typeof this.data.uid !== 'undefined') {
      this.inventory.uid = this.data.uid;
      this.inventory.name = this.data.name;
      this.inventory.container_type = this.data.type.type_detail.container_type.code;
      this.inventory.produced_by = this.data.produced_by;
      this.inventory.quantity = this.data.quantity.value;
      this.inventory.price_per_unit = this.data.price_per_unit.amount;
      this.inventory.notes = this.data.notes;
    } else {
      this.inventory.container_type = this.options.containers[0].key;
    }
  },
  methods: {
    ...mapActions([
      'submitMaterial',
    ]),
    submit() {
      this.inventory.expiration_date = moment().format('YYYY-MM-DD');
      this.inventory.type = 'seeding_container';
      this.inventory.quantity_unit = 'PIECES';
      this.submitMaterial(this.inventory)
        .then(() => this.$emit('closeModal'))
        .catch(() => this.$toasted.error('Error in material submission'));
    },
    closeModal() {
      this.$emit('closeModal');
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submit();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
i.fa.fa-plus {
  width: 30px;
}
</style>
