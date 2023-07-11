import {useEffect, useState} from "react";
import {apiPath, roundTwoDecimal} from "@/pages/api/functions/quickTools";


export default function WeightDisplays(props) {

    const [currentWeight, setCurrentWeight] = useState({})
    console.log('>>> Logging weight entry: ', currentWeight)
    const [goalWeight, setGoalWeight] = useState()
    const [weightEntries, setWeightEntries] = useState()
    const [editing, setEditing] = useState(false)

    console.log('>>> Logging props.userInfo: ', props.userInfo)

    // const fetchWeightEntries = async () => {
    //     const res = await fetch(`${apiPath()}/api/get/weightEntries`) //Check Vercel URL updated
    //     const data = await res.json()
    //     setWeightEntries(data)
    // }
    //
    // const fetchCurrentWeight = async () => {
    //     const res = await fetch(`${apiPath()}/api/get/currentWeight`)
    //     const data = await res.json()
    //     setCurrentWeight(data)
    // }
    //
    // const fetchGoalWeight = async () => {
    //     const res = await fetch(`${apiPath()}/api/get/currentWeight`)
    //     const data = await res.json()
    //     setGoalWeight(data)
    // }

    const handleWeightEntry = (event) => {

        setCurrentWeight({
            weight: event.target.type === 'number' ? parseFloat(roundTwoDecimal(event.target.value)) : event.target.value, //ensures entry is 2 decimal places
        })
    }

    const handleWeightSubmit = async () => {

        const response = await fetch(`${apiPath()}/api/post/newWeightEntry`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(currentWeight)
        })
        if (response.ok) {
            console.log('>>> POST /api/post/newWeightEntry successful with body: ', JSON.stringify(currentWeight))

        } else {
            console.error('!!! Error with POST /api/post/newWeightEntry')
        }
    }

    useEffect(() => {
        // fetchWeightEntries()
        // fetchCurrentWeight()
    },[])

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="flex flex-col items-center px-4 py-5 sm:px-6">
                <p>Goal Weight</p>
                {props.userInfo ? <p>{props.userInfo[0].goalweightkg}</p> : <p>Loading</p>}
            </div>
            <div className="flex flex-col items-center px-4 py-5 sm:p-6">
                <p>Current Weight</p>
                {props.userInfo ? <p>{props.userInfo[0].currentweightkg}</p> : <p>Loading</p>}
            </div>
            <div className="flex flex-col items-center px-4 py-4 sm:px-6">
                <p>{props.userInfo ? props.userInfo[0].goalweightkg - props.userInfo[0].currentweightkg : null } to go</p>
            </div>
            <div className="flex flex-col items-center px-4 py-4 sm:px-6">
                {!editing && props.userInfo ?
                    <button
                        type="button"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setEditing(true)}
                    >
                        Record New Measurement
                    </button> : null
                }
                {editing ?
                    <div className="flex flex-col items-center px-4 py-4 sm:px-6">
                        <div>
                            <label htmlFor="currentWeight"
                                   className="sr-only">
                                Weight
                            </label>
                            <input
                                type="number"
                                name="currentWeight"
                                id="currentWeight"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={props.userInfo[0].currentweightkg}
                                onChange={handleWeightEntry}
                            />
                        </div>
                        <div className="flex items-center my-2">
                            <button
                                type="button"
                                className="rounded-md bg-rose-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => handleWeightSubmit()}
                            >
                                Submit
                            </button>
                        </div>

                    </div> : null
                }
            </div>
        </div>
    )
}