import ClientOnly from '@/components/client-only';
import AddProcedureForm from '@/components/procedure/add-procedure-form';

export const metadata = {
	title: 'New Procedure',
};

const Page = () => {
	return (
		<ClientOnly>
			<AddProcedureForm />
		</ClientOnly>
	);
};

export default Page;
