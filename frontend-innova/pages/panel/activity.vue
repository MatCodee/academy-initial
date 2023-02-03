<template>
  <div class="container-md pt-10">
    <h2 class="ml-5">Hola, Matías. ¡Te damos la bienvenida a LixFux!</h2>

    <v-card class="shadow-card content-card mt-2" rounded="xl">
      <v-list three-line>
        <v-list-item-group v-model="selectedItem" color="primary">
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-card class="shadow-card my-10" rounded="xl">
      <div class="content-foro-element">
        <h3>Acceder al foro de la plataforma</h3>
        <div class="container-element-button">
          <button  class="button-font button-m btn-w">
            Foro
          </button>
        </div>
      </div>
    </v-card>

    <h2 class="ml-5">Nuevos cursos!</h2>
    <v-row class="mb-5">
      <v-col
        sm="12"
        md="4"
        lg="4"
        xl="4"
        v-for="course in courses"
        :key="course.id"
      >
        <v-card class="layout-card" rounded="lg">
          <v-img
            :src="course.get_image"
            @click="detail_course(course.slug)"
            class="detail-img-desing"
          ></v-img>
          <div class="padd-content-card">
            <v-card-title class="title-text-card">
              {{ course.title.substring(0, 24) }}
            </v-card-title>

            <v-card-subtitle class="subtitle-text-card">
              Por Cecilia Hugony
            </v-card-subtitle>

            <v-card-actions class="button-content-page">
              <v-btn class="mr-1" color="primary">
                <v-icon>mdi-cart-minus</v-icon>
              </v-btn>
              <div class="container-element-btn">
                <button
                  @click="detail_course(course.slug)"
                  class="layout-btn button-font button-m"
                >
                  Inscribite ahora
                </button>
              </div>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import { path } from "@/api/conf_api";
export default {
  layout: "LayoutPanel",
  data() {
    return {
      courses: [],
      selectedItem: 0,
      items: [
        { header: "Tareas pendientes: " },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      let token = localStorage.getItem("token");
      await this.$axios
        .request({
          method: "get",
          headers: { Authorization: "Token " + token },
          baseURL: path + `/courses/courses-list/`,
        })
        .then((response) => {
          this.courses = response.data;
        })
        .catch(function (error) {
          console.log("error encontrado: " + error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-md {
  width: 80%;
  margin: 0 auto;
}

@media screen and (max-width: 800px) {
  .container-md {
    width: 98%;
    margin: 0 auto;
  }
}

.shadow-card {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
}

.content-card {
  height: 400px;
  overflow-y: auto;
}

/* botones estilos */
.button-m {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background-color: #0D47A1;
  transition: background-color 0.35s ease-in-out, color 0.15s ease-in-out,
    border 0.15s ease-in-out;
  height: 48px;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 5px;
  color: #fff;
}

.button-font {
  text-decoration: none;
  font-family: Gilroy, SF Pro Display, -apple-system, BlinkMacSystemFont, Roboto,
    Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.4px;
}

.btn-w {
  max-width: 183px;
}

/* estilos del link del foro*/
.card-foro {
  width: 100%;
  height: 200px;
}

.content-foro-element {
  padding: 20px 50px;
  width: 100%;
}
.container-element-button {
  display: flex;
  justify-content: center;
  margin: 5px 0;
}
.content-foro-element h3 {
  text-align: center;
}
</style>