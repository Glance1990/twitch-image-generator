import styled from "styled-components";

export default function Styling(element) {
  return styled(element)`
    display: flex;
    margin-top: 30px;
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
    .canvasWraper {
      padding: 30px 0;
      background: var(--color-black);
      display: flex;
      justify-content: center;
    }
    canvas {
      /* background: #101220; */
    }
  `;
}
