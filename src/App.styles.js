import styled from 'styled-components'

export default function Styling(element) {
    return styled(element)`
        display: flex;
        margin-top: 30px;
        width: 1600px;
        max-width: 95%;
        margin-left: auto;
        margin-right: auto;
        .col {
            background: var(--color-medium-dark-grey);
            padding: 0 20px;
            &:first-child {
                border-right: 3px solid rgba(255, 255, 255, 0.1);
            }
        }
        .customize-tab {
            width: 60%;
        }
        .demonstration-tab {
            width: 33%;
        }

        .option-wraper {
            display: flex;
            width: 100%;
            margin-bottom: 20px;
            > * {
                width: 50%;
            }
            .wrap-input-output {
                display: flex;
                align-items: center;
                output {
                    margin-left: 10px;
                }
            }
            label,
            input {
                &:hover {
                    cursor: pointer;
                }
            }
            input[type='text'] {
                width: 400px;
                height: 40px;
                padding: 10px;
                background: var(--theme-input);
                color: var(--text-color);
                transition: all 0.3s ease-in-out;
                max-width: 90%;
                border: none;
                border-radius: 5px;
                &:hover {
                    background: var(--theme-input-hover);
                    cursor: pointer;
                }
            }
            input[type='range'] {
                width: 300px;
                height: 40px;
                max-width: 90%;
            }
        }

        // refactor classes into components
        //general tab
        .select-wrapper {
            p {
                margin-top: 0;
                margin-bottom: 10px;
            }
            select {
                width: 400px;
                height: 40px;
                padding: 10px;
                background: var(--theme-input);
                color: var(--text-color);
                transition: all 0.3s ease-in-out;
                max-width: 90%;
                border: none;
                border-radius: 5px;
                &:hover {
                    background: var(--theme-input-hover);
                    cursor: pointer;
                }
            }
        }
        .italic-button {
            max-width: 200px;
            background: var(--primary);
            color: var(--white);
            display: flex;
            height: 40px;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            text-transform: uppercase;
            transition: all 0.3s ease-in-out;
            border: none;
            font-weight: bold;
            &:hover {
                cursor: pointer;
                background: #7877ff;
            }
        }

        // colors tab
        .option-wraper-colors {
            display: flex;
            width: 100%;
            > * {
                width: 50%;
            }
            .color-palet {
                > * {
                    display: block;
                }
            }
            .title {
                margin-bottom: 10px;
            }
            input[type='text'] {
                width: 150px;
                height: 40px;
                padding: 10px;
                background: var(--theme-input);
                color: var(--text-color);
                transition: all 0.3s ease-in-out;
                max-width: 90%;
                border: none;
                border-radius: 5px;
                &:hover {
                    background: var(--theme-input-hover);
                    cursor: pointer;
                }
            }
            .color-inputs {
                display: flex;
                align-items: center;
                input {
                    margin-right: 10px;
                }
            }
            input[type='color'] {
                height: 40px;
                border: none;
            }
        }
    `
}
