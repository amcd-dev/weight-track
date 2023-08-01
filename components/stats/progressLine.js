import{ LineChart, Title } from "@tremor/react";


export default function ProgressLineGraph(props) {

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <Title>Weight Change Over Time</Title>
            <LineChart
                data={props.weightEntryData ? props.weightEntryData : null}
                index='timeofentry'
                categories={['weightentrykg']}
                startEndOnly={false}
                autoMinValue={true}
                curveType={'linear'}
                noDataText={'Loading Data'}
                showAnimation={false}
            />
        </div>
    )
}