import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO } from 'date-fns';

export async function getAppointmentByDate(searchParams) {
	try {
		const date = searchParams.date
			? parseISO(searchParams.date)
			: parseISO(new Date().toISOString());

		const appointments = await prisma.appointment.findMany({
			where: {
				dateOfAppointment: {
					lte: endOfDay(date),
					gte: startOfDay(date),
				},
				isTrashed: false,
			},
			include: {
				user: {
					select: {
						name: true,
					},
				},
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
		return appointments;
	} catch (error) {
		throw new Error(error.message);
	}
}
