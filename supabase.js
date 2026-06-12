import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://gppjuljlqbgtaezcvdjt.supabase.co'
const SUPABASE_KEY = 'sb_publishable_d88M_E0SIy8yZB--VWVzrA_ovJ8sZh3'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)