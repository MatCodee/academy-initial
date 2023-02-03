<template>
  <v-app dark>
    <div class="fondo">
    <NavigationHeader />
    <v-main class="container">
        <Nuxt />
    </v-main>
  </div>
  </v-app>
</template>

<script>
import NavigationHeader from "@/components/Nav/NavigationHeader";
export default {
  data() {
    return {

    };
  },
  components: {
    NavigationHeader
  }
}
</script>

<style lang="scss" scope>
.container {
  max-width: 1854px;
}
.fondo:before {
	content:'';
	position: absolute;
  top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0,0,0,0.1);
}

.fondo {
  background: url("../static/fondo3.jpg") no-repeat center center/cover;
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
