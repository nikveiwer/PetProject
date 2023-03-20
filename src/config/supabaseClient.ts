import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// import * as dotenv from 'dotenv';
// dotenv.config();

const supabaseUrl = process.env.PET_PROJECT_SUPABASE_URL as string;
const supabaseKey = process.env.PET_PROJECT_ANON_KEY as string;

const supabas = process.env;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
