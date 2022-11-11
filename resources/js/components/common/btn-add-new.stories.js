import { storiesOf } from '@storybook/vue';
import BtnAddNew from './btn-add-new.vue';

storiesOf('BtnAddNew', module)
  .add('default reservoir', () => (
    {
      components: { BtnAddNew },
      template: '<BtnAddNew title="Suv manbai qoshish" />',
    }
  ))
  .add('default area', () => (
    {
      components: { BtnAddNew },
      template: '<BtnAddNew title="Maydon qoshish" />',
    }
  ))
  .add('with custom css', () => (
    {
      components: { BtnAddNew },
      template: '<BtnAddNew title="Maydon qoshish" class="float-right" />',
    }
  ));
