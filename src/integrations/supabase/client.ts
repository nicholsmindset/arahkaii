// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ywmarymfhaeolwqwgayr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bWFyeW1maGFlb2x3cXdnYXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NDU1MzAsImV4cCI6MjA2NjUyMTUzMH0.O1z0rY_nhqQmnZFBbr-E8EX0s85olBVs6rZ_-wuNaP8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);