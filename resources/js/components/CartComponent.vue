<template>
    <div>
        <div v-if='products.length'>
            <table class="table bordered">
                <tbody>
                    <tr v-for='product in products' :key='product.id'>
                        <td>
                            {{product.id}} {{product.title}}
                        </td>
                        <td>
                            <button
                                @click="changeProductQuantity(product.id, -1)"
                                :disabled='processing'
                                class="btn btn-danger">
                                -
                            </button>
                            {{product.pivot.quantity}}
                            <button
                                :disabled='processing'
                                @click="changeProductQuantity(product.id, 1)"
                                class="btn btn-success">
                                +
                            </button>
                        </td>
                        <td>
                            {{product.price}} руб.
                        </td>
                        <td>
                            {{product.pivot.quantity * product.price}} руб.
                        </td>
                    </tr>
                </tbody>
            </table>
            <button @click='finishOrder' class="btn btn-success">Оформить заказ</button>
        </div>
        <span v-else>
            <em>В корзине отсутствуют продукты</em>
        </span>
    </div>
</template>

<script>
const Swal = require('sweetalert2')

export default {
    data () {
        return {
            processing: false
        }
    },
    computed: {
        products () {
            return this.$store.state.cartProducts
        }
    },
    methods: {
        finishOrder () {
            axios.get('/api/order/finish')
            .then(() => {
            Swal.fire({
                title: 'Готово!',
                text: 'Заказ успешно оформлен!',
                icon: 'success',
                confirmButtonText: 'OK'
                })
            })
            .catch(() => {
                Swal.fire({
                    title: 'Произошла ошибка',
                    text: 'Повторите попытку',
                    icon: 'error',
                    confirmButtonText: 'OK('
                    })
            })
        },
        changeProductQuantity (productId, quantityChange) {
            const params = {
                productId,
                quantityChange
            }
            this.$store.dispatch('changeCartProductQuantity', params)
        }
    }
}
</script>
