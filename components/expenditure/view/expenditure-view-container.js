import ClientOnly from '@/components/client-only';
import ExpenditureDetails from '@/components/expenditure/view/expenditure-details';
import AddExpeditureDocs from '@/components/expenditure/view/add-expediture-docs';
import ShowExpenditureDocs from '@/components/expenditure/view/show-expenditure-docs';

const ExpenditureViewContainer = ({ expenditure }) => {
	return (
		<>
			<ExpenditureDetails expenditure={expenditure} />
			<ClientOnly>
				<AddExpeditureDocs />
				<ShowExpenditureDocs docs={expenditure.expenditureDocs} />
			</ClientOnly>
		</>
	);
};
export default ExpenditureViewContainer;
