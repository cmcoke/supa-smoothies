/*
  This code is a React component that allows a user to create a new smoothie recipe in a Supabase database. 
  
  The useNavigate hook is used to programmatically navigate to different pages. 
  
  The form allows the user to enter values for title, method, and rating, and when the form is submitted, the handleSubmit function sends an insert request to Supabase 
  
  to add a new row to the smoothies table with the given values. If there was an error inserting the new row, an error message is displayed. If the new row was successfully inserted, 
  
  the user is navigated back to the home page.
*/

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from '../config/supabaseClient'

const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)


  const handleSubmit = async (e) => {

    // Prevent the default form submission behavior
    e.preventDefault()

    // Check if any of the form fields are empty
    if (!title || !method || !rating) {
      // If any fields are empty, set an error message and prevent form submission
      setFormError('Please fill in all the fields correctly')
      return
    }

    // console.log(title, method, rating)

    /* 
      This code is sending an insert request to Supabase to add a new row to the smoothies table with the given values for title, method, and rating. 
      
      The data returned by the request will contain the inserted row, and error will contain any errors that occurred during the request.
    */
    const { data, error } = await supabase
      .from('smoothies') // Specify the 'smoothies' table
      .insert([{ title, method, rating }]) // Insert a new row with the given values for 'title', 'method', and 'rating'
      .select() // Return the inserted row as data

    // If there was an error inserting the new row, set an error message
    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly')
    }

    // If the new row was successfully inserted, navigate back to the home page
    if (data) {
      console.log(data)
      setFormError(null) // ensures that the error is removed if one had already existed
      navigate('/') // redirects to the homepage
    }
  }

  return (
    <div className="page create">
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

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create