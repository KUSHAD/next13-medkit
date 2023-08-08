import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
} from '@/components/ui/table';
const AppointmentDetails = ({ appointment }) => {
	return (
		<>
			<h3 className='text-muted-primary text-lg'>Appointment Details</h3>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Patient Name</TableHead>
							<TableHead>Patient Mobile Number</TableHead>
							<TableHead>Doctor Name</TableHead>
							<TableHead>Slot</TableHead>
							<TableHead>Problem Type</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>{appointment.name}</TableCell>
							<TableCell>{appointment.mobile}</TableCell>
							<TableCell>{appointment.doctor.name}</TableCell>
							<TableCell>{appointment.slot}</TableCell>
							<TableCell>{appointment.problemType}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
			<div className='w-full my-2'>
				<strong>Issues Facing</strong> -{' '}
				<em>{appointment.description || 'Not mentioned'}</em>
			</div>
			<div className='w-full'>
				<strong>Address</strong> -{' '}
				<em>{appointment.address || 'Not mentioned'}</em>
			</div>
		</>
	);
};

export default AppointmentDetails;
