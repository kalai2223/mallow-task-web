import { Table } from 'antd';

import type { TableProps, ColumnsType } from 'antd/es/table';

interface Props<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  rowKey?: string | ((record: T) => string);
}

const TableComponent = <T,>({ columns, data, rowKey = 'id', ...rest }: Props<T>) => {
  return <Table<T> columns={columns} dataSource={data} rowKey={rowKey} {...rest} />;
};

export default TableComponent;
