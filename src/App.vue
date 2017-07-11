<template>
  <div class="app">
    <topHeader></topHeader>
    <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
  import topHeader from './components/topHeader.vue';
  import footers from './components/footer.vue';
  import home from './components/home.vue';
  import business from './components/business.vue';
  import introduction from './components/introduction.vue';
  export default {
    components: {
      topHeader, footers, home, business, introduction
    }
  }
</script>
