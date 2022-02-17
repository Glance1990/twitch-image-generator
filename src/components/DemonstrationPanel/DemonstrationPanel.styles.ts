import styled from 'styled-components'

const Styling = (Component: any) => styled(Component)`
    .nod {
        &_title {
            font-size: 36px;
            margin-bottom: 25px;
        }
        &_text {
            color: var(--light-grey);
            margin-bottom: 20px;
        }
    }
    .button {
        background: var(--primary);
        color: var(--white);
        display: flex;
        height: 40px;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: all 0.3s ease-in-out;
        &:hover {
            cursor: pointer;
            background: #7877ff;
        }
    }
`

export default Styling
