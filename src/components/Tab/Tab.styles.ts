import styled from "styled-components";

const Styling = (Component: any) => {
  return styled(Component)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > * {
      width: 50%;
    }
    > button {
      max-width: 100px;
      max-height: 50px;
    }
    label {
      width: 50%;
    }
  `;
};

export default Styling;
