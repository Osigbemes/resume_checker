import { Button, Tooltip, Space } from 'antd';
 
 
 export const CustomersColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',

    },
    {
      title: 'E Mail',
      dataIndex: 'email',
      key: 'email',
      width: '20%',

    },
    {
      title: 'Transaction Type',
      dataIndex: 'businessTransactionType',
      key: 'businessTransactionType',
      width: '20%',
    },
    {
      title: 'Date Created',
      dataIndex: 'createdDateTime',
      key: 'createdDateTime',
    },
  ];

  export const DebtorsColumns = [
      {
      title: 'BusinessId',
      dataIndex: 'businessId',
      key: 'businessId',
      width: '30%'
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: '30%',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'businessTransactionType',
      key: 'businessTransactionType',
      width: '20%',
    },
    // {
    //   title: 'Paid',
    //   dataIndex: 'paid',
    //   key: 'paid',
    //   width: '20%'
    // },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount'
    },
    {
      title: 'Date',
      dataIndex: 'createdDateTime',
      key: 'createdDateTime',
    },
    {
      title: 'Action',
      key: 'action',
      render: ({_, record}:any) => (
        <Space size="middle">
          <Tooltip title="View User">
            <Button
              type="primary"
              // onClick={() => { setOpen(true); setCardData(record); console.log(record) }}
              // icon={<SearchOutlined />}
              size="small"
              style={{
                width: 80,
                height: 35,
                backgroundColor: "#07a58e",
                border: "#07a58e",
                borderRadius: 6
              }}
            >
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];



  export const InvoicesColumns = [
      {
      title: 'BusinessId',
      dataIndex: 'businessId',
      key: 'businessId',
      width: '30%'
    },
    {
      title: 'Invoice Status',
      dataIndex: 'businessInvoiceStatus',
      key: 'businessInvoiceStatus',
      width: '20%',
    },
    // {
    //   title: 'Paid',
    //   dataIndex: 'paid',
    //   key: 'paid',
    //   width: '20%'
    // },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount'
    },
    {
      title: 'Date',
      dataIndex: 'createdDateTime',
      key: 'createdDateTime',
    },
        {
      title: 'Due Date',
      dataIndex: 'dueDateTime',
      key: 'dueDateTime',
      width: '30%',
    },
    {
      title: 'Action',
      key: 'action',
      render: ({_, record}:any) => (
        <Space size="middle">
          <Tooltip title="View User">
            <Button
              type="primary"
              // onClick={() => { setOpen(true); setCardData(record); console.log(record) }}
              // icon={<SearchOutlined />}
              size="small"
              style={{
                width: 80,
                height: 35,
                backgroundColor: "#07a58e",
                border: "#07a58e",
                borderRadius: 6
              }}
            >
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];