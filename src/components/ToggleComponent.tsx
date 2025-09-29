import { Switch } from 'antd';

import type { SwitchProps } from 'antd';

interface Props extends SwitchProps {
  onText?: string;
  offText?: string;
}

const ToggleComponent: React.FC<Props> = ({ onText = 'On', offText = 'Off', ...rest }) => {
  return <Switch checkedChildren={onText} unCheckedChildren={offText} {...rest} />;
};

export default ToggleComponent;
