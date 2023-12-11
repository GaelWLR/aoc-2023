<script lang="ts" setup>
import { ref } from 'vue';

const input = ref(``);
const partOneResult = ref('');
const partTwoResult = ref('');

const extractLineMapping = (line: string) => {
  const [destinationFrom, sourceFrom, length] = line.split(' ').map(Number);

  return {
    source: {
      from: sourceFrom,
      to: sourceFrom + length - 1,
    },
    destination: {
      from: destinationFrom,
      to: destinationFrom + length - 1,
    },
    difference: destinationFrom - sourceFrom,
    length,
  };
};

const extractLinesMappings = (lines: string[]) => {
  lines.shift();

  return lines.map(extractLineMapping);
};

const getAllMappings = (lines: string[]) => {
  const [
    seedsLine,
    seedToSoilLines,
    soilToFertilizerLines,
    fertilizerToWaterLines,
    waterToLightLines,
    lightToTemperatureLines,
    temperatureToHumidityLines,
    humidityToLocationLines,
  ] = lines.join('\n').split('\n\n');

  const seeds = seedsLine?.split(': ')[1].split(' ').map(Number) ?? [];
  const [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap,
  ] = [
    seedToSoilLines,
    soilToFertilizerLines,
    fertilizerToWaterLines,
    waterToLightLines,
    lightToTemperatureLines,
    temperatureToHumidityLines,
    humidityToLocationLines,
  ].map((lines) => extractLinesMappings(lines.split('\n')));

  return {
    seeds,
    mappers: [
      seedToSoilMap,
      soilToFertilizerMap,
      fertilizerToWaterMap,
      waterToLightMap,
      lightToTemperatureMap,
      temperatureToHumidityMap,
      humidityToLocationMap,
    ],
  };
};

const partOneProcess = (lines: string[]) => {
  const { seeds, mappers } = getAllMappings(lines);

  const result = seeds.reduce((minimum, seed) => {
    const location = mappers.reduce((position, mapper) => {
      for (const element of mapper) {
        const { source, difference } = element;

        if (position >= source.from && position <= source.to) {
          return position + difference;
        }
      }

      return position;
    }, seed);

    return Math.min(minimum, location);
  }, Infinity);

  partOneResult.value = result.toString();
};

const partTwoProcess = (lines: string[]) => {
  const { seeds, mappers } = getAllMappings(lines);

  const allSeeds = seeds.reduce((acc, seed, index) => {
    if (index % 2 === 0) {
      return [...acc, [seed, seeds[index + 1]]];
    }

    return acc;
  }, [] as number[][]);

  // Not optimal, but it works in less than a minute, so ¯\_(ツ)_/¯
  const result = allSeeds.reduce((minimum, seed) => {
    let minimumLocation = Infinity;
    const [seedFrom, seedLength] = seed;
    const seedTo = seedFrom + seedLength - 1;
    let currentSeed = seedFrom;

    do {
      const location = mappers.reduce((position, mapper) => {
        for (const element of mapper) {
          const { source, difference } = element;

          if (position >= source.from && position <= source.to) {
            return position + difference;
          }
        }

        return position;
      }, currentSeed);

      if (location < minimumLocation) {
        minimumLocation = location;
      }
    } while (currentSeed++ < seedTo);

    return Math.min(minimum, minimumLocation);
  }, Infinity);

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
    <h2>Day 5</h2>

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
