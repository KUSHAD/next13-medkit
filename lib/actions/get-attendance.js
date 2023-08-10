import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO } from 'date-fns';

export async function getAttendanceByDate(searchParams) {
	try {
		const date = searchParams.date
			? parseISO(searchParams.date)
			: parseISO(new Date().toISOString());

		const attendance = await prisma.attendance.findMany({
			where: {
				dateOfAttendance: {
					lte: endOfDay(date),
					gte: startOfDay(date),
				},
			},
			include: {
				doctor: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		return attendance;
	} catch (error) {
		throw new Error(error.message);
	}
}
