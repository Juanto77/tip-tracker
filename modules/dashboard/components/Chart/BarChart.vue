<template>
    <Bar :data="chartData" :options="props.options" />
</template>

<script setup lang="ts">
import { normalizeProps } from 'vue';
import { Bar } from 'vue-chartjs';
const dayjs = useDayjs();
const props = defineProps( {
    // data: {
    //     type: Object,
    //     required: false,
    // },
    datasets: {
        type: Object,
        required: true,
        default: [ 40, 20, 12, 50, 10 ],
    },
    color: {
        type: String,
        required: false,
        default: '#f87979',
    },
    options: {
        type: Object,
        required: true,
    },
    responsive: {
        type: Boolean,
        required: false,
        default: false,
    },
    ratio: {
        type: Boolean,
        required: false,
        default: false,
    }
} );
const chartData = ref( {
    // labels: [ 'January', 'February', 'March', 'April', 'May' ],
    datasets: [
        {
            // label: 'Data One',
            backgroundColor: props.color,
            data: props.datasets
        },
    ],
} );
///////////////////////////////////////////////////////////////////////////////////////////
/* Fallback Data */
/*
const chartData = ref( {
    labels: [ 'January', 'February', 'March', 'April', 'May' ],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [ 40, 20, 12, 50, 10 ],
        },
    ],
} );
*/
const chartOptions = ref( {
    responsive: props.responsive,
    maintainAspectRatio: props.ratio,
} );
// */
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

/* Trying to Fetch Locally */
/*
const client = useSupabaseClient();
const { data } = await client.from( 'user_tip' ).select( 'id, jobID, inTime, netIncome' );

let dateArr = [];
let incomeArr = [];

const idArr = data?.map( ( x ) => x.id );
const jobID = data?.map( ( x ) => x.jobID );
const date = data?.map( ( x ) => dayjs( x.inTime ).format( 'YYYY-MM-DD' ) );
const netIncomeArr = data?.map( ( x ) => x.netIncome );

dateArr = date;
incomeArr = netIncomeArr;
*/

///////////////////////////////////////////////////////////////////////////////////////////
/* Lets try these */
/*
const chartData = ref( {
    // labels: store.dateArr,
    type: 'bar',
    datasets: [
        {
            backgroundColor: '#f87979',
            // label: toRaw(store.dateArr),
            data: data
        },
    ],
} );

const chartOptions = ref( {
    responsive: true,
    parsing: {
        xAxisKey: 'inTime',
        yAxisKey: 'netIncome',
    }
} );

console.log( data );
*/

///////////////////////////////////////////////////////////////////////////////////////////
// import {
//     Chart as ChartJS,
//     Title,
//     Tooltip,
//     Legend,
//     BarElement,
//     CategoryScale,
//     LinearScale
// } from 'chart.js';
// import { Bar } from 'vue-chartjs';

// ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

// export default {
//     name: 'App',
//     components: {
//         Bar
//     },
//     data() {
//         return {
//             data: {
//                 labels: [ 'January', 'February', 'March' ],
//                 datasets: [ { data: [ 40, 20, 12 ] } ]
//             },
//             options: {
//                 responsive: true
//             }
//         };
//     }
// };
</script>