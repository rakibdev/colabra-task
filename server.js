import { reactive, toRefs } from 'vue';
import { chance } from './helpers.js';

const state = reactive({
  credit: 10,
  account_credit: 0
});
const useState = () => toRefs(state);
const { credit, account_credit } = useState();

const rewards = {
  cherry: 10,
  lemon: 20,
  orange: 30,
  watermelon: 40
};

const reRollNeeded = () => {
  if (credit.value > 40 && credit.value < 60) return chance(30);
  if (credit.value > 60) return chance(60);
};

const getRollResult = () => {
  const names = Object.keys(rewards);
  const choice = () => names[Math.floor(Math.random() * names.length)];
  const result = {
    first: choice(),
    second: choice(),
    third: choice()
  };
  const won = result.first == result.second && result.second == result.third;
  if (won) {
    if (reRollNeeded()) return getRollResult();
    credit.value += rewards[result.first];
  } else {
    credit.value -= 1;
  }
  return result;
};

const cashOut = () => {
  account_credit.value += credit.value;
  credit.value = 0;
};

export { useState, getRollResult, cashOut };
