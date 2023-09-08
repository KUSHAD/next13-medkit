import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO, addDays } from 'date-fns';

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

		let data = [];
		let result = [];
		expenditures.reduce(function (res, value) {
			if (!res[value.expenditureType.name]) {
				res[value.expenditureType.name] = {
					expenditureType: value.expenditureType.name,
					amount: 0,
				};
				result.push(res[value.expenditureType.name]);
			}
			res[value.expenditureType.name].amount += Number(value.amount);
			return res;
		}, {});
		data.push(result);

		let expenditureSum = [];
		data.forEach(_arr => expenditureSum.extend(_arr));

		console.log(expenditureSum);

		return expenditureSum.length === 0 ? [] : expenditureSum;
	} catch (error) {
		throw new Error(error.message);
	}
}
