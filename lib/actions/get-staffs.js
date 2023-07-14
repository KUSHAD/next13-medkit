import prisma from '@/lib/db/prisma';

export async function getStaffs() {
	try {
		const staffs = await prisma.staff.findMany({
			where: {
				isTrashed: false,
			},
		});
		return staffs;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getTrashedStaff() {
	try {
		const staffs = await prisma.staff.findMany({
			where: {
				isTrashed: true,
			},
		});
		return staffs;
	} catch (error) {
		throw new Error(error.message);
	}
}
