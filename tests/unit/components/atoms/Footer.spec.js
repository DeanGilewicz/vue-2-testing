import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Footer from '@/components/atoms/Footer';

describe('Footer', () => {
  context('Template', () => {
    context('appearance', () => {
      it('should include legal text in footer', () => {
        const wrapper = shallowMount(Footer);
        expect(wrapper.text()).to.include('Codesmartz');
      });
    });
  });
});
