import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';

export async function getExpendituresByDate(searchParams) {
	try {
		const date = searchParams.date
			? parseISO(searchParams.date)
			: parseISO(new Date().toISOString());

		const expenditures = await prisma.expenditure.findMany({
			where: {
				issueDate: {
					lte: endOfDay(date),
					gte: startOfDay(date),
				},
			},
			include: {
				expenditureType: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return expenditures;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getExpendituresByID(id) {
	try {
		const expenditure = await prisma.expenditure.findUnique({
			where: {
				id,
			},
			include: {
				expenditureType: {
					select: {
						name: true,
					},
				},
				expenditureDocs: true,
			},
		});

		if (!expenditure) notFound();

		return expenditure;
	} catch (error) {
		throw new Error(error.message);
	}
}
