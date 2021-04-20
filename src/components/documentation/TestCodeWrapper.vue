<template>
  <div>
    <template v-if="config.describeBlock && Object.keys(config.describeBlock).length">
      <pre class="bg-black text-green-500">
        <code>
    <span>describe('{{ config.describeBlock.text }}', () => {
      <span v-if="config.describeBlock.contextBlockOuter">context('{{ config.describeBlock.contextBlockOuter.text }}', () => {
        <span v-for="(contextBlockInner, innerIndex) in config.describeBlock.contextBlockOuter.contextBlockInners" :key="innerIndex"><br v-if="innerIndex !== 0" /><span :style="(innerIndex !== 0) ? 'position: relative; left: 48px;' : ''">context('{{ contextBlockInner.text }}', () => {</span>
          <span v-for="(itBlock, itIndex) in contextBlockInner.itBlocks" :key="itIndex">it('{{ itBlock.text }}', () => {
            <span>{{ itBlock.test }}</span>
          });
          </span><span class="inline-block" style="text-indent: -20px;">});</span></span>
      });</span>
    });</span></code>
      </pre>
    </template>
    <template v-if="config.contextBlockOuter && Object.keys(config.contextBlockOuter).length">
      <pre class="bg-black text-green-500">
        <code>
    <span>context('{{ config.contextBlockOuter.text }}', () => {
      <span v-for="(contextBlockInner, innerIndex) in config.contextBlockOuter.contextBlockInners" :key="innerIndex">context('{{ contextBlockInner.text }}', () => {
        <span v-for="(itBlock, itIndex) in contextBlockInner.itBlocks" :key="itIndex">it('{{ itBlock.text }}', () => {
          <span>{{ itBlock.test }}</span>
        });</span>
      });</span>
    });</span></code>
      </pre>
    </template>
    <template v-if="config.contextBlockInners && Array.isArray(config.contextBlockInners) && config.contextBlockInners.length > 0">
      <pre class="bg-black text-green-500">
        <code>
    <span v-for="(contextBlockInner, innerIndex) in config.contextBlockInners" :key="innerIndex">context('{{ contextBlockInner.text }}', () => {
      <span v-for="(itBlock, itIndex) in contextBlockInner.itBlocks" :key="itIndex">it('{{ itBlock.text }}', () => {
        <span>{{ itBlock.test }}</span>
      });</span>
    });</span></code>
      </pre>
    </template>
    <template v-if="config.itBlocks && Array.isArray(config.itBlocks) && config.itBlocks.length > 0">
      <pre class="bg-black text-green-500">
        <code>
    <span v-for="(itBlock, itIndex) in config.itBlocks" :key="itIndex">it('{{ itBlock.text }}', () => {
      <span>{{ itBlock.test }}</span>
    });</span></code>
      </pre>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CodeWrapper',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
