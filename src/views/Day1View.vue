<script lang="ts" setup>
import { ref } from 'vue';

const input = ref(``);
const partOneResult = ref('');
const partTwoResult = ref('');

const partOneRegex = /\d/g;

// Build a regex with positive lookbehind and lookahead to match all digits even if they share the same letter
// Could be improved by replace it only when the letter exists in first or last position of another digit
const plainLetterDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const { plainLetterDigitMatches, plainLetterDigitGroups } = plainLetterDigits.reduce(
  (acc, digit, index) => {
    const letters = digit.split('');
    const firstLetter = letters.shift();
    const lastLetter = letters.pop();
    const rest = letters.join('');

    return {
      plainLetterDigitMatches: {
        ...acc.plainLetterDigitMatches,
        [rest]: index + 1,
      },
      plainLetterDigitGroups: [
        ...acc.plainLetterDigitGroups,
        `(?<=${firstLetter})${rest}(?=${lastLetter})`,
      ],
    };
  },
  { plainLetterDigitMatches: {} as Record<string, number>, plainLetterDigitGroups: [] as string[] },
);
const partTwoRegex = new RegExp(`\\d|(${plainLetterDigitGroups.join('|')})`, 'g');

const formatDigit = (digit: string): string => {
  if (!Number.isNaN(Number(digit))) {
    return digit;
  }

  return plainLetterDigitMatches[digit].toString() ?? '0';
};

const partOneProcess = (lines: string[]) => {
  const result = lines.reduce((acc, line) => {
    const digits = line.match(partOneRegex) ?? [];

    const firstDigit = digits[0] ?? '0';
    const lastDigit = digits[digits.length - 1] ?? '0';

    const lineValue = Number(`${firstDigit}${lastDigit}`);

    return acc + lineValue;
  }, 0);

  partOneResult.value = String(result);
};

const partTwoProcess = (lines: string[]) => {
  const result = lines.reduce((acc, line) => {
    const digits = line.match(partTwoRegex) ?? [];

    const firstDigit = formatDigit(digits[0] ?? '0');
    const lastDigit = formatDigit(digits[digits.length - 1] ?? '0');

    const lineValue = Number(`${firstDigit}${lastDigit}`);

    return acc + lineValue;
  }, 0);

  partTwoResult.value = String(result);
};

const processInput = () => {
  const lines = input.value.split('\n');

  partOneProcess(lines);
  partTwoProcess(lines);
};
</script>

<template>
  <div class="dayView-container">
    <h2>Day 1</h2>

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
