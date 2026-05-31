<template>
  <div class="row justify-center">
    <div class="col-10 col-lg-6">
      <h1 class="text-h4 text-left">Bem vindo Usuário</h1> <!-- TODO: Substituir "Usuário" pelo nome do usuário logado -->

      <div class="row">
        <div class="col-12">
          <q-input
            v-model="stringSearch"
            outlined
            label="Pesquisar por nome"
            type="text"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>

      <div>
        <div class="row q-mt-lg q-col-gutter-md">
          <div
            v-for="game in filteredGames"
            :key="game.title"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card class="my-card full-height">
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />

              <q-card-section>
                <div class="text-h6">{{ game.title }}</div>
                <div class="text-subtitle2">{{ game.category }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ game.description }}
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div v-if="filteredGames.length === 0" class="q-mt-lg text-grey-7">
          Nenhum jogo encontrado para esse nome.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const stringSearch = ref('');

const games = [
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    description: 'An open-world action-adventure game set in the kingdom of Hyrule.',
    category: 'Ação e Aventura',
  },
  {
    title: 'Dark Souls III',
    description: 'A challenging action RPG known for its difficulty and intricate world design.',
    category: 'RPG (Role-Playing Game)',
  },
  {
    title: 'Hades',
    description: 'A roguelike dungeon crawler where you play as Zagreus, the son of Hades.',
    category: 'Roguelike / Roguelite',
  },
];

const filteredGames = computed(() => {
  const search = stringSearch.value.trim().toLowerCase();

  if (!search) {
    return games;
  }

  return games.filter((game) => game.title.toLowerCase().includes(search));
});
</script>