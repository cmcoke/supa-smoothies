/*

  This code is creating a new Supabase client using the createClient function from the supabase-js library. 
  
  The Supabase URL and key are set using environment variables, and then passed to the createClient function to create the client. 
  
  As a result, this code is creating a Supabase client that can be used to interact with the Supabase backend from the front-end of a project.

*/


import { createClient } from '@supabase/supabase-js'

// Set the Supabase URL and key using environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY

// Create a new Supabase client using the URL and key
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase