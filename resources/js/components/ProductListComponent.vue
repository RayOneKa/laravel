<template>
    <div>
        <product-component
            v-for='product in products'
            :product="product"
            :key='product.id'
        >
        </product-component>
    </div>
</template>

<script>
    import ProductComponent from './ProductComponent.vue';

export default {
    props: ['products'],
    components: {ProductComponent},
    mounted () {

    }
}
</script>
