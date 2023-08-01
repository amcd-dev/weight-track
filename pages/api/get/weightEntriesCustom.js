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
  console.log('>>>', localTimeDisplay(), ' Received [/api/get/weightEntriesCustom] with userid: ', user.sub)
  console.log('>>>', localTimeDisplay(), ' req.query.dateRange: : ', req.query.dateRange)

  //EPOCH CONVERSION FUNCTION
  function convertTimeToEpoch(array) {
    const exit = array.map(obj => {
      const epochTime = new Date(obj.timeofentry).getTime();
      return { ...obj, timeofentryepoch: epochTime };
    });

    return exit;
  }

// Example usage:
  const data = [
    // Your array of objects here...
  ];

  const convertedData = convertTimeToEpoch(data);
  console.log(convertedData);



  //Query
  const text = 'SELECT * FROM wtweightentry WHERE userid = $1 ORDER BY timeofentry LIMIT $2'
  const values = [user.sub, req.query.dateRange]

  try {
    const result = await client.query(text, values)
    console.log('>>>', localTimeDisplay(), ' Logging [/api/get/weightEntriesCustom] response.rows: ', result.rows)
    console.log('>>>', localTimeDisplay(), ' Logging [/api/get/weightEntriesCustom] response.rows epoch conversion: ', convertTimeToEpoch(result.rows))
    // res.status(200).json(result.rows)
    res.status(200).json(convertTimeToEpoch(result.rows))
    client.release()

  } catch (err) {
    console.log('!!!', localTimeDisplay(), ' Logging [/api/get/weightEntriesCustom] query error: ', err.stack)
    res.status(500).json(err.stack)
  }


  // res.status(200).json({ name: 'John Doe' })
});
