import React from 'react';

import Dashboard from 'Dashboard/components/Dashboard';
import { ResultsProvider } from 'Dashboard/ResultsContext';
import { SidebarLayout } from 'shared/components/SidebarLayout';

const DashboardPage = () => {
    return (
        <ResultsProvider>
            <SidebarLayout>
                <Dashboard></Dashboard>
            </SidebarLayout>
        </ResultsProvider>
    );
};

export default DashboardPage;
