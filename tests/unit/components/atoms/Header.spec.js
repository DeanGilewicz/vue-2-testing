import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import {
  logoEl,
  routerLinkDemoAppEl,
  routerLinkDocumentationEl
} from '../../../utils/elements';
import VueRouter from 'vue-router';

import Header from '@/components/atoms/Header';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Header', () => {
  context('computed', () => {
    context('isContributeRoute', () => {
      it('should return false when route path does not include contribute', () => {
        const scope = {
          $route: {
            path: '/documentation'
          }
        };
        expect(Header.computed.isContributeRoute.call(scope)).to.equal(false);
      });

      it('should return true when route path includes contribute', () => {
        const scope = {
          $route: {
            path: '/contribute'
          }
        };
        expect(Header.computed.isContributeRoute.call(scope)).to.equal(true);
      });
    });

    context('isDocumentationRoute', () => {
      it('should return false when route path does not include documentation', () => {
        const scope = {
          $route: {
            path: '/demo'
          }
        };
        expect(Header.computed.isDocumentationRoute.call(scope)).to.equal(false);
      });

      it('should return true when route path includes documentation', () => {
        const scope = {
          $route: {
            path: '/documentation'
          }
        };
        expect(Header.computed.isDocumentationRoute.call(scope)).to.equal(true);
      });
    });

    context('isTodoAppRoute', () => {
      it('should return false when route path does not include demo', () => {
        const scope = {
          $route: {
            path: '/contribute'
          }
        };
        expect(Header.computed.isTodoAppRoute.call(scope)).to.equal(false);
      });

      it('should return true when route path includes demo', () => {
        const scope = {
          $route: {
            path: '/demo'
          }
        };
        expect(Header.computed.isTodoAppRoute.call(scope)).to.equal(true);
      });
    });
  });

  context('Template', () => {
    context('appearance', () => {
      it('should render the logo', () => {
        const wrapper = shallowMount(Header, {
          localVue,
          router
        });
        expect(wrapper.find(logoEl).attributes('src')).to.include('logo');
      });
    });

    context('styles', () => {
      it('should set active text color for documentation link and default color for demo link when visiting a documentation route', () => {
        const wrapper = shallowMount(Header, {
          computed: {
            isDocumentationRoute() {
              return true;
            },
            isTodoAppRoute() {
              return false;
            }
          },
          localVue,
          router
        });
        expect(wrapper.find(routerLinkDocumentationEl).classes('text-gray-500')).to.equal(false);
        expect(wrapper.find(routerLinkDocumentationEl).classes('text-blue-400')).to.equal(true);
        expect(wrapper.find(routerLinkDemoAppEl).classes('text-gray-500')).to.equal(true);
        expect(wrapper.find(routerLinkDemoAppEl).classes('text-blue-400')).to.equal(false);
      });

      it('should set active text color for demo link and default color for documentation link when visiting a demo route', () => {
        const wrapper = shallowMount(Header, {
          computed: {
            isDocumentationRoute() {
              return false;
            },
            isTodoAppRoute() {
              return true;
            }
          },
          localVue,
          router
        });
        expect(wrapper.find(routerLinkDocumentationEl).classes('text-gray-500')).to.equal(true);
        expect(wrapper.find(routerLinkDocumentationEl).classes('text-blue-400')).to.equal(false);
        expect(wrapper.find(routerLinkDemoAppEl).classes('text-gray-500')).to.equal(false);
        expect(wrapper.find(routerLinkDemoAppEl).classes('text-blue-400')).to.equal(true);
      });
    });
  });
});
