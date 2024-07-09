<template>
    <input :type="props.type" :name="props.name" :id="props.id" :autocomplete="props.autocomplete" :class="props.class"
        :placeholder="props.placeholder" v-model="model" />
</template>

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
        default: "block w-full rounded-md border-0 bg-text-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-text-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-2"
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
    // /*
    modelValue: {
        type: String,
        required: true,
    }
    // */
})



// watch(modelView, value)

const model = defineModel()
const emits = defineEmits(['update:modelValue'])

</script>