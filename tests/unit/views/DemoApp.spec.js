import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import constantsPlugin from '@/plugins/Constants';
import { appTitleEl } from '../../utils/elements';

import DemoApp from '@/views/DemoApp';

const localVue = createLocalVue();
localVue.use(constantsPlugin);

describe('DemoApp', () => {
  context('Template', () => {
    context('appearance', () => {
      it('should render todo app pretty name by default', () => {
        const wrapper = shallowMount(DemoApp, {
          localVue
        });
        // eslint-disable-next-line no-underscore-dangle
        expect(wrapper.find(appTitleEl).text()).to.equal(constantsPlugin.__get__('CONSTANTS').TODO_PRETTY_NAME);
      });
    });
  });
});
