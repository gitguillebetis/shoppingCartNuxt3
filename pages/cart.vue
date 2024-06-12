<template> 
    <section class="h-100 gradient-custom">
        <div class="container py-5">
            <div class="row d-flex justify-content-center my-4">
                <div class="col-md-8">
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <div class="d-flex justify-content-between">
                                <h5 class="mb-0">Cart <span v-if="cart.length">({{cart.length}})</span></h5>
                                <button type="button" class="btn btn-danger btn-sm" v-if="cart.length" @click="clearCart">Clear Cart</button>
                            </div>
                        </div>
                        <div class="card-body" v-if="cart.length">
                            <div class="row" v-for="(item, index) in cart" :key="item.id">
                                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                    <div class="bg-image">
                                        <img :src="item.images[0]" class="w-100" :alt="item.name.dk" />
                                    </div>
                                </div>
                                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                    <p><strong>{{ item.name.dk }} {{ item.length }}</strong></p>
                                    <p>Color: {{ item.color }}</p>
                                    <p>Size: M</p>
                                    <button type="button" class="btn btn-danger btn-sm me-1 mb-2" @click="removeFromCart(item.id)" title="Remove item">
                                        Remove
                                    </button>
                                </div>
                                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                    <div class="d-flex mb-4 justify-content-center">
                                        <button class="btn btn-primary px-3 me-2" @click="increaseQuantity(item.id)">
                                           +
                                        </button>
                                        <div class="form-outline text-center">
                                            <label class="form-label m-2">Quantity: {{ item.quantity }}</label>
                                        </div>
                                        <button class="btn btn-primary px-3 ms-2" @click="decreaseQuantity(item.id)">
                                            -
                                        </button>
                                    </div>
                                    <p class="text-start text-md-center h5">
                                        <strong>{{ formatPrice(item.price * item.quantity) }} kr.</strong>
                                    </p>
                                </div>
                                <hr class="my-4" />
                            </div>                
                        </div>
                        <div v-if="!cart.length" class="m-3">Your cart is empty</div>
                    </div>
                    <div class="card mb-4" v-if="cart.length">
                        <div class="card-body">
                            <p><strong>Expected shipping delivery</strong></p>
                            <p class="mb-0">5 working days</p>
                        </div>
                    </div>
                    <div class="card mb-4 mb-lg-0" v-if="cart.length">
                        <div class="card-body">
                            <p><strong>We accept</strong></p>
                            <img class="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                            alt="Visa" />
                            <img class="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                            alt="American Express" />
                            <img class="me-2" width="45px"
                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                            alt="Mastercard" />
                        </div>
                    </div>
                </div>
                <div class="col-md-4" v-if="cart.length">
                    <div class="card mb-4">
                        <div class="card-header py-3">
                            <h5 class="mb-0">Summary</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Products
                                    <span>{{ formatPrice(totalPrice) }} kr.</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>Free</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Total amount</strong>
                                    </div>
                                    <span>
                                        <strong>{{ formatPrice(totalPrice) }} kr.</strong>
                                        <span></span>
                                    </span>
                                </li>
                            </ul>
                            <button  type="button" class="btn btn-primary">
                                Go to checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const cart = useState('cart', () => [])

    const clearCart = () => {
        cart.value = []
    }

    const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
    }

    const increaseQuantity = (productId) => {
        const item = cart.value.find(item => item.id === productId)
        if (item) {
            item.quantity++
        }
    }

    const decreaseQuantity = (productId) => {
        const item = cart.value.find(item => item.id === productId)
        if (item && item.quantity > 1) {
            item.quantity--
        } else {
            removeFromCart(productId)
        }
    }

    const totalPrice = computed(() => {
        return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    })

    const formatPrice = (price) => {
        const number = Number(price)
        return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

</script>