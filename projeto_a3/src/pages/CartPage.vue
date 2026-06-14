<template>
  <div class="row justify-center">
    <div class="col-10 col-lg-8">
      <h1 class="text-h4 text-left">Carrinho</h1>

      <div v-if="isLoading" class="text-center q-py-xl">
        Carregando carrinho...
      </div>

      <div v-else class="row q-col-gutter-md">
        <div class="col-12 col-md-8">
          <q-list v-if="cartItems.length > 0" class="q-gutter-y-sm">
            <CartItem
              v-for="item in cartItems"
              :key="item.id"
              :item="item"
              @remove="removeItem(item.id)"
            />
          </q-list>

          <div v-else class="text-grey-7 q-mt-md">
            Seu carrinho está vazio.
          </div>
        </div>

        <div class="col-12 col-md-4">
          <CartSummaryCard :total="cartTotal" :is-empty="cartItems.length === 0" @checkout="checkout" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartItem from 'src/components/CartItem.vue'
import CartSummaryCard from 'src/components/CartSummaryCard.vue'
import { getCartGames, removeCartGame } from 'src/services/CartService'
import { computed, onMounted, ref } from 'vue'

const cartItems = ref([])
const isLoading = ref(true)

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + Number(item.valor), 0)
})

function loadCart() {
  isLoading.value = true

  return getCartGames()
    .then((response) => {
      cartItems.value = response
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao carregar carrinho')
    })
    .finally(() => {
      isLoading.value = false
    })
}

function removeItem(id) {
  removeCartGame(id)
    .then(() => {
      cartItems.value = cartItems.value.filter((item) => item.id !== id)
    })
    .catch((error) => {
      console.error(error)
      alert('Erro ao remover jogo do carrinho')
    })
}

function checkout() {
  alert('Compra concluída')
}

onMounted(() => {
  loadCart()
})
</script>
