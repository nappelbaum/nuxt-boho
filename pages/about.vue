<script setup>
import GetService from "../API/GetService.js";

const banks = useBanks();

const fetchBanks = async () => {
  const data = await GetService.getBanksOnly();
  banks.value = data.value;
};

fetchBanks();
</script>

<template>
  <div class="flex flex-col items-center w-screen mb-28 p-16">
    <h1 class="text-4xl">About</h1>
    <br />
    <h2 class="text-2xl mb-2">Banks list</h2>
    <ul>
      <li v-for="bank in banks" :key="bank.id" class="flex justify-center">
        <span class="mr-1">{{ bank.id }}:</span>
        <span>{{ bank.bankName }}</span>
      </li>
    </ul>
  </div>
</template>
