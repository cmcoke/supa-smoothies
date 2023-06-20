// This code defines a React component that updates a record in a database using Supabase client library when a form is submitted. It also fetches data from the database when it mounts

import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Update = () => {

  const { id } = useParams() // Get the ID parameter from the URL
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)


  const handleSubmit = async (e) => {

    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if any of the form fields are empty
    if (!title || !method || !rating) {
      // If any fields are empty, set an error message and prevent form submission
      setFormError('Please fill in all the fields correctly')
      return
    }

    /*
      This code is sending an update request to Supabase to update rows in the smoothies table where the id column is equal to the given id. 
      
      The title, method, and rating columns are updated with the given values. The data returned by the request will contain the updated rows, and error will contain any errors that occurred during the request.
    */
    const { data, error } = await supabase
      .from('smoothies') // Specify the 'smoothies' table
      .update({ title, method, rating }) // Update the 'title', 'method', and 'rating' columns with the given values
      .eq('id', id) // Only update rows where the 'id' column is equal to the given id
      .select() // Return the updated rows as data

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly')
    }

    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }

  }

  useEffect(() => {

    // fetches data from the 'smoothies' table in supabase
    const fetchSmoothie = async () => {

      const { data, error } = await supabase
        .from('smoothies') // Specify the 'smoothies' table
        .select() // Select rows from the table
        .eq('id', id) // Only select rows where the 'id' column is equal to the given id
        .single() // Return a single row as an object instead of an array

      if (error) {
        /*
          This code is using the navigate function from react-router-dom to programmatically navigate to the root path of the application and replace the current page in the browser’s history.

          The second argument, { replace: true }, is an options object that specifies how the navigation should be performed. The replace option, when set to true, causes the current page 
          
          to be replaced in the browser’s history, rather than pushing a new entry onto the history stack. This means that when the user clicks the back button, they will not return to the current page, 
          
          but instead will go back to the page they were on before navigating to the current page.
        */
        navigate('/', { replace: true })
      }

      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        // console.log(data)
      }

    }

    fetchSmoothie()
  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update  Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update