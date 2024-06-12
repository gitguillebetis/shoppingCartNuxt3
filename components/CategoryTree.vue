<template>
    <li v-if="category">
        <span 
            class="category-menu" 
            :class="{ selected: isSelected }" 
            v-if="category.level > 0 && hasProducts" 
            @click="handleCategoryClick(category.id)">
            {{ category.name.en }}
        </span>
        <ul v-if="hasSubcategories">
            <category-tree 
                v-for="subCategory in category.categories" 
                :key="subCategory.id" 
                :category="subCategory"
                :products="products"
                :selected-category-id="selectedCategoryId"
                @category-click="handleCategoryClick" 
            />
        </ul>
    </li>
</template>

<script>
export default {
    name: 'CategoryTree',
    props: {
        category: {
            type: Object,
            required: true
        },
        products: {
            type: Array,
            required: true
        },
        selectedCategoryId: {
            type: [String, Number],
            default: null
        }
    },
    computed: {
        hasSubcategories() {
            return this.category.categories && this.category.categories.length > 0;
        },
        hasProducts() {
            return this.products.some(product => product.categories.includes(this.category.id));
        },
        isSelected() {
            return this.category.id === this.selectedCategoryId;
        }
    },
    methods: {
        handleCategoryClick(categoryId) {
            this.$emit('category-click', categoryId);
        }
    }
};
</script>

<style scoped>
li {
    list-style-type: none;
    margin: 5px 0;
    cursor: pointer;
}

ul {
    padding-left: 20px;
    margin: 0;
}

</style>
