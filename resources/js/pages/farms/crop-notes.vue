<template lang="pug">
.container-fluid.bottom-space
  .crop-detail(v-if="loading === false")
    modal(v-if="showTaskModal" @close="closeModal")
      cropTask(:crop="crop" :data="data")

    .row
      .col
        router-link(:to="{name: 'FarmCrops'}")
          i.fa.fa-long-arrow-alt-left
          translate Ekin partiyasiga qaytish

        b-nav
          b-nav-item
            router-link(:to="{ name: 'FarmCrop', params: { id: crop.uid } }")
              translate Umumiy ma'lumotlar
          b-nav-item
            router-link(:to="{ name: 'FarmCropNotes', params: { id: crop.uid } }")
              translate Vazifalar &amp; Izohlar

    .row
      .col
        b-card(
          :title="$gettext('Vazifalar')"
        )
          .row
            .col
              a.btn.btn-sm.btn-primary.btn-addon(style="cursor: pointer;" @click="openModal()")
                i.fa.fa-plus
                translate Vazifa qo'shish
          .row
            .col
              TasksList(:domain="'CROP'" :asset_id="crop.uid" :reload="reload" @openModal="openModal")

          .row
            .col
              h4
                translate Izohlar

              b-form(@submit.prevent="validateBeforeSubmit")
                .form-group
                  textarea.form-control#content(placeholder="Bu yerda izoh qoldiring..." rows="2" v-validate="'required'" :class="{'input': true, 'text-danger': errors.has('note.content') }" v-model="note.content" name="note.content")
                  span.help-block.text-danger(v-show="errors.has('note.content')") {{ errors.first('crop.container_cell') }}
                .form-group
                  button.btn.btn-success.pull-right.m-b(type="submit")
                    translate Izoh qo'shish
              b-list-group
                b-list-group-item(v-for="cropNote in crop.notes" :key="cropNote.uid")
                  .row
                    .col-10
                      i.fa.fa-file
                      |
                      |
                      span {{ cropNote.content }}
                      |
                      |
                      small.text-muted {{ cropNote.created_date | moment('timezone', 'Asia/Jakarta').format('DD/MM/YYYY') }}
                    .col-2
                      button.btn.btn-xs.btn-default.float-right(v-on:click="deleteNote(cropNote.uid)")
                        i.fa.fa-trash
</template>

<script>
import { mapActions } from 'vuex';
import { FindContainer } from '../../stores/helpers/farms/crop';
import { StubCrop, StubNote } from '../../stores/stubs';
import Modal from '../../components/modal.vue';

export default {
  name: 'FarmCropNotes',
  components: {
    cropTask: () => import('./tasks/crop-task-form.vue'),
    TasksList: () => import('./tasks/task-list.vue'),
    Modal,
  },
  data() {
    return {
      crop: Object.assign({}, StubCrop),
      cropNotes: [],
      data: {},
      loading: true,
      note: Object.assign({}, StubNote),
      reload: false,
      showTaskModal: false,
    };
  },
  created() {
    this.getCropByUid(this.$route.params.id)
      .then(({ data }) => {
        this.loading = false;
        this.crop = data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    ...mapActions([
      'createCropNotes',
      'deleteCropNote',
      'getCropByUid',
    ]),
    closeModal() {
      this.showTaskModal = false;
      this.reload = !this.reload;
    },
    create() {
      this.note.obj_uid = this.$route.params.id;
      this.createCropNotes(this.note)
        .then((data) => {
          this.crop = data;
          return this.crop;
        })
        .catch(() => this.$toasted.error('Error in note submission'));
    },
    deleteNote(noteUid) {
      this.note.obj_uid = this.$route.params.id;
      this.note.uid = noteUid;
      this.deleteCropNote(this.note)
        .then((data) => {
          this.crop = data;
          return this.crop;
        })
        .catch(() => this.$toasted.error('Error in note deletion'));
    },
    getCropContainer(key, count) {
      return FindContainer(key).label + ((count !== 1) ? 's' : '');
    },
    openModal(data) {
      if (data) {
        this.data = data;
      } else {
        this.data = {};
      }
      this.showTaskModal = true;
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
.card-wrapper {
  margin-top: 20px;
}

.bottom-space {
  padding-bottom: 60px;
}
</style>
