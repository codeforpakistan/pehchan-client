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

.b-checkbox.checkbox input[type=checkbox]:checked + .check.is-primary {
  // background: #005741;
  // border-color: #005741;
  background: #005741 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath style='fill:%23fff' d='M 0.04038059,0.6267767 0.14644661,0.52071068 0.42928932,0.80355339 0.3232233,0.90961941 z M 0.21715729,0.80355339 0.85355339,0.16715729 0.95961941,0.2732233 0.3232233,0.90961941 z'%3E%3C/path%3E%3C/svg%3E") no-repeat center center;
  border-color: #005741;
}

.b-checkbox.checkbox input[type=checkbox]:focus:checked + .check.is-primary {
  -webkit-box-shadow: 0 0 0.5em rgb(0 87 65 / 80%);
  box-shadow: 0 0 0.5em rgb(0 87 65 / 80%);
}

.b-checkbox.checkbox:hover input[type=checkbox]:not(:disabled) + .check.is-primary {
  border-color: #005741;
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

.password-input {
  position: relative;
}
.password-input span {
  position: absolute;
  top: 6px;
  font-size: 1.3rem;
  right: 10px;
  color: rgb(161, 161, 161);
  cursor: pointer;
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
.form-header {
  h1 {
    color: #005741;
    font-weight: 900;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  p.is-primary {
    color: #005741;
    font-weight: 500;
  }
  p {
    color: black;
    font-weight: 450;
    font-size: 1.1rem;
  }
  a.forgot-pass {
    text-align: left;
    text-decoration: underline;
    color: #005741
  }
}
.text-link {
  span.link {
    color: #005741;
    cursor: pointer;
    font-weight: 500;
  }
  span.link:hover {
    text-decoration: underline;
  }
}
</style>
