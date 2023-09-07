import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO, addDays } from 'date-fns';
import { groupAndSumByKey } from '@/lib/utils';

export async function getExpenditureSum(searchParams) {
	try {
		const from = searchParams.from
			? parseISO(searchParams.from)
			: parseISO(new Date().toISOString());

		const to = searchParams.to
			? parseISO(searchParams.to)
			: addDays(parseISO(new Date().toISOString()), 1);

		const expenditures = await prisma.expenditure.findMany({
			where: {
				issueDate: {
					lte: endOfDay(to),
					gte: startOfDay(from),
				},
			},
			include: {
				expenditureType: {
					select: {
						name: true,
					},
				},
			},
		});

		const data = groupAndSumByKey(expenditures, 'expenditureType.name');
		const expenditureSum = [].concat(...data);

		return expenditureSum.length === 0 ? [] : expenditureSum;
	} catch (error) {
		throw new Error(error.message);
	}
}
