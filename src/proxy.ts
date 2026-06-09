import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const CONSUMER_ROUTES = ["/portaal"];
const DEALER_ROUTES = ["/dealer/dashboard", "/dealer/leads", "/dealer/matches", "/dealer/voorraad", "/dealer/credits", "/dealer/facturen", "/dealer/instellingen"];
const ADMIN_ROUTES = ["/admin"];

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // If env vars not set, skip auth (demo mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")) {
    return supabaseResponse;
  }

  const isConsumerRoute = CONSUMER_ROUTES.some(r => path.startsWith(r));
  const isDealerRoute = DEALER_ROUTES.some(r => path.startsWith(r));
  const isAdminRoute = ADMIN_ROUTES.some(r => path.startsWith(r));

  if ((isConsumerRoute || isDealerRoute || isAdminRoute) && !user) {
    const loginUrl = isDealerRoute
      ? "/dealer/inloggen"
      : isAdminRoute
        ? "/admin/inloggen"
        : "/inloggen";
    return NextResponse.redirect(new URL(`${loginUrl}?redirect=${path}`, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
