import StatusCard from '../components/StatusCard';
import { SearchOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import { ReloadOutlined, MenuOutlined } from '@ant-design/icons';

import { Input, Space, Table, Popover } from 'antd';
import React, { useRef, useState, useEffect, Fragment } from 'react';
import Highlighter from 'react-highlight-words';
import SettingsForm from '../components/SettingsForm';
import ProfileCard from '../components/ProfileCard';
import { api } from '../apis/Api';
import AppNotification from "../utility/Notfication";
import AppDrawer from '../components/Drawer';
import CardHeader from '@material-tailwind/react/CardHeader';
import { Button, Tooltip, Modal } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import { Select } from 'antd';
import { fetchData } from '../services/Actions';
import { CSVLink, CSVDownload } from "react-csv";
import { UserColumn } from '../partials/Column';
import { useQuery } from "react-query";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 200,
      searchValue: "",
      selectedValue: "",
      from: "",
      to: "",
    },
    searchParams: {
      searchValue: "femmydhayor@gmail.com",
      selectedValue: "email",
    },
  });


  const onDateChange = (dates, dateStrings) => {
    if (dates) {
      // console.log('From: ', dates[0], ', to: ', dates[1]);
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          from: dateStrings[0] + " 00:00",
          to: dateStrings[1] + " 00:00",
        },
      });
    } else {
      console.log('Clear');
    }
  };


  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  // api Call
  const { data: responseData, isLoading: status, isError, } = useQuery(
    ["fetchUsers", tableParams?.pagination, "/admin/user", tableParams?.searchParams],
    fetchData, {
		onError: (err) => {
			alert(err);
		},
	},
    {
      keepPreviousData: true,
    }
  );

  useEffect(()=>{
  if (status == true) {
    setLoading(true);
  }
    if (status == false) {
    setLoading(false);
  }
    if (isError) {
    setLoading(false);
    // alert(error)
  }
  if (responseData) {
    setLoading(false);
    setData(responseData);
              setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: 1000,
            },
          });
  }
  },[responseData])

  // useEffect(() => {
  //   setLoading(true);
  // }, [JSON.stringify(tableParams?.pagination)]);


  const handleTableChange = (pagination, filters, sorter, searchParams) => {
    setTableParams({
      pagination,
      filters,
      searchParams,
      ...sorter,
    });
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const onChange = (value) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        selectedValue: value,
      },
    });
  };
  const onSelectedValueChange = (e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        searchValue: e.target.value,
        current: "",
      },
    });
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      // width: '30%',
      ...getColumnSearchProps('firstName'),
      sorter: (a, b) => a.firstName - b.firstName,
      sortOrder: sortedInfo.columnKey === 'firstName' ? sortedInfo.order : null,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      // width: '30%',
      ...getColumnSearchProps('lastName'),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      // width: '20%',
      ...getColumnSearchProps('phoneNumber'),
    },
    {
      title: 'E Mail',
      dataIndex: 'email',
      key: 'email',
      // width: '20%',
      ...getColumnSearchProps('email'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
      ...getColumnSearchProps('provider'),
    },
    {
      title: 'Referral',
      dataIndex: 'referralCode',
      key: 'referralCode',
      ...getColumnSearchProps('referralCode'),
    },
    {
      title: 'Date Created',
      key: 'timeCreated',
      render: (_, record) => (
        moment(record.timeCreated).format('DD/MM/YYYY')
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View User">

            <Button
              type="primary"
              onClick={() => { setOpen(true); setCardData(record) }}
              icon={<SearchOutlined />}
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
  const options = columns.map(d => <Option value={d.key} key={d.key}>{d.title}</Option>)
  const popoverContent = (
    <div>
      <Card>
        {/* <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">My Account</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        Settings
                    </Button>
                </div>
            </CardHeader> */}
        <CardBody>
          <form>
            <h6 className="text-huzz-green text-sm mt-2 mb-2 font-light">
              Search Users
            </h6>
            <div className="flex  mt-2">
              <div className="w-full lg:w-6/12 mr-2 mb-2 font-light">
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  style={{ width: 200 }}
                // filterOption={(input, option) =>
                //   (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                // }
                >
                  {/* <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>



    {const options = columns.map(d => <Option key={d.value}>{d.text}</Option>);} */}

                  {options}
                </Select>
              </div>
              <div className="w-full lg:w-6/12 ml-2 mb-2 font-light">
                <Input
                  type="text"
                  color="purple"
                  placeholder="Enter Search Value"
                  onBlur={(e) => onSelectedValueChange(e)}
                />
              </div>
            </div>
            <h6 className="text-huzz-green mt-10 text-sm my-2 font-light">
              Filter Users
            </h6>
            <div className="flex flex-wrap mt-2">
              <div className="w-full lg:w-6/12 mb-2 font-light">
                <Space direction="vertical" size={12}>
                  <RangePicker
                    ranges={{
                      'Today': [moment(), moment()],
                      'This Month': [moment().startOf('month'), moment().endOf('month')],
                      'This Week': [moment().startOf('week'), moment().endOf('week')],
                      'This Quarter': [moment().startOf('quarter'), moment().endOf('quarter')],
                      'This Year': [moment().startOf('year'), moment().endOf('year')],
                    }}
                    onChange={onDateChange}
                  />
                </Space>
              </div>

            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
  const popoverContentMenu = (
    <div>
      <Card>
        <div className='flex'>
          <CSVLink filename={"Users-Huzz-file.csv"} data={data?.content}>
            <Button style={{
              width: 90,
              backgroundColor: "white",
              border: "white", color: "green",
              borderRadius: 6
            }} className="ml-2 bg-huzz-green rounded-lg border text-white" icon={<DownloadOutlined />} > Export</Button>
          </CSVLink>
          <Tooltip title="Refresh">
            <Button onClick={() => {
              setTableParams({
                ...tableParams,
                pagination: {
                  ...tableParams.pagination,
                  current: 1,
                  pageSize: 10,
                  total: "",
                  searchValue: "",
                  selectedValue: "",
                  from: "",
                  to: "",
                },
              });
            }}
              style={{
                width: 90,
                backgroundColor: "white",
                border: "white", color: "green",
                borderRadius: 6
              }} className="ml-2 bg-huzz-green rounded-lg border text-huzz-green" icon={<ReloadOutlined />} > Refresh</Button>
          </Tooltip>
        </div>

      </Card>
    </div>
  );
  return (
    <>
      <div className="bg-huzz-green pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <StatusCard
              color="green"
              icon="trending_up"
              title="Traffic"
              amount="0"
              percentage="0"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
            <StatusCard
              color="green"
              icon="groups"
              title="New Users"
              amount="0"
              percentage="0"
              percentageIcon="arrow_downward"
              percentageColor="red"
              date="Since last week"
            />
            <StatusCard
              color="green"
              icon="paid"
              title="Sales"
              amount="0"
              percentage="0"
              percentageIcon="arrow_downward"
              percentageColor="orange"
              date="Since yesterday"
            />
            <StatusCard
              color="green"
              icon="poll"
              title="Performance"
              amount="0"
              percentage="0"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
          </div>
        </div>
      </div>
      <div className='w-1/2 m-auto flex justify-center'>
        <CardHeader color="green" contentPosition="none">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Huzz Users</h2>
            <div>
              <Tooltip title="Table Options">

                <Popover content={popoverContent} title="Search and filter table" trigger="click">
                  <Button style={{
                    width: 90,
                    backgroundColor: "white",
                    border: "white",
                    color: "green",
                    borderRadius: 6
                  }} className="ml-2 bg-huzz-green rounded-lg border text-white" icon={<SearchOutlined />} > Search</Button>
                </Popover>
              </Tooltip>
              <Popover content={popoverContentMenu} title="More Table Options" trigger="click">
                <Tooltip title="More Options">
                  <Button style={{
                    width: 50,
                    backgroundColor: "white",
                    border: "white", color: "green",
                    borderRadius: 6
                  }} className="ml-2 bg-huzz-green rounded-lg border text-white" icon={<MenuOutlined />} ></Button>
                </Tooltip>
              </Popover>
            </div>
          </div>
        </CardHeader>

      </div>
      <div className="px-3 md:px-8 h-auto -mt-24">
        <div className="container mx-auto max-w-full mt-16">
          <div className="grid grid-cols-1 px-4 mb-16">
            <Table
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              columns={columns}
              dataSource={data.content} />
          </div>
        </div>
      </div>


      <AppDrawer
        open={open}
        setOpen={setOpen}
        title={"User's Detail"}
        showChildrenDrawer={showChildrenDrawer}
        childrenDrawer={childrenDrawer}
        onChildrenDrawerClose={onChildrenDrawerClose}>
        <ProfileCard
          cardData={cardData}
          showChildrenDrawer={showChildrenDrawer} />
      </AppDrawer>

    </>
  );
}
