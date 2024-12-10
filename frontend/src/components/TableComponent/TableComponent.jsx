import React from 'react';
import { Table } from 'antd';
import Loading from '../../components/LoadingComponent/Loading';

const TableComponent = ({ selectionType = 'checkbox', data = [], isPending = false, columns = [], onRowClick }) => {
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Loading>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            if (onRowClick) {
              onRowClick(record._id);  // Pass the selected row's ID to the callback
              console.log('Selected Product ID:', record._id); // Log the ID for debugging
            }
          },
        })}
      />
    </Loading>
  );
};

export default TableComponent;
