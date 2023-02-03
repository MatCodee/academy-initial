<template>
    <v-container class="margin-content container-md ">
        <h1> Carrito de compras </h1>

        <v-row>
            <v-col md="8">
                <div class="content-course-cart">
                <p>Tienes {{cart.courses.length}} items en tu carrito</p>
                <div class="courses-cart my-3" v-for="course,index in cart.courses" :key="index">
                    <figure>
                        <img :src="course.get_image" class="img-dim-container" alt="">
                    </figure>
                    <div class="course-description ml-5">
                        <div>
                            <h3 class="mb-2">{{course.title}}</h3>
                            <p><span class="price-total">CL${{course.price}}</span></p>
                        </div>
                        <div>
                            <v-btn icon color="primary" @click="delete_course_to_cart(course)">
                                <v-icon>
                                    mdi-delete
                                </v-icon>
                            </v-btn>
                        </div>

                    </div>
                </div>
                 <v-divider />
                </div>

            </v-col>
            <v-col md="4">
                <div class="buy-cart">
                    <h3 class="title-buy">Resumen</h3>
                    
                    <div class="buy-pay-cart mt-4">
                        <p class="text-buy-pay">subtotal</p>
                        <p> <span class="cl-text">CL</span> <span class="value-price">{{get_total_price_course()}}</span></p>
                    </div>
                    <v-divider />

                    <div class="buy-pay-cart mt-4">
                    <p class="text-buy-pay">Decuentos aplicados</p>
                    <p> <span class="cl-text">CL</span> <span class="value-price">0</span></p>
                    </div>
                    <v-divider />

                    <div class="buy-pay-cart mt-4">
                        <p class="text-buy-pay">Total a pagar</p>
                        <p> <span class="price-total ">CL</span> <span class="price-total ">{{get_total_price_course()}}</span></p>
                    </div>
                     <button class="float-right button-font button-m btn-w mb-10">Comprar</button>
                </div>  
            </v-col>
        </v-row>
        <p class="mt-6 text-buy-pay">compra por los medios de pagos disponibles</p>
        <figure>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynVukRmh6iqB-7owJPRHz8GQHNxfU4SEtnt4u8RYdIFeaW4PUfwjb-JFv5zdQ6hSU5Q&usqp=CAU" alt="">
        </figure>
    </v-container>
</template>

<script>
export default {
    layout: "LayoutPanel",
    data() {
        return {
            cart: {
                courses:[]
            },
            course_size: 0,
        }
    },
    mounted() {
        /*
        this.cart = this.$store.state.cart;
        if (this.$stripe) {
            const elements = this.$stripe.elements();
            const card = elements.create('card', {});
            // Add an instance of the card Element into the `card-element` <div>
            card.mount('#card-element');
        }
        */
    },

    methods: {
        
        get_total_price_course() {
            let price = 0
            for(let i=0;i<this.cart.courses.length;i++){
                price += this.cart.courses[i].price;
            }
            return price
        },
        delete_course_to_cart(course){
            this.$store.commit('removeToCart',course);
        }
    }
}
</script>


<style lang="scss" scoped>
.container-md {
    width: 80%;
    margin: 0 auto;
}
.margin-content {
  margin-top: 30px;
}

.courses-cart {
    display: flex;
}

.buy-cart {
    padding: 60px;
    position: relative;
    width: 100%;
    height: 360px;
    border-radius: 10px;
    background-color: rgb(249, 248, 255);
}

.buy-pay-cart {
    display: flex;
    justify-content: space-between;
}

.title-buy {
    font-family: Gilroy, "SF Pro Display", -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;

    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
}

.text-buy-pay {
    font-family: Gilroy, "SF Pro Display", -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;

    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
}
.cl-text {
    font-family: Gilroy, "SF Pro Display", -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
}

.value-price {
    font-family: Gilroy, "SF Pro Display", -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
}


.price-total {
    font-family: Gilroy, "SF Pro Display", -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: #e6215d;
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

.content-course-cart {
    height: 400px;
    overflow-y: auto;
}

.img-dim-container {
    width: 150px;
    height: 150px;
    object-fit: cover;
    object-position: center;
}

.course-description {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>

