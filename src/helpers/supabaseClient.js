
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const URL = 'https://pwaqksaemuprrnkmmhav.supabase.co'
export const supabase = createClient(URL, import.meta.env.VITE_KEY)
