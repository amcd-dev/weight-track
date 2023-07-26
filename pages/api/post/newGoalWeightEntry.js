//Function imports
import {localTimeDisplay, roundTwoDecimal} from "@/pages/api/functions/quickTools";

//pg imports
import pool from "@/db";

//Auth0 & Next imports
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function ProtectedRoute(req, res) {
    //pg connection
    const client = await pool.connect()

    //Auth0 Functions
    const { user } = await getSession(req, res)

    //Query
    console.log('>>>', localTimeDisplay(), ' Received [/api/post/newGoalWeightEntry] with userid: ', user.sub, 'and measurement: ', req.query.measurement)

    //Convert to kg and lb values
    let kgValue = 0
    let lbValue = 0

    if (req.query.measurement === 'kg') {
        kgValue = req.body.goalWeight
        lbValue = (req.body.goalWeight * 2.2).toFixed(2)
        // lbValue = roundTwoDecimal(req.body.weight * 2.2)
    } else {
        lbValue = req.body.goalWeight
        // kgValue = roundTwoDecimal(req.body.weight * 0.45359237)
        kgValue = (req.body.goalWeight * 0.45359237).toFixed(2)
        //TODO figure out correct calculation
    }

    console.log('>>> Logging new kg value of: ', kgValue, ' and new lb value of: ', lbValue)

    const textTwo = 'UPDATE wtuserdata SET goalweightkg = $1, goalweightlb = $2 WHERE userid = $3 RETURNING *'
    const valuesTwo = [kgValue, lbValue, user.sub]

    try {
        const result = await client.query (textTwo, valuesTwo)

        console.log('>>>', localTimeDisplay(), ' Logging [/api/post/newGoalWeightEntry] resultArray: ', result.rows)
        res.status(200).json(result.rows)
        client.release()

    } catch (err) {
        console.log('!!!', localTimeDisplay(), ' Logging [/api/post/newGoalWeightEntry] query error: ', err.stack)
        res.status(500).json(err.stack)
    }


    // res.status(200).json({ name: 'John Doe' })
});
