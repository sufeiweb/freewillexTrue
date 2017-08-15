<template>
  <div class="app">
    <topHeader v-show="TopHeaderStyle"></topHeader>
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
    <footers v-show="FooterStyle"></footers>
    <Tips></Tips>
  </div>
</template>

<script>
  import topHeader from './components/topHeader.vue';
  import footers from './components/footer.vue';
  import Tips from './components/text_components/tips.vue';

  import {mapGetters} from 'vuex';
  export default {
    components: {
      topHeader, footers,Tips
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
        swted(num){
          $('.nav-link-box li').find('a').css({
            borderBottom: 'none',
            color: '#333'
          });
          $('.nav-link-box li').eq(num).find('a').css({
            borderBottom: '2px solid #01aaef',
            color: '#01aaef'
          });
        },
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
        if (path === 'quotation') {
          this.swted(1);
        }
        if (path === 'home') {
          this.swted(0)
        }
        if (path === 'businessCNYAccount') {
            this.$store.state.Account='CNY';
          this.swted(2)
        }
        if (path === 'businessBTCAccount') {
          this.$store.state.Account='BTC';
          this.swted(2)
        }
        if (path === 'userIndex') {
          this.swted(3)
        }
        if (path === 'userIndex1') {
          this.swted(3)
        }
      }
    },
  }
</script>
