'use client';

import { procedureValidationSchema } from '@/lib/schema/procedure-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '../ui/card';
import ProcedureForm from './procedure-form';
import { specializations } from '@/lib/constants/specializations';
import axios from 'axios';

const AddProcedureForm = () => {
	const resolver = yupResolver(procedureValidationSchema);
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			doctorRate: 0,
			rate: 0,
			treatment: specializations[0],
			isDoctorRatePercentageValue: false,
			isOfficeRatePercentageValue: false,
			isTechnicianRatePercentageValue: false,
			name: '',
			officeRate: 0,
			technicianRate: 0,
			variableRate: false,
		},
		resolver,
	});

	const onSubmit = async data => {
		try {
			await axios.post('/api/procedure', data);
			form.reset();
			toast({
				title: 'Procedure Created',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: error.response ? error.response.data.message : error.message,
				variant: 'destructive',
			});
		}
	};
	return (
		<Card className='mt-4'>
			<CardContent className='p-4'>
				<ProcedureForm form={form} onSubmit={onSubmit} />
			</CardContent>
		</Card>
	);
};

export default AddProcedureForm;
