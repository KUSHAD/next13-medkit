import prisma from '@/lib/db/prisma';

export async function getBillsByAppointment(id) {
	try {
		const bills = await prisma.bill.findMany({
			where: {
				isTrashed: false,
				appointmentID: id,
			},

			include: {
				procedure: {
					select: {
						name: true,
						rate: true,
						variableRate: true,
					},
				},
			},
		});

		return bills;
	} catch (error) {
		throw new Error(error.message);
	}
}
