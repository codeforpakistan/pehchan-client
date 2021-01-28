<template>
  <div class="mt2 ml1 mr1">
    <h1 class="title is-4 mb2">Please verify your identity</h1>
    <div class="field">
      <label class="label" for="mother-name">Mother's Name</label>
      <div class="select">
        <select>
          <option value="">Select</option>
          <option v-for="name in motherNames" :key="name">{{name}}</option>
        </select>
      </div>
    </div>
    <div class="control">
      <router-link class="mt2 button is-primary is-fullwidth" to="/signup/enter-contact">
        Submit
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  motherNames = ['Amna Sultan', 'Fatima Chughtai', 'Faheema Manthar'];
}

</script>

<style lang="scss" scoped>
  .select, .select select {
    width: 100%;
  }
</style>
