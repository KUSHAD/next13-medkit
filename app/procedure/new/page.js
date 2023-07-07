import ClientOnly from '@/components/client-only';
import AddProcedureForm from '@/components/procedure/add-procedure-form';

const Page = () => {
	return (
		<ClientOnly>
			<AddProcedureForm />
		</ClientOnly>
	);
};

export default Page;
