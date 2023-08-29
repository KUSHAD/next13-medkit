import ClientOnly from '@/components/client-only';
import ExpenditureDetails from '@/components/expenditure/view/expenditure-details';
import AddExpeditureDocs from '@/components/expenditure/view/add-expediture-docs';

const ExpenditureViewContainer = ({ expenditure }) => {
	return (
		<>
			<ExpenditureDetails expenditure={expenditure} />
			<ClientOnly>
				<AddExpeditureDocs />
			</ClientOnly>
		</>
	);
};
export default ExpenditureViewContainer;
