import ClientOnly from '@/components/client-only';
import DoctorsTable from '@/components/doctor/doctors-table';
import { getDoctors } from '@/lib/actions/get-doctors';
import ErrorContainer from '@/components/error-container';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const doctors = await getDoctors();

	if (doctors.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer title='No Doctors' desc='No doctors were found' />
			</ClientOnly>
		);
	return (
		<ClientOnly>
			<DoctorsTable data={doctors} />
		</ClientOnly>
	);
};

export default Page;
