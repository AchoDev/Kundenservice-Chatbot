
import { createClient } from "@supabase/supabase-js";

export default function createDBConnection() {
    const supabaseUrl = "https://rjbbexmgkxcuomydzzcl.supabase.co"
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey as string)

    return supabase
}
    