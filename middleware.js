import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(req) {
	try {
		const res = NextResponse.next();

		const cookie = req.cookies.get('staffToken');

		if (!cookie.value) {
			if (req.nextUrl.pathname.startsWith('/api/'))
				return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
					status: 401,
				});
			else return NextResponse.redirect(new URL('/auth', req.url));
		}

		await jose.jwtVerify(
			cookie.value,
			new TextEncoder().encode(process.env.AUTH_SECRET)
		);

		return res;
	} catch {
		if (req.nextUrl.pathname.startsWith('/api/'))
			return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
				status: 401,
			});
		else return NextResponse.redirect(new URL('/auth', req.url));
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - auth/ (auth ui page)
		 * - api/auth (auth API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - manifest.json
		 * - png image  files declared in manifest
		 * - og images
		 * - twitter images
		 * - apple touch icon
		 */
		'/((?!auth|api/auth|_next/static|_next/image|favicon.ico|manifest.json|icon.png|apple-icon.png|icon-192x192.png|icon-256x256.png|icon-384x384.png|icon-512x512.png|opengraph-image.png|twitter-image.png|opengraph-image.alt.txt|twitter-image.alt.txt).*)',
	],
};
