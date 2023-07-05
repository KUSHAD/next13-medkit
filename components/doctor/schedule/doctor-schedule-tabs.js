'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddDoctorSchedule from './add-doctor-schedule';
import DoctorScheduleTable from './doctor-schedule-table';

const DoctorScheduleTabs = ({ doctorID }) => {
	return (
		<Tabs defaultValue='manage' className='w-full'>
			<TabsList className='grid w-full grid-cols-3'>
				<TabsTrigger value='manage'>Manage Schedules</TabsTrigger>
				<TabsTrigger value='new'>Add Schedule</TabsTrigger>
				<TabsTrigger value='trash'>Trashed Schedules</TabsTrigger>
			</TabsList>
			<TabsContent value='manage'>
				<DoctorScheduleTable doctorID={doctorID} />
			</TabsContent>
			<TabsContent value='new'>
				<AddDoctorSchedule doctorID={doctorID} />
			</TabsContent>
			<TabsContent value='trash'>
				<DoctorScheduleTable doctorID={doctorID} isTrashed />
			</TabsContent>
		</Tabs>
	);
};

export default DoctorScheduleTabs;
