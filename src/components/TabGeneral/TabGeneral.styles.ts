import styled from 'styled-components'

const Styling = (Component: any) => styled(Component)`
    background-color: var(--color-button);
    color: var(--color-white);
    text-transform: capitalize;
    border: none;
    padding: 12px 36px;
    font-size: 14px;
    font-weight: bold;
    margin-right: 2px;
    margin-bottom: 10px;
    display: inline-flex;
    transition: all 0.3s ease-in-out;
    &.active {
        background-color: var(--color-button-active);
    }
    &:hover {
        cursor: pointer;
        &:not(.active) {
            background-color: var(--color-button-hover);
        }
    }
    svg {
        margin-right: 10px;
        font-size: 18px;
    }
`

export default Styling
