<template>
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
        <div class="col-md-4">
        <img width="180" :src="`/storage/img/${product.picture}`">
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">
                {{product.title}}
            </h5>
            <p class="card-text">
                {{product.description}}
            </p>
            <p class="card-text">
                <small class="text-muted">
                    {{product.price}} руб.
                    <button @click='addToOrder' class="btn btn-info">Добавить в корзину</button>
                </small>
            </p>
        </div>
        </div>
    </div>
    </div>
</template>

<script>

const Swal = require('sweetalert2')

export default {
    props: ['product'],
    methods: {
        addToOrder () {
            const params = {
                productId: this.product.id
            }
            axios.post('/order/addProduct', params)
            .then(data => {

            })
            .catch(error => {
                if (error.response.status == 401) {
                    Swal.fire({
                        title: 'Товар не добавлен',
                        text: 'Авторизуйтесь',
                        icon: 'error',
                        confirmButtonText: 'OK('
                        })
                }
            })
        }
    }
}
</script>

<style scoped>
</style>