<script lang="ts" setup>
import { ref } from 'vue';

const input = ref(``);
const partOneResult = ref('');
const partTwoResult = ref('');

const partOneProcess = (lines: string[]) => {
  partOneResult.value = lines.length.toString();
};

const partTwoProcess = (lines: string[]) => {
  partTwoResult.value = lines.length.toString();
};

const processInput = () => {
  const lines = input.value.split('\n');

  partOneProcess(lines);
  partTwoProcess(lines);
};
</script>

<template>
  <div class="dayView-container">
    <h2>Day X</h2>

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
