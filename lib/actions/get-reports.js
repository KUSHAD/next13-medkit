import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO, addDays, format } from 'date-fns';

export async function getExpenditureSum(searchParams) {
	try {
		const from = searchParams.from
			? parseISO(searchParams.from)
			: addDays(parseISO(new Date().toISOString()), -1);

		const to = searchParams.to
			? parseISO(searchParams.to)
			: parseISO(new Date().toISOString());

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

export async function getAttendanceReports(searchParams) {
	try {
		const from = searchParams.from
			? parseISO(searchParams.from)
			: addDays(parseISO(new Date().toISOString()), -1);

		const to = searchParams.to
			? parseISO(searchParams.to)
			: parseISO(new Date().toISOString());

		const attendances = await prisma.attendance.findMany({
			where: {
				dateOfAttendance: {
					lte: endOfDay(to),
					gte: startOfDay(from),
				},
			},
			orderBy: {
				dateOfAttendance: 'asc',
			},
			include: {
				doctor: {
					select: {
						name: true,
					},
				},
			},
		});

		let data = [];
		let result = [];
		attendances.reduce(function (res, value) {
			if (!res[value.doctor.name]) {
				res[value.doctor.name] = {
					doctorName: value.doctor.name,
					presentOn: [format(value.dateOfAttendance, 'dd/LL/y')],
				};
				result.push(res[value.doctor.name]);
			}
			res[value.doctor.name].presentOn.push(
				format(value.dateOfAttendance, 'dd/LL/y')
			);
			res[value.doctor.name].presentOn = [
				...new Set(res[value.doctor.name].presentOn),
			];
			return res;
		}, {});
		data.push(result);

		let attendanceReport = [];
		data.forEach(_arr => attendanceReport.extend(_arr));

		console.log(attendanceReport);

		return attendanceReport;
	} catch (error) {
		throw new Error(error.message);
	}
}
