export default function() {
        const store = useTipStore()

        /* Calculate Gross Income */
        store.grossIncome = (store.cashTip + store.creditTip)

        /* Card Fee */
        store.cardFee = ((store.creditTip / 100) * store._params.cardFee)

        /* Calculate Hours Worked */
        store.totalHours = Math.abs((outTime - inTime) / 36e5)

        /* Calculate Total Sales */
        //TODO: Refactor to one-liner computed prop
        Objects(store.saleSource).forEach((key) => {
            const nestedSales = key.sales
            store.totalSales += nestedSales
        })

        /* Calculate PPA */
        const _ppa = store.totalSales / store.totalGuest
        store.stats['PPA'] = _ppa

        /* Iterate through pairSource to find matching sales categories and add them to poolSource sales. */
        Object.keys(store.pairSource).forEach((key) => {
            /* Iterate through pairSources */

            const pairItem = store.pairSource[key] // Returns Object
            /* PairItem Object Destructuring */
            const pairID = pairItem.id // Returns Parent UUID
            const pairCode = pairItem.code // Returns Parent String
            const pairActive = pairItem.active // returns boolean
            const pairChild = pairItem._child // nested _child object
            let pairSales = pairItem.sales // Sales value, add sales to this
            const pairPercent = pairItem.percent // user defined percentage
            const pairSumOut = pairItem.sumOut // _Sales / _percent

            ///////////////////////////////////////////////////////////////////////////////////////////
            /* Iterate through _child of pairSource parent */
            Object.keys(pairChild).forEach((k) => {
                const childItem = pairChild[k] //Nested _child Object
                /* Object destructuring */
                const childID = childItem.id
                const childCode = childItem.code
                const childName = childItem.name
                const isChild = childItem.isChild

                /* Finding the sales value */
                if (isChild === true) {
                    const _saleSource = store.saleSource
                    const _saleChild = _saleSource[childID]
                    const _sales = _saleChild.sales


                    /* Add saleSource Sales to pairSource Sales */
                    store.pairSource[key].sales += _sales

                } // of isChild check & add values together

            }) // end _child iteration

        }) //end pairSource iteration

        /* Calculate Tip Out from pairSource.Sales and add to pairSource.Sales */
        Object.values(store.pairSource).forEach((val) => {
            val.sumOut = (val.sales / 100) * val.percent
        }) // end of tip out calc

        /* Calc total tip out & update state */
        Object.values(store.pairSource).forEach((val) => { store.totalTipOut += val.sumOut })

        /* Net Income */
        store.netIncome = (store.cashTip + store.creditTip) - (store.totalTipOut + store.cardFee)
}
