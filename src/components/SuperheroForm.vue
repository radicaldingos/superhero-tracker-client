<template>
  <form @submit.prevent="onSubmit">
    <span class="help is-danger" v-text="errors"></span>

    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Nom" v-model="name" @keydown="errors = ''">
      </div>
    </div>

    <button class="button is-primary" v-bind:class="{ 'is-loading' : isLoading }">Ajouter ce super-héros</button>
  </form>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '../config'

export default {
  data() {
    return {
      name: '',
      errors: '',
      isLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.isLoading = true
      this.postSuperhero()
    },
    async postSuperhero() {
      axios.post(API_BASE_URL + '/superheroes', this.$data)
          .then(response => {
            this.name = ''
            this.isLoading = false
            this.$emit('completed', response.data)
          })
          .catch(error => {
            this.errors = error.response.data.errors
            this.isLoading = false
          })
    }
  }
}
</script>