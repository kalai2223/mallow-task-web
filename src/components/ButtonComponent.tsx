import { Button } from 'antd';

import type { ButtonProps } from 'antd';

interface Props extends ButtonProps {
  label: string;
}

const ButtonComponent: React.FC<Props> = ({ label, ...rest }) => {
  return <Button {...rest}>{label}</Button>;
};

export default ButtonComponent;
