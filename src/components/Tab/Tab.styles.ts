import styled from 'styled-components';

const Styling = (Component: any) => styled(Component)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* > * {
      width: 50%;
    } */
  > button {
    max-width: 100px;
    max-height: 50px;
  }
  label {
    width: 50%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr {
    width: 100%;
  }
`;

export default Styling;
