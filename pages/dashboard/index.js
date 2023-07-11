import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import WeightDisplays from "@/components/weightComponents/weightDisplays";
import {useEffect, useState} from "react";
import {apiPath} from "@/pages/api/functions/quickTools";

export default withPageAuthRequired(function Dashboard({ user }) {

    const [userInfo, setUserInfo] = useState(null)

    const fetchUserInfo = async () => {
        const res = await fetch(`${apiPath()}/api/get/userInfo`) //Check Vercel URL updated
        const data = await res.json()
        console.log('>>> Logging userInfo GET response: ', data)

        setUserInfo(data)
    }

    useEffect(() => {
        fetchUserInfo()
    },[])

    return (
        <div className="container mx-auto sm:px-6 lg:px-8">
            {/* Page Container ^^^ */}
            <WeightDisplays
                userInfo={userInfo}
            />
        </div>
    )
})