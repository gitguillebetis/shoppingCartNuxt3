<template>
    <div class="row">
        <div class="col-sm-3 cnt-category-tree">
            <h5>Categories</h5>
            <span @click="showAllProducts" class="category-menu all-products">All Products</span>
            <ul>
                <category-tree 
                    :category="categories" 
                    :products="catalog"
                    :selected-category-id="selectedCategoryId"
                    @category-click="handleCategoryClick" 
                />
            </ul>
        </div>
        <div class="col-sm-9 cnt-content">
            <h2>Products ({{ displayedProducts.length }})</h2>
            <div class="d-flex flex-wrap justify-content-start">
                <div v-for="item in displayedProducts" :key="item.id">
                    <product-card :product="item" />
                </div>
                <div v-if="displayedProducts.length === 0">
                    <p>No products found.</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref } from 'vue';
    import datos from '~/data.json';
    import CategoryTree from '~/components/CategoryTree.vue';
    import ProductCard from '~/components/ProductCard.vue';
  
    const catalog = ref(datos.products);
    const categories = datos.categories;
    const displayedProducts = ref(catalog.value);
    const selectedCategoryId = ref(null);
  
    const handleCategoryClick = (categoryId) => {
        selectedCategoryId.value = categoryId;
        if (categoryId === 'all') {
            displayedProducts.value = catalog.value;
        } else {
            displayedProducts.value = catalog.value.filter(product => product.categories.includes(categoryId));
        }
    };

    const showAllProducts = () => {
        selectedCategoryId.value = 'all';
        displayedProducts.value = catalog.value;
    };
</script>

<style scoped>

</style>