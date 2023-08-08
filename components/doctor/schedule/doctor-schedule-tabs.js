'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddDoctorSchedule from './add-doctor-schedule';
import DoctorScheduleTable from './doctor-schedule-table';

const DoctorScheduleTabs = ({ doctorID }) => {
	return (
		<Tabs defaultValue='manage' className='w-full'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='manage'>Manage</TabsTrigger>
				<TabsTrigger value='new'>Add</TabsTrigger>
			</TabsList>
			<TabsContent value='manage'>
				<DoctorScheduleTable doctorID={doctorID} />
			</TabsContent>
			<TabsContent value='new'>
				<AddDoctorSchedule doctorID={doctorID} />
			</TabsContent>
		</Tabs>
	);
};

export default DoctorScheduleTabs;
