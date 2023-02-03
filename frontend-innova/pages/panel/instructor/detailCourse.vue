<template>
  <div class="margin-content">
    <v-toolbar class="gg">
      <v-tabs dark background-color="primary" grow>
        <v-tab @click="change_tab(1)">
          <v-badge color="pink" dot> Editar el Curso </v-badge>
        </v-tab>

        <v-tab @click="change_tab(2)">
          <v-badge color="green" content="6"> Editar las Clases </v-badge>
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <!-- Esta es la opcion 1-->
    <div class="container-md" v-if="vista_select == 1">
        <v-row>
          <v-col md="7">
            <h2 class="mb-2">Informacion del Curso</h2>
            <p>Titulo</p>
            <v-text-field
              label="Titulo"
              v-model="request_data.title"
              solo
            ></v-text-field>
            <p>Subtitulo</p>
            <v-text-field
              label="Subtitulo"
              v-model="request_data.subtitle"
              solo
            ></v-text-field>

            <p>Descripcion</p>
            <v-textarea
              solo
              name="input-7-4"
              v-model="request_data.description"
              label="Descripcion del curso"
            ></v-textarea>

            <v-row>
              <v-col class="d-flex" cols="6" sm="4">
                <v-select
                  :items="nivel"
                  label="Nivel"
                  v-model="request_data.level"
                  solo
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="6" sm="4">
                <v-select
                  :items="categoria"
                  label="Categoria"
                  solo
                  v-model="request_data.category"
                ></v-select>
              </v-col>

              <v-col class="d-flex" cols="6" sm="4">
                <v-select
                  :items="tipo_producto"
                  label="Tipo de producto"
                  solo
                  v-model="request_data.tipo_producto"
                ></v-select>
              </v-col>
            </v-row>

            <p>Precio:</p>
            <v-text-field
              label="Solo"
              v-model="request_data.price"
              solo
            ></v-text-field>
            <v-btn rounded color="primary" @click="updateProffesorCourse" dark>
              Actualizar
            </v-btn>
          </v-col>
          <v-col md="5">
            <v-card class="mb-16 mt-16 pa-16">
              <p class="mb-5">Imagen del Curso</p>
              <div class="mb-16">
                <img
                  :src="img_course_get"
                  width="100%"
                  alt="portfolio"
                  class="portfolio-img"
                />
              </div>

              <div style="min-height: 4px">
                <v-progress-linear
                  v-model="value"
                  :active="show"
                  :indeterminate="query"
                  :query="true"
                ></v-progress-linear>
              </div>
              <input
                type="file"
                class="mt-5 mb-13"
                @change="previewFiles"
                multiple
              />
              <v-btn block color="primary" @click="updateImage" dark>
                Actualizar Imagen
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
    </div>

    <!--Esta es la opcion 2-->

    <div class="container-md" v-if="vista_select == 2">
      <div class="margin-xl">
        <v-card class="max-auto pa-10 mb-16">
          <v-card-text>
            <v-row>
              <v-col>
                <div class="d-flex justify-star">
                  <p>Clases del Curso</p>
                </div>
              </v-col>
              <v-col>
                <div class="d-flex justify-end">
                  <v-btn color="primary" rounded @click="dialog = !dialog">
                    Crear una Clase
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!--Este es el dialog para crear un nuevo curso  -->
        <v-dialog v-model="dialog" width="70%">
          <v-card class="pa-16">
            <v-row>
              <v-col md="7">
                <h2 class="mb-2">Creacion de una Clase</h2>
                <p>Titulo</p>
                <v-text-field
                  label="Titulo"
                  v-model="form_class.title"
                  solo
                ></v-text-field>
                <p>Resumen de la Clase (opcional)</p>
                <v-textarea
                  solo
                  v-model="form_class.resumen"
                  name="input-7-4"
                  label="Solo textarea"
                  class="mt-10"
                ></v-textarea>

                <div class="mb-16">
                  <p>Seleccione un Documento (opcional)</p>
                </div>

                <div style="min-height: 4px">
                  <v-progress-linear
                    v-model="value"
                    :active="show"
                    :indeterminate="query"
                    :query="true"
                  ></v-progress-linear>
                </div>
                <input
                  type="file"
                  @change="documentFile"
                  class="mt-5 mb-13"
                  multiple
                />
              </v-col>
              <v-col md="5">
                <div class="mb-16">
                  <div class="desing-video" v-if="request_class">
                    <p>Video Actual de la clase</p>
                    <video
                      width="100%"
                      controls
                      :src="form_class.video"
                    ></video>
                  </div>
                </div>

                <div style="min-height: 4px">
                  <v-progress-linear
                    v-model="value"
                    :active="show"
                    :indeterminate="query"
                    :query="true"
                  ></v-progress-linear>
                </div>
                <input
                  type="file"
                  @change="videoFile"
                  class="mt-5 mb-13"
                  multiple
                />
                <v-btn block color="primary" @click="create_class" dark>
                  Crear la Clase
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <v-row>
          <v-col md="4">
            <h2 class="mb-12">Editar el curso y sus clases</h2>
            <v-list subheader two-line>
              <v-list-item
                v-for="class_data in request_data.course_data"
                :key="class_data.id"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="class_data.title"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="class_data.resumen"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    fab
                    dark
                    @click="edit_class(class_data)"
                    x-small
                    color="primary"
                  >
                    <v-icon dark> mdi-pencil </v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn
                    fab
                    dark
                    @click="dialog_delete(class_data)"
                    x-small
                    color="primary"
                  >
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col md="8">
            <h2 class="mb-2">Detalla de la Clase</h2>

            <div v-if="request_class">
              <p>Titulo</p>
              <v-text-field
                label="Titulo"
                v-model="request_class.title"
                solo
              ></v-text-field>

              <p>Resumen</p>
              <v-textarea
                solo
                v-model="request_class.resumen"
                name="input-7-4"
                label="Solo textarea"
                class="mt-10"
              ></v-textarea>

              <v-card class="mb-16 mt-16 pa-16">
                <div class="mb-16">
                  <div class="desing-video" v-if="request_class">
                    <p>Video Actual de la clase</p>
                    <video
                      width="100%"
                      controls
                      :src="request_class.video"
                    ></video>
                  </div>
                </div>

                <div style="min-height: 4px">
                  <v-progress-linear
                    v-model="value"
                    :active="show"
                    :indeterminate="query"
                    :query="true"
                  ></v-progress-linear>
                </div>
                <input type="file" class="mt-5 mb-13" multiple />
              </v-card>

              <v-card class="mb-16 mt-16 pa-16">
                <div class="mb-16">
                  <p>Seleccione un Documento</p>
                  <p>{{ request_class.document }}</p>
                </div>

                <div style="min-height: 4px">
                  <v-progress-linear
                    v-model="value"
                    :active="show"
                    :indeterminate="query"
                    :query="true"
                  ></v-progress-linear>
                </div>
                <input type="file" class="mt-5 mb-13" multiple />
              </v-card>
            </div>
            <v-btn color="primary" @click="updateProffesorClass" dark>
              Terminar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>

    <v-dialog v-model="delete_bol" max-width="400">
      <v-card class="mx-auto pa-12">
        <v-card-subtitle class=""> Eliminar la clase </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Estas seguro que quieres elminar la clase?</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="delete_class"> Eliminar </v-btn>

          <v-btn color="primary" text @click="delete_bol = !delete_bol">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {path} from "@/api/conf_api";
