<template>
  <div class="margin-content container">
      <v-row v-if="course">
        <v-col md="8">
          
            <h2>{{course.title}}</h2>
            <p> {{course.subtitle }}</p>

            <div class="mb-16">
              <div v-if="info_user" class="content-user my-16">
                <figure>
                  <v-img class="dimension_image_user" src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </figure>
                
                  
              <p>Creado por  <span class="desing_info_user"> {{info_user.username}} </span> </p>

              </div>
              <div class="caracte_aditional">
                <p>fecha</p>
                <p>Espanol</p>
              </div>

            </div>

          <v-card class="mb-16">
            <div class="pa-16">
            <h3 class="mb-5">Descripcion </h3>
            <p>{{course.description}}</p>

            <h3 class="mt-5 mb-12"> Que aprenderas </h3>
            <v-row>
              <v-col> <p>Desarrollo Web </p></v-col>
              <v-col> <p> Lenguaje html,css, javascript y python </p></v-col>
            </v-row>
            <v-row>
              <v-col> <p> Django </p> </v-col>
              <v-col> <p>Programacion desde 0 </p></v-col>
            </v-row>
            <v-row>
              <v-col> <p>Crear paginas web full stack </p> </v-col>
            </v-row>
            </div>
          </v-card>

          <div class="my-10">
          <h3>Contenido del Curso </h3>
          <v-list>

              <v-list-group
                  :value="true"
                  prepend-icon="mdi-folder-account"
                  v-if="course.course_data"                
              >
                  <template v-slot:activator>
                  <v-list-item-title> Clases del Curso </v-list-item-title>
                  </template>

                  <v-list-item
                      v-for="item in course.course_data"
                      :key="item.id"
                      link
                  >
                      <v-list-item-action>
                      <v-checkbox
                          color="primary"
                      ></v-checkbox>
                      </v-list-item-action>
                      
                      <v-list-item-content>
                          <v-list-item-title v-html="item.title"></v-list-item-title>
                          <v-list-item-subtitle v-html="item.resumen"></v-list-item-subtitle>
                      </v-list-item-content>
                  </v-list-item>
              </v-list-group>
              </v-list>
          </div>

      
        </v-col>

        <v-col md="4">

          <figure>
            <img :src="course.get_image" class="dimension_image" alt="">
          </figure>
          <div class="my-4">
            <v-chip
              class="ma-2"
              color="primary"
            >
              {{course.level}}
            </v-chip>

            <v-chip
              class="ma-2"
              color="secondary"
            >
              {{course.tipo_producto}} 
            </v-chip>
          </div>
          <div class="pl-6">
            <h4 class="mb-4"> Este Curso Incluye </h4>
            <p>67 articulos </p> 
            <p> recursos </p>
            <p> ejercicios </p>
            <p> acceso movil </p>
            <v-btn color="primary" class="mb-4 mt-5"> Comprar </v-btn>
          </div>
           
        </v-col>
      </v-row>
     
      <h3>Cursos relacionados </h3>

  
            <v-row class="mt-2">
              <v-col
                lg="3"
                md="4"
                sm="6"
                xs="12"
                class="align-self-start"
                v-for="course in recomended_courses"
                :key="course.id"
              >
                <v-card class="portfolio-card overflow-hidden rounded-lg">
                  <div class="portfolio-img">
                    <img
                      :src="course.get_image"
                      alt="portfolio"
                      class="img-response-dim"
                      @click="detail_course(course.slug)"
                    />
                  </div>
                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="4.5"
                        color="#FBC02D"
                        dense
                        half-increments
                        readonly
                        size="16"
                        class="mr-3"
                      ></v-rating>

                      <div
                        v-if="course.price == 0"
                        class="my-4 text-subtitle-1"
                      >
                        <p class="text-h6 mt-4 black--text">Precio: Gratis $</p>
                      </div>
                      <div v-else class="my-4 text-subtitle-1">
                        <p class="text-h6 mt-4 black--text">
                          Precio: {{ course.price }} $
                        </p>
                      </div>
                    </v-row>

                    <div class="my-4 text-h6">
                      {{ course.title.substring(0, 25) + "..." }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
  </div>
</template>

<script>
//import axios from "axios";
import {path} from "@/api/conf_api";


export default {
  layout: "LayoutPanel",
  data() {
    return {
      course: {},
      recomended_courses: [],
      category_course: '',
      slug_course: '',
      info_user: {},
    }
  },
  methods: {
    async getCourse() {
      // traemos la informaicon del curso
      let slug = this.slug_course;
      let token = localStorage.getItem("token");
        await this.$axios.request({
            method: "get",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/detail_course_buy/${slug}`,
          })
        .then((response) => {
          this.course = response.data;
          this.category_course = response.data['category'];
          console.log(this.category_course);
          console.log(this.course);

          this.get_user()
          this.recomended_course();
        })
        .catch(function (error) {
          console.log("error encontrado: " + error);
        });
    },
    async recomended_course() {
      if(this.category_course) {
      let token = localStorage.getItem("token");
      let category = this.category_course;
        await this.$axios.request({
            method: "get",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/recomend_course_buy/${category}`,
          })
        .then((response) => {
          this.recomended_courses = response.data;
          console.log(this.recomended_courses)
        })
        .catch(function (error) {
          console.log("error encontrado: " + error);
        });
      }
    },
    select_recomended_course(course) {
      localStorage.setItem("slug_course",course.slug);
    },
    async get_user() {
      if(this.course) {
         let token = localStorage.getItem("token");
         await this.$axios.request({
            method: "get",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/account/get_user/${this.course.author}`,
          })
        .then((response) => {
          this.info_user = response.data;
          console.log(this.info_user);
        })
        .catch(function (error) {
          console.log("error encontrado: " + error);
        });
      }
    },
    detail_course(slug) {
      // guardamos el slug del curso
      // mandamos un push a detail course\
      localStorage.setItem("slug_course",slug);

      this.$router.push('detail-course'); 
    },
  },
  computed: {
  },
  mounted() {
    // llamamos el slug del curso
    this.slug_course = localStorage.getItem('slug_course');
    this.getCourse();
  },
};
</script>

<style lang="scss" scoped>
.margin-content {
  margin-top: 90px;
  width: 80%;
  margin: 0 auto;
}



.img-response-dim {
  height: 160px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}



@media (max-width: 575px) {
  .img-response-dim {
      height: 100%;
      width: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.portfolio-card {
  min-width: 260px;
}


.dimension_image {
  width: 400px;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}

.desing_info_user {
  color: rgb(64, 113, 219);
}

.dimension_image_user {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.content-user {
  display: flex;
  align-items: center;
}


.caracte_aditional {
  display: flex;
}
.caracte_aditional > p {
  margin-right: 20px;
}
</style>
