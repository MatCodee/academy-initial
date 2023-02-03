<template>
  <div class="mb-16">
    <v-app-bar absolute color="primary" class="py-0 app-bar-layout" elevation="0">


      <p class="text-h6 mt-5 white--text content-hide">{{ course.title }}</p>
       <v-spacer></v-spacer>
      <v-form action="/search" class="form-box" method="get">
        <v-text-field
          class="mt-7 size-text-field"
          outlined
          label="Buscar cualquier cosa"
          background-color="white"
          clearable
          solo
          type="text"
          rounded
          dense
          name="query"
        >
          <template v-slot:append>
            <v-icon color="primary"> mdi mdi-feature-search-outline </v-icon>
          </template>
        </v-text-field>
      </v-form>
      <v-btn rounded color="white" dark to="/panel/mycourses" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <!--
         <app-bar-user-menu></app-bar-user-menu>
        -->
    </v-app-bar>

    <v-navigation-drawer
      class="margin-element-drawer"
      absolute
      app
      hide-overlay
      height="100%"
      right
      v-model="notDrawer"
      width="23%"
    >
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
            @click="getVideo(item)"
          >
            <v-list-item-action>
              <v-checkbox color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.resumen"
              ></v-list-item-subtitle>
            </v-list-item-content>
          
          </v-list-item>
          
        </v-list-group>
         <v-divider />
      </v-list>
    </v-navigation-drawer>

    <div class="margin-content desing-video" v-if="course_select">
      <video
        class="content-video"
        @ended="finalVideo"
        controls
        :src="course_select.video"
      ></video>
    </div>


    <div class="margin-content-badge list-down-hide">
      <v-list class="margin-center-element">
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
            @click="getVideo(item)"
          >
            <v-list-item-action>
              <v-checkbox color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.resumen"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>

    <div class="margin-content-badge mt-10">
      <div class="margin-center-element">
        <h2>Acerca de este curso</h2>
        <p>{{ course.subtitle }}</p>
        <p>{{ course.description }}</p>
      </div>
    </div>

    <v-divider />
    <div class="margin-content-badge">
      <div class="margin-center-element ">
        <h3 class="my-5 user-title">Deja un comentario</h3>
        <v-textarea
          height="100"
          outlined
          class="textarea-style"
          name="input-7-4"
          label="Outlined textarea"
          v-model="message_foro"
        ></v-textarea>
        <button @click="add_foro" class="float-right button-font button-m btn-w">Comentar</button>
      </div>

      <h3 class="margin-center-element my-5">Comentarios de estudiantes</h3>
      <div class="mt-2" v-for="(f, index) in foro" :key="index">
        <div class="content-user margin-center-element">
          <v-avatar>
            <img :src="f.user.image_user" alt="" />
          </v-avatar>
          <div class="content-body">
            <div class="title-content-foro">
              <h5 class="user-title">{{ f.user.username }}</h5> 
              <p>{{relativeDate(f.date_created)}}</p>
            </div>

            <p class="user-message">{{ f.message }}</p>
            <p class="user-question">¿Te sirvio el comentario?</p>

            <v-btn class="mx-2" fab dark icon small color="primary">
              <v-icon dark> mdi-thumb-up-outline </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark icon small color="primary">
              <v-icon dark> mdi-thumb-down-outline </v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { path } from "@/api/conf_api";
import {date_element,relativeDate} from "@/utilities/time_function";

