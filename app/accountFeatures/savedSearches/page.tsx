import SSNavigation from '../../../src/components/savedSearchesPage/SSNavigation';
import SavedSearches from '../../../src/components/savedSearchesPage/SavedSearches';
import { propagateChangeConfirmed } from 'mobx/dist/internal';

export default async function SavedSearchesPage() {
    return (
        <>
            <SSNavigation />
            <SavedSearches />
        </>
    );
}
