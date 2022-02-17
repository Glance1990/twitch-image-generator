import styled from 'styled-components'

const Styling = (Component: any) => styled(Component)`
    position: relative;
    .themeToggler {
        position: absolute;
        right: 10px;
        top: 0;
        background: var(--theme-button);
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        &:hover {
            cursor: pointer;
            background: var(--theme-button-hover);
        }
        .icon {
            font-size: 26px;
            color: white;
        }
    }
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
`

export default Styling
