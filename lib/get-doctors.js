import client from './prisma';

export async function getDoctors() {
	try {
		const doctors = await client.doctor.findMany({
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
		const doctors = await client.doctor.findMany({
			where: {
				isTrashed: true,
			},
		});
		return doctors;
	} catch (error) {
		throw new Error(error.message);
	}
}
