import prisma from './prisma';

export async function getDoctors() {
	try {
		const doctors = await prisma.doctor.findMany({
			where: {
				isTrashed: false,
			},
		});
		return doctors;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getTrashedDoctors() {
	try {
		const doctors = await prisma.doctor.findMany({
			where: {
				isTrashed: true,
			},
		});
		return doctors;
	} catch (error) {
		throw new Error(error.message);
	}
}
