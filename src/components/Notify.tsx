// src/components/Notify.tsx
import { message } from 'antd';

type NotifyType = 'success' | 'error' | 'warning' | 'info';

interface NotifyProps {
  type: NotifyType;
  content: string;
  duration?: number; // seconds
}

const Notify = ({ type, content, duration = 3 }: NotifyProps) => {
  switch (type) {
    case 'success':
      message.success(content, duration);
      break;
    case 'error':
      message.error(content, duration);
      break;
    case 'warning':
      message.warning(content, duration);
      break;
    case 'info':
      message.info(content, duration);
      break;
    default:
      message.info(content, duration);
  }
};

export default Notify;
