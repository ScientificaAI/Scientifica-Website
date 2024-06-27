import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  const first_name = formData.get("first_name")?.toString();
  const last_name = formData.get("last_name")?.toString();
  const email = formData.get("email")?.toString();
  const country = formData.get("country")?.toString();

  if (!first_name || !last_name) {
    return new Response("Correo electrónico y contraseña obligatorios", {
      status: 400,
    });
  }

  const { error } = await supabase.from("clients").insert({
    first_name,
    last_name,
    email,
    country,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/");
};
