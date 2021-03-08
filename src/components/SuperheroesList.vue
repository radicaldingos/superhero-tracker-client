<template>
  <div>
    <span class="help is-info" v-if="isLoading">Chargement...</span>
    <table class="table" v-else>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Date de naissance</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="superhero in superheroes">
        <tr v-bind:key="superhero.id">
          <td>{{ superhero.id }}</td>
          <td>{{ superhero.name }}</td>
          <td>{{ superhero.birth | moment("DD/MM/YYYY") }}</td>
          <td>
            <button class="button is-primary" v-bind:class="{ 'is-loading' : isDeleting(superhero.id) }" @click="deleteSuperhero(superhero.id)">Delete</button>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <superhero-form @completed="addSuperhero"></superhero-form>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import SuperheroForm from './SuperheroForm.vue'
import { API_BASE_URL } from '../config'

export default {
  components: {
    SuperheroForm
  },
  data() {
    return {
      superheroes: {},
      isLoading: true,
      countUpdatingTable: []
    }
  },
  async created () {
    try {
      const response = await axios.get(API_BASE_URL + '/superheroes')
      this.superheroes = response.data
      this.isLoading = false
    } catch(e) {
      // handle authentication error here
    }
  },
  methods: {
    onSubmit(superhero) {
      Vue.set(this.countUpdatingTable, superhero.id, true)
      this.increaseCount(superhero)
    },
    async increaseCount(superhero) {
      axios.post(API_BASE_URL + '/superheroes/' + superhero.id + '/count')
          .then(response => {
            superhero.count = response.data.count
            this.countUpdatingTable[superhero.id] = false
          })
          .catch(() => {
            this.countUpdatingTable[superhero.id] = false
          })
    },
    isCountUpdating(id) {
      return this.countUpdatingTable[id]
    },
    addSuperhero(superhero) {
      this.superheroes.push(superhero)
    },
    isDeleting(id) {
      let index = this.superheroes.findIndex(superhero => superhero.id === id)
      return this.superheroes[index].isDeleting
    },
    async deleteSuperhero(id) {
      let index = this.superheroes.findIndex(superhero => superhero.id === id)
      Vue.set(this.superheroes[index], 'isDeleting', true)
      await axios.delete(API_BASE_URL + '/superheroes/' + id)
      this.superheroes.splice(index, 1)
    }
  }
}
</script>