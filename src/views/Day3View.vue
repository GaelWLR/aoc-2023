<script lang="ts" setup>
import { ref } from 'vue';

const input = ref(``);
const partOneResult = ref('');
const partTwoResult = ref('');

const partOneProcess = (lines: string[]) => {
  const result = lines.reduce((acc, line, index) => {
    const numbers = line.match(/\d+/g);

    if (!numbers) {
      return acc;
    }

    const previousLine = lines[index - 1];
    const nextLine = lines[index + 1];
    let currentLine = line;

    return (
      acc +
      numbers.reduce((acc2, num) => {
        const index = currentLine.indexOf(num);
        const sliceStart = Math.max(index - 1, 0);
        const sliceEnd = Math.min(index + num.length + 1, line.length);

        const surroundings = [
          previousLine?.slice(sliceStart, sliceEnd).replace(/\./g, ''),
          line.slice(sliceStart, sliceEnd).replace(/\./g, ''),
          nextLine?.slice(sliceStart, sliceEnd).replace(/\./g, ''),
        ].filter(Boolean);

        const touchedSymbol = surroundings.some((surrounding) => surrounding.match(/\W/g));

        // Replace the number with x to avoid getting the wrong index when there are duplicates
        currentLine = currentLine.replace(num, Array(num.length).fill('x').join(''));

        return touchedSymbol ? acc2 + Number(num) : acc2;
      }, 0)
    );
  }, 0);

  partOneResult.value = result.toString();
};

const partTwoProcess = (lines: string[]) => {
  const result = lines.reduce((acc, line, index) => {
    const gears = line.match(/\*/g);

    if (!gears) {
      return acc;
    }

    const previousLine = lines[index - 1];
    const nextLine = lines[index + 1];
    let currentLine = line;

    return (
      acc +
      gears.reduce((acc2, gear) => {
        const index = currentLine.indexOf(gear);

        const touchedNumbers = [previousLine, line, nextLine].reduce((acc3, line) => {
          if (!line) {
            return acc3;
          }

          const lineNumbers: number[] = [];

          if (!Number.isNaN(Number(line[index]))) {
            const num = [line[index]];

            let i = index + 1;
            while (i <= line.length && !Number.isNaN(Number(line[i]))) {
              num.push(line[i++]);
            }

            i = index - 1;
            while (i >= 0 && !Number.isNaN(Number(line[i]))) {
              num.unshift(line[i--]);
            }

            lineNumbers.push(Number(num.join('')));
          } else {
            if (!Number.isNaN(Number(line[index + 1]))) {
              const num = [line[index + 1]];

              let i = index + 2;
              while (i <= line.length && !Number.isNaN(Number(line[i]))) {
                num.push(line[i++]);
              }

              lineNumbers.push(Number(num.join('')));
            }

            if (!Number.isNaN(Number(line[index - 1]))) {
              const num = [line[index - 1]];

              let i = index - 2;
              while (i >= 0 && !Number.isNaN(Number(line[i]))) {
                num.unshift(line[i--]);
              }

              lineNumbers.push(Number(num.join('')));
            }
          }

          return [...acc3, ...lineNumbers];
        }, [] as number[]);

        // Replace the gear with x to avoid getting the wrong index when there are multiples
        currentLine = currentLine.replace(/\*/, 'x');

        if (touchedNumbers.length !== 2) {
          return acc2;
        }

        const [num1, num2] = touchedNumbers;

        return acc2 + Number(num1) * Number(num2);
      }, 0)
    );
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
