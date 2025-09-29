import React from 'react';

import { Spin } from 'antd';

interface LoaderProps {
  spinning: boolean;
  tip?: string;
  children?: React.ReactNode;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ spinning, tip, children, fullScreen }) => {
  if (fullScreen) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <Spin size="large" spinning={spinning} tip={tip} />
      </div>
    );
  }

  return (
    <Spin spinning={spinning} tip={tip}>
      {children}
    </Spin>
  );
};

export default Loader;
