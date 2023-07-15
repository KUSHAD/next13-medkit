import ClientOnly from '@/components/client-only';
import DoctorsTable from '@/components/doctor/doctors-table';
import ErrorContainer from '@/components/error-container';
import { getTrashedDoctors } from '@/lib/actions/get-doctors';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const users = await getTrashedDoctors();
	if (users.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer title='No Doctors' desc='No doctors were found' />
			</ClientOnly>
		);
	return (
		<ClientOnly>
			<DoctorsTable data={users} />
		</ClientOnly>
	);
};

export default Page;
