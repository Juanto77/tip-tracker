<script setup lang="ts">
import type { Database } from "/Web_Dev/2024/Tip Tracker/app/types/database";
const client = useSupabaseClient<Database>();
const { data: getTips } = await client.from("tips").select("*");
const tableData = getTips;
const columns = [
  {
    key: "pa",
    label: "week",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "in_time",
    label: "In Time",
  },
  {
    key: "out_time",
    label: "Out Time",
  },
  {
    key: "total_hours",
    label: "Hours",
  },
  {
    key: "cash",
    label: "Cash",
  },
  {
    key: "credit",
    label: "Credit",
  },
  {
    key: "beer_sales",
    label: "Beer Sales",
  },
  {
    key: "food_sales",
    label: "Food Sales",
  },
  {
    key: "liquor_sales",
    label: "Liquor Sales",
  },
  {
    key: "retail_sales",
    label: "Retail Sales",
  },
  {
    key: "wine_sales",
    label: "Wine Sales",
  },
  {
    key: "guest_count",
    label: "Guest Count",
  },
  {
    key: "actions",
  },
];
const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];

// const selected = ref([getTips[0]]);
</script>

<template>
  <UTable v-model="selected" :rows="tableData" :columns="columns">
    <template #name-data="{ row }"> </template>

    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
</template>
