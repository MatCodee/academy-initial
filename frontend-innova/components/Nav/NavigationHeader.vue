<template>
<div class="container-md">
    <div class="container-head">
        <div class="container-ul">
            <span class="title-head">LixFux</span>
            <li>Cursos</li>
            <li>Nuestros PLanes</li>
        </div>
        <div class="container-btn-nav">
            <button @click="dialog_login=!dialog_login" class="button-font-nav button-m-nav mr-4">Iniciar Sesion</button>
            <button @click="dialog_register=!dialog_register" class="button-font-nav button-s-nav">Registrarse</button>
        </div>
    </div>

        <!--Este es el dialog de login-->
    <v-dialog
          v-model="dialog_login"
          width="500px"
        >
            <v-card class="px-6 py-12">
              <v-card-text>
                <p> Otras formas de iniciar sesion </p>
                <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google button" />
                    </div>
                    <p class="btn-text"><b>Ingresar con google</b></p>
                </div>
              </v-card-text>
              <v-card-text>
                <v-text-field
                  label="Nombre de Usuario"
                  v-model="uname"
                  placeholder="Enter username"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  placeholder="Enter password"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>


                <div class="mt-10 d-flex justify-center">
                  <button class="button-font-nav button-m-nav"  @click="submitFormLogin()">Acceder</button>
                </div>
             
              </v-card-text>
            
           
            </v-card>
        </v-dialog>



          <v-dialog
          v-model="dialog_register"
          width="500px"
        >
            <v-card class="px-6 py-12">

              <v-card-text>
                <p> Otras formas de iniciar sesion </p>
                <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="google button" />
                    </div>
                    <p class="btn-text"><b>Ingresar con google</b></p>
                </div>
              </v-card-text>

              <v-card-text>
         
                <v-text-field
                  label="Nombre"
                  v-model="UserInfo.uname"
                  placeholder="Registre su nombre de Usuario"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  type="email"
                  v-model="UserInfo.email"
                  placeholder="Email address"
                ></v-text-field>
                 
                <v-text-field
                  v-model="UserInfo.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  placeholder="Registre la contraseña"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  v-model="UserInfo.cpassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Confirmacion de Contraseña"
                  placeholder="Registre la confirmacion de la contraseña"
                  counter
                  @click:append="show2 = !show2"
                ></v-text-field>
                <v-checkbox
                  v-model="checkbox2"
                  class="mt-2"
                  label="Remember me"
                  hide-details
                ></v-checkbox>

                <div class="mt-10 d-flex justify-center">
                  <button class="button-font-nav button-m-nav" v-on:click="submitFormRegister()">Acceder</button>
                </div>
          
              </v-card-text>
            </v-card>
        </v-dialog>
  </div>
</template>