export default {
  layout: "LayoutDetail",
  components: {
    /*
        AppBarUserMenu: () => import("@/components/ComponentsPanel/AppBarUserMenu")
        */
  },
  data() {
    return {
      foro: [],
      message_foro: "",

      vista_select: 2,
      checkbox: true,
      notDrawer: true,
      course: [],
      ite: 0,
      settings: [],
      course_select: null,

      interval: {},
      value: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    date_element:date_element,
    relativeDate:relativeDate,    

    change_tab(number) {
      this.vista_select = number;
    },
    finalVideo() {
      // cuando el video finalice guardare en la data de historial donde a cada historial le corresponde un curso
      let clase_data = this.course_select;
      console.log(clase_data);
    },
    // Esta es la funcion que se encarga de detectar cuando se termina el video
    myHandler() {
      let aud = document.getElementById("myAudio");
      aud.onended = function () {
        alert("The audio has ended");
      };
    },
    async initial_content() {
      // qui debemos cargar el estado en el que quedo el video
      this.course_select = this.course.course_data[0];
      console.log("paso por aqui");
    },
    getVideo(item) {
      this.course_select = item;
    },
    async add_foro() {
      let token = localStorage.getItem("token");
      let formForo = {
        user: parseInt(localStorage.getItem("user_id")),
        course: this.course.id,
        message: this.message_foro,
      }
      await this.$axios
        .request({
          method: "post",
          headers: { Authorization: "Token " + token },
          baseURL: path + `/courses/add_foro_course/`,
          data: formForo,
        })
        .then((response) => {
          console.log("agregado con exito");
        })
        .catch((error) => {
          console.log(error);
        });

    },
    async get_foro() {
      let slug = this.$store.state.slug_course;
      let token = localStorage.getItem("token");
      await this.$axios
        .request({
          method: "get",
          headers: { Authorization: "Token " + token },
          baseURL: path + `/courses/get_foro_course/${slug}`,
        })
        .then((response) => {
          this.foro = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getCourse() {
      //let slug = "1-curso-fundamentos-de-c"
      let slug = this.$store.state.slug_course;
      let token = localStorage.getItem("token");
      await this.$axios
        .request({
          method: "get",
          headers: { Authorization: "Token " + token },
          baseURL: path + `/courses/detail-course/${slug}`,
        })
        .then((response) => {
          this.course = response.data;
          console.log(this.course);
          this.initial_content();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCourse();
    this.get_foro();

    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>

.app-bar-layout {
  z-index: 100;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
}
.margin-content {
  margin-top: 64px;
  width: 77%;
}
.desing-video {
    background-color: rgb(0, 0, 0);
}
.content-video {
  width: 100%;
  height: 75vh;
}

.v-progress-circular {
  margin: 1rem;
}

/* debemos hacer response el video que se esta reproduciendo */

.form-x {
  width: 400px;
}
.margin-content-badge {
  width: 77%;
  margin-bottom: 50px;
}

.list-down-hide {
  display: none;
}
//1212
@media (max-width: 1212px) {
  .content-hide {
    display: none;
  }
  .margin-element-drawer  {
    display: none;
  }

  .list-down-hide {
    display: block;
  }

  .margin-center-element {
    margin: 0 20px;
  }

}

.margin-center-element {
  margin: 0 50px;
}


@media (max-width: 1252px) {
  .margin-content {
    margin-top: 56px;
    width: 100%;
  }
  .form-x {
    width: 100%;
    margin-right: 50px;
  }
  .margin-content-badge {
    width: 100%;
    margin-bottom: 50px;
  }
  .margin-center-element {
    margin: 0 15px;
  }
}
.badge-color {
  color: black;
}

.content-user {
  display: flex;
  align-items: flex-start;
}
.content-body {
  margin-left: 15px;
}

.form-box {
  max-width: 700px;
  width: 100%;
}

.margin-element-drawer {
  margin-top: 58px;
}

.user-title {
  font-size: 18px;
  font-weight: 700;
  color: rgb(0, 0, 0);
}

.user-message {
}

.user-question {
  font-size: 13px;
}

.button-m {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background-color: #5631eb;
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

.textarea-style {
  border-radius: 16px;
}

.title-content-foro {
  display: flex;
  align-items: baseline;
  margin-bottom: -15px;
}
.title-content-foro h5 {
  margin-right: 10px;
} 


</style>