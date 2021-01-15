import styled from 'styled-components';
import { size, color, mixin } from 'shared/utils/style';

type StatusProps = {
    show?: boolean;
};
export const Status = styled.div`
    max-width: 600px;
    margin: 1rem 0;
    background: ${color.w0};
    border-radius: ${size.radius};
    display: ${(props: StatusProps) => (props.show ? 'block' : 'none')};
    overflow: hidden;
    ${mixin.shadow};
`;

export const ProgressBarWrapper = styled.div`
    background: ${color.w2};
    width: 100%;
`;

export const ProgressBar = styled.div`
    height: 8px;
    background: ${color.primary};
`;

export const Values = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    padding: 1rem 2rem;
    ${mixin.shadow};
`;
