<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png" alt="Logo" />
          </q-avatar>
          Ice
        </q-toolbar-title>

        <q-btn dense flat round icon="shopping_cart" @click="goToCart" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from 'src/components/EssentialLink.vue'
import { linksList } from 'src/layouts/menu-links'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function goToCart() {
  router.push('/carrinho')
}
</script>
