<template>
    <div>
        <header>
            <div class="bg-dark">
                <div class="container text-white">
                    <div class="d-flex align-items-center flex-wrap justify-content-center lg-start">
                        <div class="logo">
                            <img src="/cartify.jpg" />
                        </div>
                        <nav class="nav me-lg-auto mb-md-0 mb-2 col-12 col-lg-auto justify-content-center">
                            <li class="nav-item">
                                <nuxt-link to="/" class="text-white px-2 nav-link">Home</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/about" class="text-white px-2 nav-link">About</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/products" class="text-white px-2 nav-link">Products</nuxt-link>
                            </li>
                        </nav>
                        <div class="text-end">
                            <nuxt-link to="/cart" class="px-2 nav-link">
                                <button class="btn btn-outline-light me-2" type="button">
                                    Cart 
                                    <span v-if="cart.length > 0">({{ cart.length }})</span>
                                </button>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container bd-gutter bd-layout ct-main-container">
            <slot />
        </div>
    </div>
</template>

<script setup>
    const cart = useState('cart', () => [])
</script>

<style scoped>
    .logo {
        margin: 15px 30px 15px 0;

        img {
            width: 70px;
        }
    }
</style>