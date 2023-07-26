
import {useEffect, useState} from "react";
import {apiPath, roundTwoDecimal} from "@/pages/api/functions/quickTools";

export default function GoalWeightSetter(props) {

    const [goalWeight, setGoalWeight] = useState({})
    console.log('>>> Logging weight entry: ', goalWeight)
    const [disabled, setDisabled] = useState(false) //disables buttons while calling APIs
    const [editing, setEditing] = useState(false)

    const handleGoalWeightEntry = (event) => {

        setGoalWeight({
            goalWeight: event.target.type === 'number' ? parseFloat(roundTwoDecimal(event.target.value)) : event.target.value, //ensures entry is 2 decimal places
        })
    }

    const handleGoalWeightSubmit = async () => {
        setDisabled(true)
        const response = await fetch(`${apiPath()}/api/post/newGoalWeightEntry?measurement=${props.userInfo[0].measurement}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(goalWeight)
        })
        if (response.ok) {
            console.log('>>> POST /api/post/newGoalWeightEntry successful with body: ', JSON.stringify(goalWeight))
            await props.refreshData()
            setDisabled(false)

        } else {
            console.error('!!! Error with POST /api/post/newGoalWeightEntry')
            setDisabled(false)
        }
        setEditing(false)
    }


    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="isolate flex justify-center rounded-md shadow-sm">
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setEditing(true)}
                >
                    Set Goal Weight
                </button>
            </div>
            {editing ?
                <div className="flex flex-col items-center px-4 py-4 sm:px-6">
                    <div>
                        <label htmlFor="goalWeight"
                               className="sr-only">
                            Weight
                        </label>
                        <input
                            type="number"
                            name="goalWeight"
                            id="goalWeight"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={props.userInfo ? props.userInfo[0].goalweightkg : null}
                            onChange={handleGoalWeightEntry}
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
                            className={!disabled ? "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :
                                "rounded-md bg-zinc-400 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            }
                            onClick={() => handleGoalWeightSubmit()}
                            disabled={disabled}
                        >
                            Submit
                        </button>
                    </div>

                </div> : null
            }

        </div>
    )
}