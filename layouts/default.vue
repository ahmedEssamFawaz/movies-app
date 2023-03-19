<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title>Movie app</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <div class="ma-auto">This task is developed by Ahmed Essam</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
