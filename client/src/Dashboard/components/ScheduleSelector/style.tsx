import styled from 'styled-components';
import { darken } from 'polished';

import { color, size } from 'shared/utils/style';

export const Selector = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
`;

type OptionProps = {
    selected: boolean;
};
export const Option = styled.div`
    display: inline-flex;
    align-items: center;
    height: 45px;
    padding: 0.25rem 1rem;
    background: ${(props: OptionProps) => (props.selected ? color.primary : color.w2)};
    color: ${(props: OptionProps) => (props.selected ? color.w0 : color.textPrimary)};
    border-radius: ${size.radius};
    cursor: pointer;

    :hover {
        background: ${(props) => darken(0.05, props.selected ? color.primary : color.w2)};
    }

    &,
    * {
        cursor: pointer;
    }
`;

export const Label = styled.label`
    margin-left: 0.25rem;
`;
