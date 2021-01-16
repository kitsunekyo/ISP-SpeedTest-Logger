import React, { useContext } from 'react';
import { RefreshCcw } from 'react-feather';

import { SidebarLayout } from 'shared/components/SidebarLayout';
import { PageTitle, SectionTitle } from 'shared/components/styles';
import Button from 'shared/components/Button';
import { resultsContext, ResultsProvider } from 'Dashboard/ResultsContext';
import Speedtest from 'Dashboard/components/Speedtest';
import ScheduleSelector from 'Dashboard/components/ScheduleSelector';
import AveragePerformance from 'Dashboard/components/AveragePerformance';
import TestHistory from 'Dashboard/components/TestHistory';

const DashboardPage = () => {
    const { loadResults } = useContext(resultsContext);

    const handleReload = () => {
        loadResults();
    };

    // if (state.isLoading) return <Message title="Loading speedtest results" icon={<Loader />} />;
    // if (state.error)
    //     return <Message title="Error loading speedtest results" icon={<AlertOctagon />} />;

    return (
        <ResultsProvider>
            <SidebarLayout>
                <PageTitle>Network Quality Dashboard</PageTitle>
                <Button
                    onClick={handleReload}
                    icon={<RefreshCcw size={14} />}
                    style={{ float: 'left', marginRight: '.5rem' }}
                />
                <Speedtest />

                <SectionTitle>Automated Speedtest</SectionTitle>
                <ScheduleSelector />

                <SectionTitle>Average Performance</SectionTitle>
                <AveragePerformance />

                <SectionTitle>Test History</SectionTitle>
                <TestHistory />
            </SidebarLayout>
        </ResultsProvider>
    );
};

export default DashboardPage;
