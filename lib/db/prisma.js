import { PrismaClient } from '@prisma/client';

/**
 * @type {PrismaClient} prisma
 */
const prisma =
	globalThis.prisma ||
	new PrismaClient({
		log: ['query', 'info', 'warn', 'error'],
		errorFormat: 'colorless',
	});
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
