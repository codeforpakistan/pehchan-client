<template>
  <div class="home">
    <h1 class="title">Log in with Pehchan</h1>
    <PehchanLanding/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PehchanLanding from '@/components/PehchanLanding.vue'; // @ is an alias to /src

@Component({
  components: {
    PehchanLanding,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
  .home {
    margin-top: 20vh;
  }
</style>
