<template>
    <div class="container pdp">
        <div class="row gx-5">
            <aside class="col-lg-6">
                <div class="cnt-carousel">
                    <Carousel control indicators>
                        <CarouselInner>
                            <CarouselItem v-for="(image, index) in product.images" :key="index">
                                <CarouselItemImage width="800" :src="image" />
                            </CarouselItem>
                        </CarouselInner>
                    </Carousel>
                </div>
            </aside>
            <main class="col-lg-6">
                <div class="ps-lg-3">
                    <h4 class="title text-dark">
                        {{ productName }}
                    </h4>
                    <div class="d-flex flex-row my-3">
                        <span class="text-muted">{{ product.stock }} items</span>
                        <span class="text-success ms-2">In stock</span>
                    </div>
                    <div class="mb-3">
                        <span class="h5"> {{ product.price }} kr.</span>
                    </div>
                    <div class="row">
                        <dt class="col-3">Brand:</dt>
                        <dd class="col-9">{{ product.brand }}</dd>

                        <dt class="col-3">Color</dt>
                        <dd class="col-9">{{ product.color }}</dd>
                    </div>

                    <hr class="mt-4 mb-4">

                    <div class="row mb-2">
                        <div class="col-md-4 col-6">
                            <label class="mb-2">Sizes</label>
                            <select class="form-select border border-secondary" style="height: 35px;">
                                <option v-for="(size, index) in product.size" :key="index">{{ size }}</option>
                            </select>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary shadow-0" @click="addToCart(product)"> Add to cart </a>

                    <hr class="mt-4 mb-4">

                    <div class="variants" v-if="filteredVariants.length">
                        <h4 class="title">Variants</h4>
                        <div class="d-flex">
                            <div class="m-2" style="width:200px" v-for="(variantItem, index) in filteredVariants" :key="index">
                                <div class="cnt-img" v-if="variantItem.images && variantItem.images.length > 1">
                                    <Carousel control indicators>
                                        <CarouselInner>
                                            <CarouselItem v-for="(variantImage, index) in variantItem.images" :key="index">
                                                <CarouselItemImage :src="variantImage" />
                                            </CarouselItem>
                                        </CarouselInner>
                                    </Carousel>
                                </div>
                                <div class="cnt-img" v-else-if="variantItem.images && variantItem.images.length === 1">
                                    <img :src="variantItem.images[0]" width="50" />
                                </div>
                                <div class="cnt-img" v-else>
                                    <img src="/noImage.jpg" alt="No Image Available" />
                                </div>
                                <span class="fw-bold">{{ variantItem.color }}</span>
                                <div>
                                    <div class="d-flex flex-row my-3" v-if="variantItem.stock > 0">
                                        <span class="text-muted">{{ variantItem.stock }} items</span>
                                        <span class="text-success ms-2">In stock</span>
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div class="col-md-4 col-6">
                                        <label class="mb-2">Sizes</label>
                                        <select class="form-select border border-secondary" style="height: 35px;">
                                            <option v-for="(size, index) in variantItem.size" :key="index">{{ size }}</option>
                                        </select>
                                    </div>
                                </div>
                                <a href="#" class="btn btn-primary shadow-0" @click="addToCart(product, variantItem)"> Add to cart </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    <Modal ref="addToCartModal">
        <ModalDialog>
            <ModalContent>
                <ModalHeader>
                    <CloseButton dismiss="modal" />
                </ModalHeader>
                <ModalBody class="text-center"><h5>Item added to cart</h5></ModalBody>
                <ModalFooter>
                    <b-button button="secondary" dismiss="modal"> Close</b-button>
                </ModalFooter>
            </ModalContent>
        </ModalDialog>
    </Modal>
</template>

<script setup>
import { computed } from 'vue'
import { useState } from '#imports'

const props = defineProps({
    product: {
        type: Object,
        default: () => ({})
    }
})

const addToCartModal = ref(null)

const productName = computed(() => {
    return props.product.name.dk || props.product.name.en
})

const filteredVariants = computed(() => {
    return props.product.variant
        ? props.product.variant.filter(
            variant => variant.color !== props.product.color && variant.stock > 0
        )
        : []
})

const cart = useState('cart', () => [])

const addToCart = (product, variant) => {
    const item = cart.value.find(item => item.id === product.id)
    if (item) {
        item.quantity += 1
    } else {
        cart.value.push({ ...product, quantity: 1 })
    }
    addToCartModal.value.show(); 
    setTimeout(() => {
        addToCartModal.value.hide();
    }, 2000);
}
</script>

<style scoped>
.variants img {
    width: 183px;
}

.cnt-img {
    width: 183px;
    height: 244px;
}

.pdp .form-select {
    width: 110px
}
</style>
