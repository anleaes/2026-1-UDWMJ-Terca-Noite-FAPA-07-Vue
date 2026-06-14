import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    total: (state) => {
      return state.items.reduce((sum, item) => sum + Number(item.valor), 0)
    },
  },

  actions: {
    setItems(items) {
      this.items = items
    },

    addItem(item) {
      this.items.push(item)
    },

    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
