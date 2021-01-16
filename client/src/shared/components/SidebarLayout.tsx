import React from 'react';

import Sidebar from 'shared/components/Sidebar';
import styled from 'styled-components';
import { TopNav } from './TopNav';

const Main = styled.main`
    display: flex;
    flex-flow: column;
    height: 100vh;
    overflow: hidden;

    @media (min-width: 900px) {
        margin-left: 100px;
    }
`;

export const ScrollableContainer = styled.div`
    padding: 2rem;
    flex: 1 0 0;
    overflow-y: scroll;

    @media (min-width: 900px) {
        padding: 50px;
    }
`;

export const SidebarLayout: React.FC = ({ children }) => {
    return (
        <>
            <Sidebar></Sidebar>
            <Main>
                <TopNav></TopNav>
                <ScrollableContainer>{children}</ScrollableContainer>
            </Main>
        </>
    );
};
