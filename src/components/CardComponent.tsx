import { Card } from 'antd';

import type { CardProps } from 'antd';

interface Props extends CardProps {
  title: string;
  children: React.ReactNode;
}

const CardComponent: React.FC<Props> = ({ title, children, ...rest }) => {
  return (
    <Card title={title} {...rest}>
      {children}
    </Card>
  );
};

export default CardComponent;
