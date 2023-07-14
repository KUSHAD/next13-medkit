import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import StaffTable from '@/components/staff/staff-table';
import { getTrashedStaff } from '@/lib/actions/get-staffs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const staff = await getTrashedStaff();
	if (staff.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer title='No Staffs' desc='No staffs were found' />
			</ClientOnly>
		);
	return (
		<ClientOnly>
			<StaffTable data={staff} />
		</ClientOnly>
	);
};

export default Page;
