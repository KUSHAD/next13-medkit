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
						isTrashed: true,
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
					isTrashed: value.expenditureType.isTrashed,
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
				appointment: {
					isBilled: true,
				},
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
		let _data = [];
		let _result = [];
		payments.map(payment =>
			payment.bills.reduce((_res, _value) => {
				if (!_res[_value.procedure.name]) {
					_res[_value.procedure.name] = {
						procedureName: _value.procedure.name,
						totalAmount: 0,
						technicianAmount: 0,
						officeAmount: 0,
						doctorAmount: 0,
						isTrashed: _value.procedure.isTrashed,
						treatment: _value.procedure.treatment,
						quantity: _value.quantity,
					};
					_result.push(_res[_value.procedure.name]);
				}
				const totalAmount = _value.finalValue * _value.quantity;
				_res[_value.procedure.name].totalAmount += Number(totalAmount);
				_res[_value.procedure.name].technicianAmount += Number(
					_value.procedure.isTechnicianRatePercentageValue
						? totalAmount * (_value.procedure.technicianRate / 100)
						: _value.procedure.technicianRate * _value.quantity
				);
				_res[_value.procedure.name].officeAmount += Number(
					_value.procedure.isOfficeRatePercentageValue
						? totalAmount * (_value.procedure.officeRate / 100)
						: _value.procedure.officeRate * _value.quantity
				);
				_res[_value.procedure.name].doctorAmount += Number(
					_value.procedure.isDoctorRatePercentageValue
						? totalAmount * (_value.procedure.doctorRate / 100)
						: _value.procedure.doctorRate * _value.quantity
				);
				return _res;
			}, {})
		);

		_data.push(_result);

		const paymentSplit = Object.values(
			_data[0].reduce((acc, item) => {
				const key = `${item.procedureName}-${item.treatment}`;

				if (!acc[key]) {
					acc[key] = {
						procedureName: item.procedureName,
						treatment: item.treatment,
						totalAmount: 0,
						technicianAmount: 0,
						officeAmount: 0,
						doctorAmount: 0,
						isTrashed: item.isTrashed,
						quantity: 0,
					};
				}

				acc[key].totalAmount += item.totalAmount;
				acc[key].technicianAmount += item.technicianAmount;
				acc[key].officeAmount += item.officeAmount;
				acc[key].doctorAmount += item.doctorAmount;
				acc[key].quantity += item.quantity;

				return acc;
			}, {})
		);

		console.log(paymentSplit);

		return paymentSplit;
	} catch (error) {
		throw new Error(error.message);
	}
}
