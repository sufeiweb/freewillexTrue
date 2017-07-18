<template>
  <div class="app">
    <topHeader v-show="TopHeaderStyle"></topHeader>
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
    <footers v-show="FooterStyle"></footers>
  </div>
</template>

<script>
  import topHeader from './components/topHeader.vue';
  import footers from './components/footer.vue';
  import home from './components/home.vue';
  import business from './components/business.vue';
  import introduction from './components/introduction.vue';
  import {mapGetters} from 'vuex';
  export default {
    components: {
      topHeader, footers, home, business, introduction
    },
    computed: mapGetters(
      ['TopHeaderStyle', 'FooterStyle']
    ),
    watch: {
      $route(to) {
        this.routeChange(to.path);
      }
    },
    methods: {
      routeChange(path) {
        path = path.substring(1);
        console.log(path);
        if (path === 'quotation') {
          this.$store.dispatch('hideHeader');
          this.$store.dispatch('hideFooter');
        } else {
          this.$store.dispatch('showHeader');
          this.$store.dispatch('showFooter');
        }
      }
    },
  }
</script>
