<template>
    <div class="card">
        <div class="card-img">
            <CardImgTop
                :src="productImage" :alt="productName"
            />
        </div>
        <div class="card-body d-flex flex-column">
            <div>
                <h6 class="card-title">{{ productName }}</h6>
                <CardSubTitle margin="b-2" text-color="black-50">{{ product.brand }}</CardSubTitle>
            </div>
            <div class="d-flex justify-content-between mt-auto">
                <div> {{ product.price }} kr.</div>
                <nuxt-link :to="`/products/${product.id}`">View Details</nuxt-link>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
    const props = defineProps({
        product: {}
    });
    
    const productImage = computed(() => {
        if (props.product.images && props.product.images.length > 0) {
            return props.product.images[0];
        } else {
            return 'noImage.jpg';
        }
    });

    const productName = computed(() => {
        return props.product.name.dk || props.product.name.en;
    });

</script>
  

<style scoped>
.card {
    width: 18rem;
    margin: 10px;
}

.card-body {
    height: 150px;
}

.card-img {
    width: 286px;
    height: 381px;
}
</style>