
export const state = () => ({
    counter: 0,
    slug_course: "",
    slug_course_proffesor: "",
    // Esta es la informacion de usuario que se va a guardar temporalmente hasta que se inicie session
    UserInfo: {
        username: "",
        email: "",
        fullname: "",
      },
    drawer: false,

    // cantidad de cursos que desea comprar 
    cart: {
      courses: [],
    },
  })
  
export const mutations = {
    increment(state) {
      state.counter++
    },
    setSlugProffesor(state,slug) {
      state.slug_course_proffesor = slug;
    },

    setSlug(state,slug) {
      state.slug_course = slug;
    },

    removeSlugProffesor(state) {state.slug_course_proffesor = '';},
    removeSlug(state) { state.slug_course = ''; },



    // Establecemos los valores 
    setUserInfo(state,username,email,fullname) {
        state.UserInfo.username = username;
        state.UserInfo.email = email;
        state.UserInfo.fullname = fullname;
    },
    // necesitamos una funcion para borrar los campos



    // funcion para devolver los cart
    initializeStoreCart(state) {
      if(localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'));
      }else {
        localStorage.setItem('cart',JSON.stringify(state.cart));
      }
    },

    addToCart(state,course) {
      console.log(course);
      if(course) {
        const exist = state.cart.courses.filter(i => i.id === course.id);
        if(exist.length == 0) {
          state.cart.courses.push(course);
        }
        localStorage.setItem('cart',JSON.stringify(state.cart));
      }
    },
    removeToCart(state,course){
      const exist = state.cart.courses.filter(i => i.id != course.id);
      state.cart.courses = exist
    }

}

