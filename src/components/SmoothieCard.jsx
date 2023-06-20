/*
  This code is a React component that displays a single smoothie recipe. The smoothie prop is used to display the title, method, and rating of the smoothie. 
  
  The onDelete prop is a function that is called when the user clicks the delete button. The handleDelete function sends a delete request to Supabase to delete the smoothie with the given id. 
  
  If the smoothie was successfully deleted, the onDelete function is called with the id of the deleted smoothie. The component also includes a link to the update page for this smoothie.
*/

import { Link } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const SmoothieCard = ({ smoothie, onDelete }) => {

  // Define a function to handle deleting a smoothie
  const handleDelete = async () => {

    /* 
      Send a delete request to Supabase to delete the smoothie with the given id 

      This code is sending a delete request to Supabase to delete rows from the smoothies table where the id column is equal to the given smoothie.id. 
      
      The data returned by the request will contain the deleted rows, and error will contain any errors that occurred during the request.
    */
    const { data, error } = await supabase
      .from('smoothies') // Specify the 'smoothies' table
      .delete() // Delete rows from the table
      .eq('id', smoothie.id) // Only delete rows where the 'id' column is equal to the given smoothie id
      .select() // Return the deleted rows as data

    // If there was an error deleting the smoothie, log it to the console
    if (error) {
      console.log(error)
    }

    // If the smoothie was successfully deleted, call the onDelete function passed as a prop
    if (data) {
      console.log(data)
      onDelete(smoothie.id) // removes the smoothie that was deleted from the frontend
    }
  }

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}
export default SmoothieCard