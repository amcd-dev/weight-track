import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import WeightDisplays from "@/components/weightComponents/weightDisplays";
import {useEffect, useState} from "react";
import {apiPath} from "@/pages/api/functions/quickTools";
import PreviousEntries from "@/components/statsComponents/previousEntries";

export default withPageAuthRequired(function Dashboard({ user }) {

    const [userInfo, setUserInfo] = useState(null)
    const [weightEntries, setWeightEntries] = useState()

    const fetchUserInfo = async () => {
        const res = await fetch(`${apiPath()}/api/get/userInfo`) //Check Vercel URL updated
        const data = await res.json()
        console.log('>>> Logging userInfo GET response: ', data)

        setUserInfo(data)
    }

    const fetchPreviousEntries = async () => {
        const res = await fetch(`${apiPath()}/api/get/weightEntries`) //Check Vercel URL updated
        const data = await res.json()
        console.log('>>> Logging weightEntries GET response: ', data)

        setWeightEntries(data)
    }

    useEffect(() => {
        fetchUserInfo()
        fetchPreviousEntries()
    },[])

    return (
        <div className="container mx-auto sm:px-6 lg:px-8">
            {/* Page Container ^^^ */}
            <WeightDisplays
                userInfo={userInfo}
                refreshData={() => {
                    fetchUserInfo()
                    fetchPreviousEntries()
                }}
            />
            <PreviousEntries
                entryData={weightEntries}
            />
        </div>
    )
})