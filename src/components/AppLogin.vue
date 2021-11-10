<template>
  <form
      id="login"
      @submit.prevent="submit"
      class="form"
  >
    <input
        v-model="login"
        type="text"
        name="login"
    />

    <input
        v-model="password"
        type="password"
        name="login"
    />

    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  name: "AppLogin",
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
   async submit() {
      try {
        const credentials = {
          Contract: this.login,
          Password: this.password,
        };
        const loginData = await this.$api.auth.login(credentials);
        if (loginData?.Model.Token) {
          this.$api.auth.setAuthHeader();
          this.$jwt.saveToken(loginData.token);
        }
      } catch (e) {
        new Error(e);
      }
    }
  },
}
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 200px;
  }
</style>
