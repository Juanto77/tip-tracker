import { useTipStore } from "../stores/useTipStore";
import { useJobStore } from "../stores/useJobStore";
import { useTotalStore } from '../stores/useTotalStore'
import { useSupabaseClient } from "#imports";
import { useSupabaseUser } from "#imports";
import type { Database } from '~Server/types/database'

export default function () {
    const client = useSupabaseClient();
    const user = useSupabaseUser();
    /* Store Definitions */
    const tipStore = useTipStore();
    const jobStore = useJobStore();
    const totalStore = useTotalStore();

    function addTotals(job, idx, arr) {
        //#region Tip Out
        let parent = job.key
        let val = job.value.value;
        let child = job.value.child;
        let sum = 0;

        let length = Object.keys(child).length;
        let count = 0;
        let tipOut = (val / 100) * sum;
        // TODO Conditional Logic for if this portion of code should run
        Object.entries(tipStore.sales).forEach(([key, value]) => {
            count = 0

            Object.entries(child).forEach(([key2, value2]) => {
                if (value2 === true && key === key2 && count < length) {
                    sum += value;
                    let tipOut = (val / 100) * sum;
                    // console.log((val / 100) * sum)
                    count++;
                    totalStore.sales[parent] = sum; // Push to empty object
                    totalStore.tipOut[parent] = tipOut; // Push to empty object
                    // totalStore.tipMap.set(parent, { total: sum, tipOut: tipOut });
                } else {
                    count++;

                }
            });
        });
        // #endregion
    }

    // TODO Logic for how things should be calculated
    async function submit() {
        Object.keys(jobStore.jobSelect.metadata).forEach((key) => {
            jobStore.object.push({ key: key, value: jobStore.jobSelect.metadata[key] })
        })
        jobStore.object.forEach(addTotals, (job, idx, arr) => { return })
    }
    //TODO conditional logic to leave out card fee
    function getCreditNet() {
        // totalStore.creditNet = tipStore.income.creditTip - totalStore.cardFee  // setting totalStore credit net from tipInput 
        // totalStore.cashNet = tipStore.income.cashTip  // setter
        // totalStore.creditNet -= totalStore.cardFee; // credit - cardfee
        // Object.values(totalStore.tipOut).forEach((value) => {
        // totalStore.creditNet -= value;
        // })
        // totalStore.tipOut['total'] = Object.values(totalStore.tipOut).reduce((a, b) => a + b, 0) // Set total tipout
    }

    function testing() {
        const tipStore = useTipStore();
        const jobStore = useJobStore();
        totalStore.cardFee = ((jobStore.cardFee / 100) * tipStore.income.creditTip) // Setting total store card fee
        // console.log(totalStore.$state)
        // console.log(user.value.id)
    }


    async function post() {
        const updates = {
            userID: user.value.id,
            jobID: jobStore.jobSelect.id,
            inTime: tipStore.hours.clockIn,
            outTime: tipStore.hours.clockOut,
            creditTip: tipStore.income.creditTip,
            cashTip: tipStore.income.cashTip,
            sales: tipStore.sales,
            totalSales: totalStore.totalSales,
            stats: tipStore.stats,
            tipOut: totalStore.tipOut,
            creditNet: totalStore.creditNet,
            cashNet: totalStore.cashNet,
            netIncome: totalStore.netIncome,
        }

        const { error } = await client.from('user_tip').insert(updates)
        if (error) {
            console.log(error)
        }
        console.log(updates)

    }


    return { submit, addTotals, testing, post }
}