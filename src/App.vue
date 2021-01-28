<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://cdn.jsdelivr.net/gh/NaurozAhmad/CSSMarginPaddingClasses/margin-padding-classes.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
}

.button.is-secondary {
  background-color: #EEEEEE;
}
</style>
