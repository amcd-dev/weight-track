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
  console.log('>>>', localTimeDisplay(), ' Received [/api/post/newWeightEntry] with userid: ', user.sub, 'and measurement: ', req.query.measurement)

  //Convert to kg and lb values
  let kgValue = 0
  let lbValue = 0

  if (req.query.measurement === 'kg') {
    kgValue = req.body.weight
    lbValue = (req.body.weight * 2.2).toFixed(2)
    // lbValue = roundTwoDecimal(req.body.weight * 2.2)
  } else {
    lbValue = req.body.weight
    // kgValue = roundTwoDecimal(req.body.weight * 0.45359237)
    kgValue = (req.body.weight * 0.45359237).toFixed(2)
    //TODO figure out correct calculation
  }

  console.log('>>> Logging new kg value of: ', kgValue, ' and new lb value of: ', lbValue)

  const textOne = 'INSERT INTO wtweightentry (userid, weightentrykg, weightentrylb, timeofentry) VALUES ($1,$2,$3,$4) RETURNING *'
  const valuesOne = [user.sub, kgValue, lbValue, new Date()]

  const textTwo = 'UPDATE wtuserdata SET currentWeightKg = $1, currentweightlb = $2 WHERE userid = $3 RETURNING *'
  const valuesTwo = [kgValue, lbValue, user.sub]

  try {
    const resultOne = await client.query(textOne, valuesOne)
    const resultTwo = await client.query (textTwo, valuesTwo)

    const resultArray = [resultOne.rows, resultTwo.rows]
    console.log('>>>', localTimeDisplay(), ' Logging [/api/post/newWeightEntry] resultArray: ', resultArray)
    res.status(200).json(resultArray)
    client.release()

  } catch (err) {
    console.log('!!!', localTimeDisplay(), ' Logging [/api/post/newWeightEntry] query error: ', err.stack)
    res.status(500).json(err.stack)
  }


  // res.status(200).json({ name: 'John Doe' })
});
