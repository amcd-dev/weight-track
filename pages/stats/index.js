import {withPageAuthRequired} from "@auth0/nextjs-auth0/client";
import {useEffect, useState} from "react";
import {apiPath} from "@/pages/api/functions/quickTools";
import ProgressLineGraph from "@/components/stats/progressLine";

//Below imports for use of charts with non SSR enabled for next.js
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default withPageAuthRequired(function Stats({ user }) {

    const [userInfo, setUserInfo] = useState(null)
    const [weightEntries, setWeightEntries] = useState()
    const [entryDataDateRange, setEntryDataDateRange] = useState(50)
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'line'
        },
        title : {
            text: 'Weight Change',
            align: 'Center'
        },
        series: [{
            name: 'sales1',
            type: 'line',
            data: [
                [
                    1690190662687,
                    100
                ],
                [
                    1690190670306,
                    56.5
                ],
            ]
        },
            {
                name: 'sales2',
                type: 'line',
                data: [
                    [
                        1690190662687,
                        150
                    ],
                    [
                        1690190670306,
                        200.5
                    ],
                ]
            }],
        yaxis: {
          title: {
              text: 'Weight Entry (kg)'
          }
        },
        xaxis: {
            type: 'datetime',
        }
    })

    const convertDataForLineGraph = (array) => {
        /*
        This function takes an array of objects and converts it to an array of arrays for the purposes of plotting a
        timeline graph. It extracts and returns only the weight entry and timestamp
         */
        console.log('>>> successful trigger of convertDataForLineGraph')
        console.log('>>> Logging array conversion for apex charts', array.map(obj => [obj.timeofentryepoch, obj.weightentrykg]) )
        return array.map(obj => [obj.timeofentryepoch, obj.weightentrykg])
    }

    const fetchUserInfo = async () => {
        const res = await fetch(`${apiPath()}/api/get/userInfo`) //Check Vercel URL updated
        const data = await res.json()
        console.log('>>> Logging userInfo GET response: ', data)

        setUserInfo(data)
    }

    const fetchPreviousEntries = async () => {
        const res = await fetch(`${apiPath()}/api/get/weightEntriesCustom?dateRange=${entryDataDateRange}`)
        const data = await res.json()
        console.log('>>> Logging weightEntriesCustom GET response: ', data)
        await console.log('>>> Logging array conversion for apex charts', data.map(obj => [obj.timeofentryepoch, obj.weightentrykg]) )
        await setChartOptions({
            ...chartOptions,
            series: [{
                data: convertDataForLineGraph(data)
            }]
        })
        setWeightEntries(data)
    }

    useEffect(() => {
        fetchUserInfo()
        fetchPreviousEntries()
    },[])

    return (
        <div className="container mx-auto sm:px-6 lg:px-8">
            {/* Page Container ^^^ */}
            <Chart
                options={chartOptions}
                series={chartOptions.series}
            />
        </div>
    )
})