<template>
  <p>Credit: {{ credit }}</p>
  <p>Account credit: {{ account_credit }}</p>

  <div class="slots">
    <div class="slot">
      <span v-if="loading.first">X</span>
      <img v-else :src="images[result.first]" />
    </div>
    <div class="slot">
      <span v-if="loading.second">X</span>
      <img v-else :src="images[result.second]" />
    </div>
    <div class="slot">
      <span v-if="loading.third">X</span>
      <img v-else :src="images[result.third]" />
    </div>
  </div>

  <button
    @click="start"
    :disabled="credit == 0 || loading.first || loading.second || loading.third"
  >
    Start {{ credit == 0 ? '(No credit left)' : '' }}
  </button>
  <button ref="cash_out" @click="cashOut" @mouseenter="onCashOutMouseEnter">Cash out</button>
</template>

<script setup>
import { ref, reactive } from 'vue';
import cherry from './assets/cherry.svg';
import lemon from './assets/lemon.svg';
import orange from './assets/orange.svg';
import watermelon from './assets/watermelon.svg';
import { getRollResult, cashOut, useState } from './server.js';
import { chance } from './helpers.js';

const { credit, account_credit } = useState();

const cash_out = ref(null);
const result = reactive({});
const loading = reactive({});
const images = { cherry, lemon, orange, watermelon };

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const start = async () => {
  const response = getRollResult();
  Object.assign(loading, { first: true, second: true, third: true });

  await sleep(1000);
  loading.first = false;
  result.first = response.first;

  await sleep(1000);
  loading.second = false;
  result.second = response.second;

  await sleep(1000);
  loading.third = false;
  result.third = response.third;
};

const onCashOutMouseEnter = () => {
  if (chance(50)) {
    const directions = ['top', 'right', 'bottom', 'left'];
    const property = 'margin-' + directions[Math.floor(Math.random() * directions.length)];
    cash_out.value.style[property] =
      parseInt(getComputedStyle(cash_out.value)[property]) + 300 + 'px';
  } else if (chance(40)) {
    cash_out.value.disabled = true;
    cash_out.value.textContent += ' (unclickable)';
  }
};
</script>

<style scoped>
.slots {
  display: flex;
  gap: 16px;
}

.slot {
  width: 80px;
  height: 80px;
  padding: 8px;
  border-radius: 10px;
  background-color: #415866;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot img {
  width: 100%;
}
</style>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px;
}

p {
  margin: 0;
}

button {
  padding: 8px 16px;
  border: 0;
  border-radius: 10px;
  background-color: #81cdff;
  cursor: pointer;
}
</style>
