// Props
import { TabProps } from "./Tab.props";
// Styles
import Styling from "./Tab.styles";

const Tab = ({ title, opened, children, className }: TabProps): JSX.Element => {
  console.log(className);
  return <div className={className}>{title === opened ? children : null}</div>;
};

export default Styling(Tab);
