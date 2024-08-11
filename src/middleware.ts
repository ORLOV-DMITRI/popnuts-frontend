export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('token')?.value;
    
    if (request.nextUrl.pathname.startsWith('/lk/') && !accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith('/login') && accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}
