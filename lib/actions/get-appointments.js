import prisma from '@/lib/db/prisma';
import { endOfDay, startOfDay, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';

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
		return appointments;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getAppointmentByID(id) {
	try {
		const appointment = await prisma.appointment.findUnique({
			where: {
				id,
			},
			include: {
				doctor: {
					select: {
						name: true,
					},
				},
				bills: {
					include: {
						appointment: true,
						procedure: true,
					},
				},
				payment: {
					include: {
						partPayment: {
							include: {
								payment: {
									include: {
										appointment: {
											select: {
												isBilled: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		if (!appointment) notFound();

		if (!appointment.isArrived)
			throw new Error(
				'User still not arrived for appointment. How can you bill them ?'
			);

		return appointment;
	} catch (error) {
		throw new Error(error.message);
	}
}
