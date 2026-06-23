import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/database.types";

const privateRoutes = [
  "/dashboard",
  "/admin",
  "/temas",
  "/alunos",
  "/professores",
  "/proposta",
];

const publicRoutes = ["/login", "/register"];

function isRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isRootRoute = pathname === "/";
  const isPrivateRoute = isRoute(pathname, privateRoutes);
  const isPublicRoute = publicRoutes.includes(pathname);

  function redirectTo(pathname: string) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname;
    redirectUrl.search = "";

    const response = NextResponse.redirect(redirectUrl);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie);
    });

    return response;
  }

  if (!user && (isRootRoute || isPrivateRoute)) {
    return redirectTo("/login");
  }

  if (user && (isRootRoute || isPublicRoute)) {
    return redirectTo("/dashboard");
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next|img|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$).*)",
  ],
};
