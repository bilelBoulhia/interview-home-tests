import { NextResponse } from 'next/server';


export function middleware(request) {


    // J'ai créé ce middleware pour simplement vérifier s'il y a un cookie de type "credentials". S'il n'y en a pas, il invalide la requête de routage.

    //
    // const credentials = request.cookies.get('credentials')?.value;
    // const pathname = request.nextUrl.pathname;
    // const isAuthPage = pathname === '/';
    //
    //
    // if (credentials && isAuthPage) {
    //     return NextResponse.redirect(new URL('/products', request.url));
    // }
    //
    //
    // const isProtectedRoute = !isAuthPage && !pathname.startsWith('/_next');
    //
    // if (!credentials && isProtectedRoute) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }
    //
    // return NextResponse.next();
}
