import {useEffect, useState} from "react";
import {apiPath} from "@/pages/api/functions/quickTools";

export default function WeightToggle(props) {

    const [measurement, setMeasurement] = useState()
    const [disabled, setDisabled] = useState(false) //disables buttons while calling APIs
    console.log('>>> logging measurement: ', measurement)

    const handleMeasurementToggle = async (measurementValue) => {
        setDisabled(true)
        const response = await fetch(`${apiPath()}/api/put/measurementToggle?value=${measurementValue}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            // body: JSON.stringify(currentWeight)
        })
        if (response.ok) {
            console.log('>>> PUT /api/put/measurementToggle successful with param: ', measurementValue)
            await props.refreshData()
            setDisabled(false)

        } else {
            console.error('!!! Error with PUT /api/put/measurementToggle')
            setDisabled(false)
        }
    }

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <span className="isolate flex justify-center rounded-md shadow-sm">
                  <button
                      type="button"
                      className={props.measurement && props.measurement[0].measurement === 'kg' //props.measurement to ensure fetch has completed preventing react error
                          ? "relative inline-flex items-center rounded-l-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 "
                          : "relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 "
                  }
                      onClick={() => handleMeasurementToggle('kg')}
                  >
                    Kilograms (kg)
                  </button>
                  <button
                      type="button"
                      className={props.measurement && props.measurement[0].measurement === 'lb' //props.measurement to ensure fetch has completed preventing react error
                          ? "relative inline-flex items-center rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 "
                          : "relative inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 "
                      }
                      onClick={() => handleMeasurementToggle('lb')}
                  >
                    Pounds (lbs)
                  </button>

            </span>
        </div>
    )
}