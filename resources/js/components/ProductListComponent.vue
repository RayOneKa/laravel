<template>
    <div>
        <div v-if='products.length'>
            <product-component
                v-for='product in products'
                :product="product"
                :orders-products="ordersProducts"
                :key='product.id'
            />
        </div>
        <span v-else>
            <em>В данной категории отсутствуют товары</em>
        </span>
    </div>
</template>

<script>
    import ProductComponent from './ProductComponent.vue';

export default {
    props: ['products', 'ordersProducts'],
    components: {ProductComponent}
}
</script>
