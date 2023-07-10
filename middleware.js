import { NextResponse, NextRequest } from 'next/server';
import * as jose from 'jose';

/**
 * @param {NextRequest} req
 */
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
		 */
		'/((?!auth|api/auth|_next/static|_next/image|favicon.ico).*)',
	],
};
