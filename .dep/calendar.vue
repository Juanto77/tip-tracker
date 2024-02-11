<template>
    <VCalendar expanded :attributes='attrs'>
        <template #day-content s>
            <div slot-scope="{ day, attributes }" class="flex flex-col h-full z-10 overflow-hidden">

                <div class="flex-grow ">
                    <p v-for="attr in attributes" class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1">
                        {{ attr.customData.title }}
                    </p>
                </div>

            </div>
        </template>
    </VCalendar>
</template>

<script setup>
const month = new Date().getMonth();
const year = new Date().getFullYear();
const masks = {
    weekdays: 'WWW',
}

const data = ref([
    {
        key: 1,
        customData: {
            title: 'Lunch with mom.',
            isComplete: false,

        },
        dates: new Date(year, month, 1),
    },
    {
        key: 2,
        content: 'red',
        customData: {
            title: 'Take Noah to basketball practice',
            isComplete: false,

        },
        dates: new Date(year, month, 2),
    },
    {
        key: 3,
        customData: {
            title: "Noah's basketball game.",
            isComplete: false,

        },
        dates: new Date(year, month, 5),
    },
    {
        key: 4,
        customData: {
            title: 'Take car to the shop',
            isComplete: false,

        },
        dates: new Date(year, month, 5),
    },

    {
        key: 5,
        description: 'Lunch with mom.',
        customData: {
            title: "Mia's gymnastics practice.",

        },
        dates: new Date(year, month, 11),
    },
    {
        key: 6,
        customData: {
            title: 'Cookout with friends.',

        },
        dates: { months: 5, ordinalWeekdays: { 2: 1 } },
    },
    {
        key: 7,
        customData: {
            title: "Mia's gymnastics recital.",

        },
        dates: new Date(year, month, 22),
    },
    {
        key: 8,
        customData: {
            title: 'Visit great grandma.',

        },
        dates: new Date(year, month, 25),
    },
])
const attrs = computed(() => [
    // Attributes for todos
    ...data.value.map(lst => ({
        dates: lst.dates,
        content: lst.content,
        dot: {
            color: 'red',
            ...(lst.customData.isComplete && { class: 'opacity-75' }),
        },
        popover: {
            label: lst.customData.title,
        },
    })),
]);
</script>





<style lang="postcss" scoped>
::-webkit-scrollbar {
    width: 0px;
}

::-webkit-scrollbar-track {
    display: none;
}

/deep/ .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;

    border-radius: 0;

    & .vc-header {
        background-color: #f1f5f8;
        padding: 10px 0;
    }

    & .vc-weeks {
        padding: 0;
    }

    & .vc-weekday {
        background-color: var(--weekday-bg);
        border-bottom: var(--weekday-border);
        border-top: var(--weekday-border);
        padding: 5px 0;
    }

    & .vc-day {
        padding: 0 5px 3px 5px;
        text-align: left;
        height: var(--day-height);
        min-width: var(--day-width);
        background-color: white;

        &.weekday-1,
        &.weekday-7 {
            background-color: #eff8ff;
        }

        &:not(.on-bottom) {
            border-bottom: var(--day-border);

            &.weekday-1 {
                border-bottom: var(--day-border-highlight);
            }
        }

        &:not(.on-right) {
            border-right: var(--day-border);
        }
    }

    & .vc-day-dots {
        margin-bottom: 5px;
    }
}
</style>
