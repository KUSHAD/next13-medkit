import { getDate, getMonth, getYear } from 'date-fns';

const ExpenditureDetails = ({ expenditure }) => {
	return (
		<>
			<div className='w-full my-2'>
				<strong>Expenditure Type</strong> -{' '}
				<em>{expenditure.expenditureType.name}</em>
			</div>
			<div className='w-full my-2'>
				<strong>Payee Name</strong> - <em>{expenditure.name}</em>
			</div>
			<div className='w-full my-2'>
				<strong>Payee Mobile Number</strong> -{' '}
				<em>{expenditure.mobileNumber}</em>
			</div>
			<div className='w-full my-2'>
				<strong>Amount Paid</strong> - <em>{expenditure.amount}</em>
			</div>
			<div className='w-full my-2'>
				<strong>Mode Of Payment</strong> - <em>{expenditure.modeOfPayment}</em>
			</div>
			<div className='w-full my-2'>
				<strong>Date of Payment</strong> -{' '}
				<em>{`${getDate(expenditure.issueDate)}/${
					getMonth(expenditure.issueDate) + 1
				}/${getYear(expenditure.issueDate)}`}</em>
			</div>
			<div className='w-full my-2'>
				<strong>Cheque Number</strong> -{' '}
				<em>{expenditure.chequeNo || 'Not mentioned'}</em>
			</div>
			<div className='w-full my-2'>
				<strong>UPI ID</strong> -{' '}
				<em>{expenditure.upiID || 'Not mentioned'}</em>
			</div>
			<div className='w-full my-2'>
				<strong>Bank Transaction ID</strong> -{' '}
				<em>{expenditure.bankTransactionID || 'Not mentioned'}</em>
			</div>
		</>
	);
};
export default ExpenditureDetails;
