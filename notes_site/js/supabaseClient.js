const SUPABASE_URL = 'https://swuxvguqarotpwttrtaj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3dXh2Z3VxYXJvdHB3dHRydGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1Nzc2OTAsImV4cCI6MjA4MDE1MzY5MH0.GenIBncEKc_FhQ3Xfr-l7FF56hOdL7LiUfFIz_4nF0o';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase client initialized successfully!');