<script>
import {path} from "@/api/conf_api";
export default {
  data() {
    return {
      uname: "",
      password: "",

      dialog_login: false,
      dialog_register:false,


     UserInfo: {
        uname: "",
        email: "",
        password: "",
        cpassword: "",
      },

      show1: false,
      show2: false,
      checkbox2: false,
      confirmation: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
 methods: {
    toggleClass: function (event) {
      this.isActive = !this.isActive;
    },
    resetFieldLogin() {
      this.uname      = '';
      this.password   = '';
    },

    async submitFormLogin() {
      if(this.uname == '' || this.password == ''){
        console.log("Error los campos deben estar completos");
      }else {
        
        let path_new = path + '/api/v1/token/login';
        
        let formData = {
          username: this.uname,
          password: this.password
        };
        
        await this.$axios
          .post(path_new,formData)
          .then((result) => {

              const token = result.data.auth_token;

              // autorizacion para backend django
              this.$axios.defaults.headers.common["Authorization"] = "Token " + token;

              // guardamos la informacion de localStorage
              localStorage.setItem("token", token);
              localStorage.setItem("isAuthenticate", true);

              // despues va a dirigir a una ventana de informacion de la persona
              this.$router.push('panel/activity');                        
          }).catch((err) => {
            console.log("error encontrado: ",err);
          });
      }
    },




    async submitForm() {
        let path_new = path + '/api/v1/token/login';       
        let formData = {
          username: this.UserInfo.uname,
          password: this.UserInfo.password,
        };
        await this.$axios
          .post(path_new ,formData)
          .then((result) => {
              
              const token = result.data.auth_token;
              // autorizacion para backend django
              this.$axios.defaults.headers.common["Authorization"] = "Token " + token;

              // guardamos la informacion de localStorage
              localStorage.setItem("token", token);
              localStorage.setItem("isAuthenticate", true);
              
              // despues va a dirigir a una ventana de informacion de la persona
              this.$router.push('panel/activity');            

          }).catch((err) => {
            console.log("error encontrado: ",err);
          });
      },

    async submitFormRegister() {
      if(this.UserInfo.uname == '' || this.UserInfo.password == '' || 
            this.UserInfo.cpassword == '' || this.UserInfo.email == ''){
              
            // mostrar notificaciones de que los campos estan vacios
            
      }else if (this.UserInfo.password == this.UserInfo.cpassword){
        
        let path_new = path + '/api/v1/users/';
        let formData = {
          username: this.UserInfo.uname,
          password: this.UserInfo.password,
          email: this.UserInfo.email,
        };

        await this.$axios
          .post(path_new,formData)
          .then((result) => {
            console.log("Este entro");
            
            // enviamos la peticion para generar el token
            this.submitForm();

          }).catch((err) => {
            console.log("error encontrado: ",err);
          });
      }else {
        console.log("compruebe los campos");
      }
    },
  },
  mounted() {
    this.isAuthenticate = localStorage.getItem("isAuthenticate");
  },
}
</script>

<style lang="scss" scoped>

:root {
  /* google btn */
  --white: #fff;
  --google-blue: #4285f4;
  --button-active-blue: #1669f2;
}


.container-md {
  width: 80%;
  margin: 0 auto;
  background-color: transparent;
  max-width: 1854px;
}
.container-head {
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;    
    overflow-x: hidden;
}
.container-ul {
    z-index: 2;
    align-items: center;
    display: flex;
    .title-head {
        z-index: 2;
        font-size: 25px;
        font-weight: 500;
        color: #ffff;
        margin-right: 30px;
    }
    li {
        margin-right: 5px;
        list-style: none;
        cursor: pointer;
        padding: 5px 5px;
        color: rgb(255, 255, 255);
        transition: color .35s ease-in-out;
    }
    li:hover  {
        color: rgb(237, 237, 237);
    }
}


.container-btn-nav {
    z-index: 2;
    display: flex;
    a {
        margin-right: 10px;
        color: rgb(255, 255, 255);
    }
}

.btn-nav a{
    color: rgb(0, 0, 0);
}




.button-m-nav:hover {
    background-color: #7a60f0;
}

.button-m-nav {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    background-color: #5631eb; 
    transition: background-color .35s ease-in-out,color .15s ease-in-out,border .15s ease-in-out;
    height: 38px;
    padding-left: 40px;
    padding-right: 40px;
    border-radius: 5px;
    color: #ffff;
}

.button-s-nav {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    background-color: transparent; 
    transition: background-color .35s ease-in-out,color .15s ease-in-out,border .15s ease-in-out;
    height: 38px;
    padding-left: 30px;
    padding-right: 30px;
    border: solid 2px rgb(0, 0, 0);
    border-radius: 5px;
}

.button-font-nav {
  text-decoration: none;
  font-family: Gilroy,SF Pro Display,-apple-system,BlinkMacSystemFont,Roboto,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: .4px;
}


@media (max-width: 972px) {
    .container-ul {
        display: none;
    }
    .container-btn-nav {
        display: none;
    }
}






.google-btn {
    cursor: pointer;
    margin-top: 5px;
    width: 100%;
    height: 52px;

    border-radius: 5px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
    transition: box-shadow .3s ease;
}

.google-btn .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: var(--white);
}

.google-btn .google-icon {
    position: absolute;
    margin-top: 15px;
    margin-left: 101px;
    width: 18px;
    height: 18px;
}

.google-btn .btn-text {
    color: rgb(0, 0, 0);
    font-size: 15px;
    letter-spacing: 0.2px;
    position: absolute;
    margin-top: 15px;
    margin-left: 151px;
    width: 208px;
    height: 18px;
}



</style>
