/*
   This code is a React component that displays a list of smoothie recipes fetched from a Supabase database. 
   
   The useEffect hook is used to fetch data from the smoothies table in Supabase when the component mounts. 
   
   If there was an error fetching data, an error message is displayed. If data was successfully fetched, a list of SmoothieCard components is rendered to display each smoothie. 
   
   The handleDelete function is passed to each SmoothieCard component to allow a user to delete a smoothie.
*/

import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {

  // console.log(supabase)

  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  // this function is passed to the SmoothieCard component to ensure that the deleted smoothie is removed from the front-end
  const handleDelete = (id) => {

    // Update the smoothies state by filtering out the deleted smoothie
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(smoothie => smoothie.id !== id)
    })

  }

  // Use the useEffect hook to fetch data from Supabase when the component mounts
  useEffect(() => {

    // Define a function to fetch smoothies from Supabase
    const fetchSmoothies = async () => {


      /* 
        Fetch data from the 'smoothies' table in Supabase 
        
        This code is sending a select request to Supabase to fetch all rows from the smoothies table. 
        
        The data returned by the request will contain the selected rows, and error will contain any errors that occurred during the request.
      */
      const { data, error } = await supabase
        .from('smoothies') // Specify the 'smoothies' table
        .select() // Select all rows from the table

        /*
          The .order(orderBy, { ascending: false }) method is used to specify the order in which the rows should be returned from the smoothies table in Supabase. 
          
          The first argument, orderBy, specifies the column to order the rows by. In this case, orderBy is a state variable that can be updated by the user to change the column used for ordering. 
          
          The second argument, { ascending: false }, is an options object that specifies whether the rows should be returned in ascending or descending order. In this case, ascending is set to false, so the rows will be returned in descending order.

          In summary, this code is using the .order method to order the rows returned from the smoothies table in Supabase by the column specified by the orderBy state variable, in descending order.
        */

        .order(orderBy, { ascending: false })


      // If there was an error fetching data, update the state accordingly
      if (error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
        console.log(error)
      }

      // If data was successfully fetched, update the state accordingly
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    // Call the fetchSmoothies function to fetch data from Supabase
    fetchSmoothies()
  }, [orderBy])


  return (
    <div className="page home">

      {/* if there was an error */}
      {fetchError && (<p>{fetchError}</p>)}

      {/* if data was successfully fetched */}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home