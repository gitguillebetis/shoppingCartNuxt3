<template>
    <div>
        <div class="back">
            <nuxt-link to="/products">< Back to Products</nuxt-link>
        </div>
        <ProductDetailCard :product="product"/>
    </div>
</template>

<script setup>
    import datos from '~/data.json';

    const id = computed(() => useRoute().params.id);
    const products = datos.products;
    const product = products.find(item => item.id == id.value);

</script>

<style scoped>
    .back {
        margin: 30px;
    }
</style>