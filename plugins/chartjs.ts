import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
export default defineNuxtPlugin( () => {
    Chart.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );
} );