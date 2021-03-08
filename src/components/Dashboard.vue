<template>
  <section class="section">
    <div class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu is-active buttons">
          <router-link to="/" tag="button" id='home-button' class="button is-link"> Accueil</router-link>
          <router-link to="/superheroes" v-if='authenticated' tag="button" class="button is-link"> Super-héros</router-link>
          <button class="button is-link" v-if='authenticated' v-on:click='logout' id='logout-button'> Déconnexion</button>
          <button v-else v-on:click='login' id='login-button' class="button is-link"> Connexion</button>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      authenticated: false
    }
  },
  created() {
    this.isAuthenticated()
  },
  watch: {
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = true
    },
    login() {

    },
    async logout() {
      await this.isAuthenticated()
      // Navigate back to home
      this.$router.push({path: '/'})
    }
  }
}
</script>