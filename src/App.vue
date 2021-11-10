<template>
  <div id="app">
    <app-category />
  </div>
</template>

<script>
import axios from 'axios';
import AppCategory from "@/components/AppCategory";

export default {
  name: 'App',
  components: {AppCategory},
  data() {
    return {
      example1: '',
      champions: [],
      champion: '',
      name: '',
      attack: 0,
      updatedChampion: {}
    }
  },
  methods: {
    async getLanguage() {
      try {
        const res = await axios.post('http://localhost:4000/graphql', {
          query: '{language}'
        });

        this.example1 = res.data.data.language;
      } catch (e) {
        console.error(e)
      }
    },

    async getChampions () {
      const res = await axios.post(
          '//localhost:4000/graphql', {
            query: `{
          getChampions {
            name
          }
        }`
          })
      this.champions = res.data.data
    },

    async getChampionByName () {
      const res = await axios.post('//localhost:4000/graphql', {
        query: `
      query GetChampionByName($championName: String!) {
        getChampionByName(name: $championName) {
          name
          attackDamage
        }
      }`,
        variables: {
          championName: 'Ashe'
        }
      })
      this.champion = res.data.data.getChampionByName
    },

    async updateAttackDamage () {
      const res = await axios.post('//localhost:4000/graphql', {
        query: `
        mutation UpdateAttackDamage(
          $championName: String!,  $attackDamage: Float) {
          updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
            name
            attackDamage
          }
        }`,
        variables: {
          championName: this.name,
          attackDamage: this.attack
        }
      })
      this.updatedChampion = res.data.data.updateAttackDamage
    }
  }
}
</script>

<style scoped>
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
