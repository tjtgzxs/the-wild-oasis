import { createClient } from '@supabase/supabase-js'
export  const supabaseUrl = 'https://rpjarirysdkvhpiajlzs.supabase.co'
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwamFyaXJ5c2RrdmhwaWFqbHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NTA0MzQsImV4cCI6MjA0NjUyNjQzNH0.LCl28FtdLR-58Sw6rAVg3T7nRt09F4228foZR0u_odo"
const supabase = createClient(supabaseUrl, supabaseKey)
export  default  supabase
