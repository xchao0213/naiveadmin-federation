<template>
  <div>
    <n-card>
      <p class="mt-4">something</p>
    </n-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getTableList } from '@/api/table/list';

onMounted(() => {
  getTableList().then(res => {
    console.log('res', res)
  })
})

</script>