export default {
  layout: "LayoutPanelProffesor",
  data() {
    return {
      vista_select: 1,
      // propiedades del progress
      value: 0,
      query: false,
      show: true,
      interval: 0,

      img_course_get: null,

      nivel: ["Todos los niveles", "Basico", "Intermedio", "Avanzado"],
      categoria: [
        "Tegnologia",
        "Administracion",
        "Negocios",
        "Contabilidad",
        "Comunicacion",
      ],
      tipo_producto: ["Curso", "Programa Especializados"],

      id_author: "",
      request_data: {
        author: "",
        title: "",
        subtitle: "",
        description: "",
        level: "",
        category: "",
        tipo_producto: "",
        price: "",
        get_image: null,
      },
      request_data_img: {
        author: -1,
        img_course: null,
      },

      dialog: false,
      delete_bol: false,
      // consulta de la aplicacion actualizacion de la clase
      request_class: [],
      form_class: {
        title: "",
        resumen: "",
        course: "",
        video: null,
        document: null,
      },
    };
  },
  methods: {
    genRandomIndex(length) {
      return Math.ceil(Math.random() * (length - 1));
    },
    change_tab(number) {
      this.vista_select = number;
    },
    previewFiles(event) {
      this.request_data_img.img_course = event.target.files[0];
    },

    //funciones de actualizacion del cursod de profesor
    async updateImage() {
      let slug = this.$store.state.slug_course_proffesor;
      // comprobacion de los campos directamente en la funcion

      let token = localStorage.getItem("token");
      let df = new FormData();
      df.append("img_course", this.request_data_img.img_course);
      df.append("author", this.request_data_img.author);


      await this.$axios
          .request({
            method: "put",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/update_proffesor_course_img/${slug}`,
            data: df,
          })
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log("error encontrado: ", err);
        });
    },
    async updateProffesorCourse() {
      let slug = this.$store.state.slug_course_proffesor;
      // comprobacion de los campos directamente en la funcion

      let token = localStorage.getItem("token");
      let df = new FormData();

      df.append("title", this.request_data.title);

      df.append("subtitle", this.request_data.subtitle);
      df.append("description", this.request_data.description);
      df.append("level", this.request_data.level);

      df.append("category", this.request_data.category);
      df.append("tipo_producto", this.request_data.tipo_producto);
      df.append("price", this.request_data.price);
      df.append("author", this.id_author);

      await this.$axios
          .request({
            method: "put",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/update_proffesor_course/${slug}`,
            data: df,
          })
        .then((result) => {
          //console.log("Mostrando la informaicon de los cursos: ")
          //console.log(result.data);
          console.log(result.data);
        })
        .catch((err) => {
          console.log("error encontrado: ", err);
        });
    },

    // funciones de actualizacion de clase de profesor
    async updateProffesorClass() {
      let pk = this.request_class.id;
      // comprobacion de los campos directamente en la funcion


      let df = new FormData();
      if (this.form_class.video == null && this.form_class.document == null) {
        df.append("title", this.request_class.title);
        df.append("resumen", this.request_class.resumen);
        df.append("course", this.request_data.id);
      } else if (this.form_class.video == null) {
        df.append("title", this.request_class.title);
        df.append("resumen", this.request_class.resumen);
        df.append("course", this.request_data.id);
        df.append("video", this.request_class.video);
      } else if (his.form_class.document == null) {
        df.append("title", this.request_class.title);
        df.append("resumen", this.request_class.resumen);
        df.append("course", this.request_data.id);
        df.append("document", this.request_class.document);
      } else {
        df.append("video", this.request_class.video);
        df.append("document", this.request_class.document);
      }
      let token = localStorage.getItem("token");
      await this.$axios
          .request({
            method: "put",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/update_class/${pk}`,
            data: df,
          })
        .then((result) => {
          console.log("Actualizando la clase");
        })
        .catch((err) => {
          console.log("error encontrado: ", err);
        });
    },

    async getCourseProffesor() {
      // comprobacion de los campos directamente en la funcion
      let slug = this.$store.state.slug_course_proffesor;
      let token = localStorage.getItem("token");
      await this.$axios
          .request({
            method: "get",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/detail-course/${slug}`,
          })
        .then((result) => {
          this.img_course_get = result.data["get_image"];

          // obteniendo la ifnormacion del usuario
          this.request_data = result.data;
        })
        .catch((err) => {
          console.log("error encontrado: ", err);
        });
    },
    queryAndIndeterminate() {
      this.query = true;
      this.show = true;
      this.value = 0;

      setTimeout(() => {
        this.query = false;

        this.interval = setInterval(() => {
          if (this.value === 100) {
            clearInterval(this.interval);
            this.show = false;
            return setTimeout(this.queryAndIndeterminate, 2000);
          }
          this.value += 25;
        }, 1000);
      }, 2500);
    },

    documentFile(event) {
      this.form_class.document = event.target.files[0];
    },
    videoFile(event) {
      this.form_class.video = event.target.files[0];
    },
    dialog_delete(class_data) {
      this.delete_bol = !this.delete_bol;
      this.request_class = class_data;
    },
    // funciones de botones de clases
    edit_class(class_data) {
      this.request_class = class_data;
      console.log(this.request_class);
    },
    async create_class() {
      let df = new FormData();

      df.append("title", this.form_class.title);
      df.append("resumen", this.form_class.resumen);
      df.append("course", this.request_data.id);
      df.append("video", this.form_class.video);
      df.append("document", this.form_class.document);

      let token = localStorage.getItem("token");
      await this.$axios
          .request({
            method: "post",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/create-class/`,
            data: df,
          })
        .then((result) => {
          this.dialog = !this.dialog;
        })
        .catch((err) => {
          console.log("error encontrado: ", err);
        });
    },
    async delete_class(class_data) {
      if (class_data) {
        let pk = this.request_class.id;
        let token = localStorage.getItem("token");
        await this.$axios
          .request({
            method: "delete",
            headers: { Authorization: "Token " + token },
            baseURL: path + `/courses/delete-class/${pk}`,
          })
          .then((result) => {
            this.delete_bol = !this.delete_bol;
            //this.getCourseProffesor();
          })
          .catch((err) => {
            console.log("error encontrado: ", err);
          });
      }
    },
  },
  computed: {},
  mounted() {
    //TODO: en esta funcion estamos llamando a todos los metodos esto puede causar retraso optimizar cuando se tenga que optimizar
    this.queryAndIndeterminate();
    this.request_data.author = parseInt(localStorage.getItem("id_proffesor"));
    this.id_author = parseInt(localStorage.getItem("id_proffesor"));
    //console.log(typeof(this.request_data.author));
    console.log("id del author: ", this.request_data.author);
    this.request_data_img.author = parseInt(
      localStorage.getItem("id_proffesor")
    );
    this.getCourseProffesor();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.margin-content {

}

.container-md {
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
}


.portfolio-img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.gg {
  top: 60px;
  width: 100%;
  position: fixed;
  z-index: 1;
}
</style>
