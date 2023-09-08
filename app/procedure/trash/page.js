import { getTrashedProcedures } from '@/lib/actions/get-procedures';
import ClientOnly from '@/components/client-only';
import ErrorContainer from '@/components/error-container';
import ProcedureTable from '@/components/procedure/procedure-table';

export const metadata = {
	title: 'Trashed Procedures',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async () => {
	const procedures = await getTrashedProcedures();
	if (procedures.length === 0)
		return (
			<ClientOnly>
				<ErrorContainer title='No Procedures' desc='No procedures were found' />
			</ClientOnly>
		);
	return (
		<ClientOnly>
			<ProcedureTable data={procedures} />
		</ClientOnly>
	);
};

export default Page;
