//Function imports
import { localTimeDisplay } from "@/pages/api/functions/quickTools";

//pg imports
import pool from "@/db";

//Auth0 & Next imports
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';


export default withApiAuthRequired(async function ProtectedRoute(req, res) {
  //pg connection
  const client = await pool.connect()

  //Auth0 Functions
  const { user } = await getSession(req, res)
  console.log('>>>', localTimeDisplay(), ' Received [/api/get/userInfo] with userid: ', user.sub)

  //Query
  const text = 'SELECT * FROM wtuserdata WHERE userid = $1'
  const values = [user.sub]

  try {
    const result = await client.query(text, values)
    console.log('>>>', localTimeDisplay(), ' Logging [/api/get/userInfo] response.rows: ', result.rows)
    res.status(200).json(result.rows)
    client.release()

  } catch (err) {
    console.log('!!!', localTimeDisplay(), ' Logging [/api/get/userInfo] query error: ', err.stack)
    res.status(500).json(err.stack)
  }


  // res.status(200).json({ name: 'John Doe' })
});
