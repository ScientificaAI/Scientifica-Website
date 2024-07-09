import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cqdcqwnibdsnijtbgafa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZGNxd25pYmRzbmlqdGJnYWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTgyODMsImV4cCI6MjAzNTA3NDI4M30.s15-GrZmSAUQgXtFCG235m1mtX-9zgUBP1iatghNKQk"
);
