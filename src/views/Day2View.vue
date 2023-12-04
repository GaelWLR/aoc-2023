<script lang="ts" setup>
import { ref } from 'vue';

type CubeColor = 'red' | 'green' | 'blue';

type Bag = {
  red: number;
  green: number;
  blue: number;
};

type Set = {
  red?: number;
  green?: number;
  blue?: number;
};

type Game = {
  id: number;
  sets: Set[];
};

const input = ref(``);
const partOneResult = ref('');
const partTwoResult = ref('');

const bag: Bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseSet = (line: string): Set => {
  return line.split(', ').reduce<Set>((acc, colorCount) => {
    const [count, color] = colorCount.split(' ');

    return {
      ...acc,
      [color]: Number(count),
    };
  }, {});
};

const parseGame = (line: string): Game => {
  const [lineId, lineSets] = line.split(': ');
  const id = Number(lineId.split(' ')[1]);
  const sets = lineSets.split('; ').map(parseSet);

  return {
    id,
    sets,
  };
};

const partOneProcess = (lines: string[]) => {
  const games = lines.map(parseGame);

  const result = games.reduce((acc, game) => {
    const isGameImpossible = game.sets.some((set) => {
      return Object.entries(set).some(([color, count]) => {
        return count > bag[color as CubeColor];
      });
    });

    return isGameImpossible ? acc : acc + game.id;
  }, 0);

  partOneResult.value = result.toString();
};

const partTwoProcess = (lines: string[]) => {
  const games = lines.map(parseGame);

  const result = games.reduce((acc, game) => {
    const minBag = game.sets.reduce<Bag>(
      (acc, set) => {
        return {
          red: Math.max(acc.red, set.red ?? 0),
          green: Math.max(acc.green, set.green ?? 0),
          blue: Math.max(acc.blue, set.blue ?? 0),
        };
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      },
    );

    return acc + minBag.red * minBag.green * minBag.blue;
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
    <h2>Day 2</h2>

    <textarea v-model="input" rows="10" cols="50"></textarea>

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
