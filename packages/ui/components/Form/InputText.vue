<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    default: 'block w-full rounded-md border-0 bg-text-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-text-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-2',
  },
  autocomplete: {
    type: String,
    /*
        validator(value: string, props) {
            return ["given-name", "family-name"].includes(value);
        }
        */
  },
  placeholder: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  // /*
  modelValue: {
    type: String,
    required: true,
  },
  // */
})

const emits = defineEmits(['update:modelValue'])
// watch(modelView, value)

const model = defineModel()
</script>

<template>
  <label :for="props.name">{{ props.label }}</label>
  <input
    :id="props.id" v-model="model" :type="props.type" :name="props.name" :autocomplete="props.autocomplete"
    :class="props.class" :placeholder="props.placeholder"
  >
</template>
