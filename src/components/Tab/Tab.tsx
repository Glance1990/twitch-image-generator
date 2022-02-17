// Props
import { TabProps } from './Tab.props';
// Styles
import Styling from './Tab.styles';

function Tab({ title, opened, children, className }: TabProps): JSX.Element {
  return <div className={className}>{title === opened ? children : null}</div>;
}

export default Styling(Tab);
