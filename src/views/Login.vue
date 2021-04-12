<template>
<div class="login mt1 ml1 mr1">
  <h1 class="mt2 mb1">PEHCHAAN</h1>
  <p class="mb1 is-primary">A digital identity linked with NADRA</p>
  <p class="mb1 mt2">Login with your pehchaan account to continue to KP Super App</p>
  <form v-on:submit="doLogin">
    <div class="field">
      <label class="label" for="nic">CNIC <span class="light-text">(without dashes)</span> <span class="required-asterisk">*</span></label>
      <div class="control">
        <input class="input" required name="nic" type="tel" v-model="nic" v-mask="'#####-#######-#'" placeholder="NIC">
      </div>
    </div>
    <div class="field">
      <label class="label" for="password">Password <span class="required-asterisk">*</span></label>
      <div class="control password-input">
        <input class="input" required name="password" :type="type" v-model="password" placeholder="Password">
        <span @click="showPassword">
          <font-awesome-icon v-if="type==='password'" :icon="['fas', 'eye']" />
          <font-awesome-icon v-if="type==='text'" :icon="['fas', 'eye-slash']" />
        </span>
      </div>
    </div>
    <div class="field" style="text-align: left;">
      <a class="forgot-pass">Forgot Password?</a>
    </div>
    <div v-if="error" class="field">
      <label style="color: red;">{{error}}</label>
    </div>
    <button type="submit" class="mt2 button is-primary is-fullwidth">Log In</button>
  </form>
  <div class="flex flex-center flex-column mt2 mb2">
    <h5 class="mb0 mt1 no-account">Don't have an Account?</h5>
    <router-link class="button is-secondary mt0 is-fullwidth" :to="signupUrl">Sign up</router-link>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import emitter from '../emitter';

@Component
export default class Login extends Vue {
  nic = '';

  error = '';

  password = '';

  challenge = '';

  signupUrl = `/signup/enter-cnic/?login_challenge=${this.$route.query.login_challenge}`;

  type = 'password';

  mounted() {
    this.challenge = (this.$route.query.login_challenge as string);
    console.log('got challenge', this.challenge);
    if (!this.challenge) {
      this.$router.push({ name: 'Home' });
    }
  }

  showPassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  async doLogin(e: any) {
    e.preventDefault();
    this.error = '';
    try {
      console.log('doing login');
      const body = {
        nic: this.nic,
        password: this.password,
        login_challenge: this.challenge,
      };
      localStorage.setItem('user', JSON.stringify({ nic: this.nic }));
      const response: any = await axios.post(`${process.env.VUE_APP_PEHCHAN_API_URL}/loginn`, body);
      if (response.data?.redirect_to) {
        emitter.emit('loading', true);
        window.location = response.data.redirect_to;
      } else {
        this.error = 'Incorrect NIC or password';
      }
    } catch (err) {
      console.log('got login error', err);
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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
.no-account {
  color: black;
  font-weight: 450;
  font-size: 1.1rem;
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
</style>
