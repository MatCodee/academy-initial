<template>
    <div class="margin-content container">
      <h1> Configuracion </h1>

        <p>Resumen</p>
        <v-textarea
          solo
          name="input-7-4"
          v-model="resumen"
          label="Solo textarea"
          class="mt-10"
        ></v-textarea>

        <p>Descripcion</p>
        <v-textarea
          solo
          v-model="description"
          name="input-7-4"
          label="Solo textarea"
          class="mt-10"
        ></v-textarea>
        <v-btn color="primary" @click="updateProffesor" dark>
          Terminar
       </v-btn>
    </div>
</template>

<script>
import {path} from "@/api/conf_api";
export default {
  layout: "LayoutPanelProffesor",
  data() {
    return  {
      resumen: '',
      description: '',
    }
  },
  methods: {
    async updateProffesor(){
            // comprobacion de los campos directamente en la funcion
            let path = 'http://127.0.0.1:8000/account/update_proffesor/';   
            
            let formData = {
                'resumen': this.resumen,
                'description': this.description,
            }
            console.log(formData);
            await this.$axios
              .put(path,formData)
              .then((result) => {
                  console.log(result.data);                      
              }).catch((err) => {
                console.log("error encontrado: ",err);
              });
          } 
  },
  computed: {
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.margin-content {
  margin-top: 60px;
}
</style>
