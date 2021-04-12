<template>
  <div id="app">
    <div v-if="loading" class="loading-container">
      <div class="">
        <div class="lds-dual-ring"></div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import emitter from './emitter';

@Component
export default class Home extends Vue {
  loading = false;

  mounted() {
    emitter.on('loading', (data) => {
      this.loading = data;
    });
  }
}
</script>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/gh/NaurozAhmad/CSSMarginPaddingClasses/margin-padding-classes.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 455px;
  margin-left: auto;
  margin-right: auto;
  color: #2c3e50;
}

.loading-container {
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: grid;
  place-content: center;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media only screen and (min-width: 455px) {
  #app {
    background-color: #fff;
    padding: .5em;
    box-shadow:1px 1px 8px -3px rgb(0 0 0 / 50%);
    border-radius: 0.5em;
    margin-top: 2em;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.p-title {
  font-size: 2em;
  font-weight: bold;
}

h1 {
  font-size: 1.5em;
  margin-top: 3em;
  margin-bottom: 2em;
}

h1, h2, h3 {
  font-weight: 600;
  line-height: 1.125;
}

h3 {
  font-size: 1.25rem;
  font-weight: bold;
}

.label {
  text-align: left;
  padding-left: .1em;
}

.flex {
  display: flex;
}

.flex-center {
  justify-content: center;
  align-items: center;
}

.flex-column {
  flex-direction: column;
}

.button {
  color: #005741;
}

.button.is-primary {
  background-color: #005741;
  border-color: transparent;
  color: #fff;

  &:hover {
    background-color: #008866;
  }

  &:disabled {
    background-color: #4ec9aa;
  }
}

.button.is-secondary {
  background-color: #EEEEEE;
}
span.light-text {
  font-weight: 500;
  color: grey;
}
.required-asterisk {
  color: red;
}
.input:focus {
  border:1px solid #008866;
  box-shadow: 0 1px 5px #008866;
}
</style>
