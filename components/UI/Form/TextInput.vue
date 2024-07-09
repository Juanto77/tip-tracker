<script lang="ts" setup>
// This works but so does the login.vue in ~/app/web/components/ui/input/
/*
defineProps<{
  type?: string,
  name?: string,
  id?: string,
  class?: string,
  autocomplete?: string,
  placeholder?: string,
  disabled?: boolean,
  modelValue?: string,
}>()
*/

/*
defineEmits<{
  (a: 'modelValue', value: string): void,
}>()
*/
///////////////////////////////////////////////////////////////////////////////////////////

defineProps({
  type: {
    type: String,
    required: true,
    default: "text",
  },
  name: {
    type: String,
  },
  id: {
    type: String
  },
  class: {
    type: String,
    default: "block w-full rounded-md border-0 bg-text-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-text-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-2"
  },
  autocomplete: {
    type: String
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  /*
  modelValue: {
    type: String
  }
  */
})

const model = defineModel()

const emits = defineEmits(['update:modelValue'])

</script>

<template>
  <input :type="$props.type" :name="$props.name" :id="$props.id" :class="$props.class"
    :autocomplete="$props.autocomplete" :placeholder="$props.placeholder" :disabled="$props.disabled" v-model="model" />
  <!-- <button class="btn" :disabled="disabled" @click="$emit('submit')">
    <slot>Button</slot>
  </button> -->
</template>

<style scoped></style>
