<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >

    <v-img
      height="250"
      :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
    ></v-img>

    <v-card-title>{{movie.title}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="getAverageVotesBy5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          {{getAverageVotesBy5}} ({{ movie.vote_count }})
        </div>
      </v-row>

      
    </v-card-text>

   
    <v-card-text>
        Release Date : {{ formatDate(movie.release_date) }}
    </v-card-text>

  </v-card>
</template>

<script>
 export default {
     props:{
        movie:{
            type:Object
        }
     },
     computed:{
        getAverageVotesBy5(){
            return this.movie.vote_average * 0.5
        }
     },
     methods:{
        formatDate(dateString) {
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}-${month}-${year}`
    },
     }
 }
</script>

<style lang="scss" scoped>

</style>