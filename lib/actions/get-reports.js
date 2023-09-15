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

export async function getPaymentSplits(searchParams) {
	try {
		const from = searchParams.from
			? parseISO(searchParams.from)
			: addDays(parseISO(new Date().toISOString()), -1);

		const to = searchParams.to
			? parseISO(searchParams.to)
			: parseISO(new Date().toISOString());

		const payments = await prisma.payment.findMany({
			where: {
				dateOfPayment: {
					lte: endOfDay(to),
					gte: startOfDay(from),
				},
				isPartPaymentEnabled: false,
			},
			orderBy: {
				dateOfPayment: 'asc',
			},
			include: {
				bills: {
					include: {
						procedure: true,
					},
				},
			},
		});
		let data = [];
		let result = [];
		payments.reduce(function (res, value) {
			res = value.bills.reduce((_res, _value) => {
				if (!res[_value.procedure.name]) {
					res[_value.procedure.name] = {
						procedureName: _value.procedure.name,
						totalAmount: 0,
						technicianAmount: 0,
						officeAmount: 0,
						doctorAmount: 0,
						isTrashed: _value.procedure.isTrashed,
						treatment: _value.procedure.treatment,
					};
					result.push(res[_value.procedure.name]);
				}
				const totalAmount = _value.finalValue * _value.quantity;
				res[_value.procedure.name].totalAmount += Number(totalAmount);
				res[_value.procedure.name].technicianAmount += Number(
					_value.procedure.isTechnicianRatePercentageValue
						? totalAmount * (_value.procedure.technicianRate / 100)
						: _value.procedure.technicianRate * _value.quantity
				);
				res[_value.procedure.name].officeAmount += Number(
					_value.procedure.isOfficeRatePercentageValue
						? totalAmount * (_value.procedure.officeRate / 100)
						: _value.procedure.officeRate * _value.quantity
				);
				res[_value.procedure.name].doctorAmount += Number(
					_value.procedure.isDoctorRatePercentageValue
						? totalAmount * (_value.procedure.doctorRate / 100)
						: _value.procedure.doctorRate * _value.quantity
				);

				return _res;
			}, {});
			return res;
		}, {});

		data.push(result);

		let paymentSplit = [];

		data.forEach(_arr => paymentSplit.extend(_arr));

		console.log(paymentSplit);

		return payments;
	} catch (error) {
		throw new Error(error.message);
	}
}
