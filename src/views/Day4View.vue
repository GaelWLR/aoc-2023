<script lang="ts" setup>
import { ref } from 'vue';

type Card = {
  id: number;
  winningNumbers: number[];
  playedNumbers: number[];
};

const input = ref(``);
const partOneResult = ref('');
const partTwoResult = ref('');

const parseCard = (line: string): Card => {
  const [id, numbers] = line.split(':');
  const [rawWinningNumbers, rawPlayedNumbers] = numbers.split('|');
  const winningNumbers = rawWinningNumbers.trim().replace(/ +/g, ',').split(',').map(Number);
  const playedNumbers = rawPlayedNumbers.trim().replace(/ +/g, ',').split(',').map(Number);

  return {
    id: Number(id.replace('Card', '').trim()),
    winningNumbers,
    playedNumbers,
  };
};

const partOneProcess = (lines: string[]) => {
  const cards = lines.map(parseCard);

  const result = cards.reduce((acc, card) => {
    const { winningNumbers, playedNumbers } = card;

    const wins = playedNumbers.reduce((acc2, playedNumber) => {
      return winningNumbers.includes(playedNumber) ? acc2 + 1 : acc2;
    }, 0);

    const points = wins === 0 ? 0 : Math.pow(2, wins - 1);

    return acc + points;
  }, 0);

  partOneResult.value = result.toString();
};

const partTwoProcess = (lines: string[]) => {
  const cards = lines.map(parseCard);
  const cardCopies: number[] = Array.from({ length: cards.length }, () => 1);

  const result = cards.reduce((acc, card, index) => {
    const { winningNumbers, playedNumbers } = card;
    const copies = cardCopies[index];

    const wins = playedNumbers.reduce((acc2, playedNumber) => {
      return winningNumbers.includes(playedNumber) ? acc2 + 1 : acc2;
    }, 0);

    for (let i = 1; i <= wins; i++) {
      cardCopies[index + i] += copies;
    }

    return acc + copies;
  }, 0);

  partTwoResult.value = result.toString();
};

const processInput = () => {
  const lines = input.value.split('\n');

  partOneProcess(lines);
  partTwoProcess(lines);
};
</script>

<template>
  <div class="dayView-container">
    <h2>Day 4</h2>

    <textarea v-model="input" cols="50" rows="10"></textarea>

    <div class="dayView-btnContainer">
      <button @click="processInput">Process</button>
    </div>

    <div>
      <h3>Part 1</h3>
      <p>=> {{ partOneResult }}</p>
    </div>

    <div>
      <h3>Part 2</h3>
      <p>=> {{ partTwoResult }}</p>
    </div>
  </div>
</template>
