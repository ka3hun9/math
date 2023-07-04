<template>
  <main class="grid gap24">
    <section>
      <h1 style="margin: 0 auto">数学运算题目</h1>
    </section>
    <section class="flex gap24">
      <label for="">
        最大位数:
        <input v-model="digit" type="number" />
      </label>
      <label for="">
        出题数量:
        <input v-model="count" type="number" />
      </label>
    </section>
    <section>
      <label for="" class="flex gap24">
        运算符号:
        <label for="">
          <input
            type="checkbox"
            name="operation"
            value="+"
            :checked="true"
            @click="handleOperation"
          />+
        </label>
        <label for="">
          <input
            type="checkbox"
            name="operation"
            value="-"
            :checked="true"
            @click="handleOperation"
          />-
        </label>
        <label for="">
          <input
            type="checkbox"
            name="operation"
            value="×"
            :checked="true"
            @click="handleOperation"
          />×
        </label>
        <label for="">
          <input
            type="checkbox"
            name="operation"
            value="÷"
            :checked="true"
            @click="handleOperation"
          />÷
        </label>
      </label>
    </section>
    <section class="grid gap48 grid-col-auto">
      <div v-for="cr of countRef" class="flex gap8 justify">
        <span class="flex gap8" :title="`答案 : ${cr.value[0]} ${ cr.value[1] } ${cr.value[2]} = ${cr.value[3]}`">
          <span>{{ cr.value[0] }}</span>
          <span>{{ cr.value[1] }}</span>
          <span>{{ cr.value[2] }}</span>
          <span>=</span>
        </span>
        <span class="flex gap8">
          <input
            v-model="cr.value[4]"
            type="number"
            style="border: 0; border-bottom: 1px solid; width: 56px"
          />
          <span v-if="cr.value[4] == ''"></span>
          <span
            v-else-if="cr.value[4] !== '' && cr.value[3] === cr.value[4]"
            style="color: red"
          >
            ✓
          </span>
          <span v-else style="color: green"> ✕ </span>
        </span>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRandom, useSymbol, useCalculate } from "~/composables/random";

// 位数
const digit = ref();

// 运算符号
const operations = ref(["+", "-", "×", "÷"]);

// 出题数量
let count = ref(1);

// 题目
const countRef = computed(() => {
  const result = [];
  for (let i = 0; i < count.value; i++) {
    const digit1 = useRandom(digit.value);
    const digit2 = useRandom(digit.value);
    const symbol = useSymbol(operations.value);
    const s = useCalculate(digit1, symbol, digit2);
    result.push(ref([digit1, symbol, digit2, s, ""]));
  }
  return result;
});

function handleOperation(e: any) {
  const target = e.currentTarget;
  const operation = target.value;
  const isAdd = target.checked;

  if (isAdd) {
    operations.value.push(operation);
  } else {
    const indx = operations.value.findIndex((item) => item === operation);
    operations.value.splice(indx, 1);
  }
}
</script>
