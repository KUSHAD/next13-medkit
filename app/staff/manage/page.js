import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import StaffTable from '@/components/staff/staff-table';
import { getStaffs } from '@/lib/get-staffs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const staff = await getStaffs();
	if (staff.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer title='No Staff' desc='No staff were found' />
			</ClientOnly>
		);
	return (
		<ClientOnly>
			<StaffTable data={staff} />
		</ClientOnly>
	);
};

export default Page;
