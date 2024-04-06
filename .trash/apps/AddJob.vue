<template>
    <UIPageContainerM>
        <FormKit #default="{ value }" type="form" submit-label="Add Job" @submit="submitHandler">
            <FormKit type="text" name="job-name" label="Job Name" />
            <div class="columns-2">
                <FormKit type="toggle" name="calculate" label="Calculate" />

                <FormKit type="toggle" name="advanced" label="Advanced Settings" />
            </div>
            <FormKit type="group" name="sale-source" v-model="saleSource">
                <FormKit type="repeater" name="sales-source" label="Sales" add-label="Add Category">
                    <FormKit type="text" :name="use_uid()" label="Source" />
                </FormKit>
            </FormKit>

            <FormKit type="repeater" name="pool-source" label="Tip Pool" add-label="Add Category">
                <FormKit type="text" :name="use_uid()" label="Source" />
            </FormKit>


            <pre wrap>{{ value }}</pre>

        </FormKit>
        <pre>{{ saleSource }}</pre>
    </UIPageContainerM>
</template>

<script setup lang="ts">

const uid = use_uid()

const job = ref('')

const calculate = ref(false)

const advanced = ref(false)
/*
const saleSource = [{ use_uid(): "Food Sales" }, { use_uid(): "Beer Sales" }, { use_uid(): "Wine Sales" }, { use_uid(): 'Liquor Sales' }, { use_uid(): "Retail Sales" }]
console.log(saleSource)
*/

const saleSource = ref([])

const submitHandler = (_data) => {
    console.log(_data)
}


</script>