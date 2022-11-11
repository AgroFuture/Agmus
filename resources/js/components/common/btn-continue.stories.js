import { storiesOf } from '@storybook/vue';
import BtnContinue from './btn-continue.vue';

storiesOf('BtnContinue', module)
  .add('default', () => (
    {
      components: { BtnContinue },
      template: '<BtnContinue title="Davom ettirish" />',
    }
  ))
  .add('default finish', () => (
    {
      components: { BtnContinue },
      template: '<BtnContinue title="Oʻrnatishni tugatish" />',
    }
  ))
  .add('with custom css', () => (
    {
      components: { BtnContinue },
      template: '<BtnContinue title="Davom ettirish" class="float-right" />',
    }
  ));
