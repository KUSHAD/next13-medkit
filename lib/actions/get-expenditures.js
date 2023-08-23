import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO } from 'date-fns';

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
