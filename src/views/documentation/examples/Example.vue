<template>
  <main class="example">
    <section class="title">
      <h1 class="text-2xl md:text-3xl lg:text-4xl text-center">Examples - {{ currentComponent.replaceAll('-', ' ') }}</h1>
    </section>
    <section :id="'examples-' + currentComponent.toLowerCase()" class="mt-4 md:mt-6 lg:mt-8">
      <component :is="currentComponent"></component>
    </section>
  </main>
</template>

<script>
import Computed from '@/components/documentation/Computed';
import Data from '@/components/documentation/Data';
import EndToEnd from '@/components/documentation/EndToEnd';
import Events from '@/components/documentation/Events';
import Integration from '@/components/documentation/Integration';
import Lifecycle from '@/components/documentation/Lifecycle';
import Methods from '@/components/documentation/Methods';
import MountingOptions from '@/components/documentation/MountingOptions';
import NonExportedFns from '@/components/documentation/NonExportedFns';
import Plugins from '@/components/documentation/Plugins';
import Props from '@/components/documentation/Props';
import Router from '@/components/documentation/Router';
import SpiesStubsMocks from '@/components/documentation/SpiesStubsMocks';
import Template from '@/components/documentation/Template';
import Vuex from '@/components/documentation/Vuex';
import Watch from '@/components/documentation/Watch';
import { capitalizeFirstLetter } from '@/utils/helpers';
export default {
  name: 'Example',
  components: {
    Computed,
    Data,
    EndToEnd,
    Events,
    Integration,
    Lifecycle,
    Methods,
    MountingOptions,
    NonExportedFns,
    Plugins,
    Props,
    Router,
    SpiesStubsMocks,
    Template,
    Vuex,
    Watch
  },
  props: {
    example: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentComponent() {
      if (this.example) {
        // capitalize string prop (from url) to match imported component name
        const capitalizedProp = capitalizeFirstLetter(this.example);
        return capitalizedProp;
      }
      return Props;
    }
  }
};
</script>
