import StatusCard from '../../components/StatusCard';
import { SearchOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import { ReloadOutlined, MenuOutlined } from '@ant-design/icons';

import { Input, Space, Table, Popover } from 'antd';
import { useRef, useState, useEffect, Fragment } from 'react';
import Highlighter from 'react-highlight-words';
import ProfileCard from '../../components/ProfileCard';
import { Api } from '../../apis/Api';
import AppNotification from "../../utility/Notfication";
import AppDrawer from '../../components/Drawer';
import CardHeader from '@material-tailwind/react/CardHeader';
import { Button, Tooltip, Modal } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import { Select } from 'antd';
import { CSVLink, CSVDownload } from "react-csv";
import { CustomersColumns, DebtorsColumns, InvoicesColumns } from '../../partials/Column';
import { useQuery } from 'react-query';
import { fetchData } from '../../services/Actions';




export default function Dashboard() {
    const [businessId, setBusinessId] = useState("63524703f9ca0a740b1149b9");
    const [columns, setColumns] = useState(CustomersColumns);

    const [open, setOpen] = useState(false);
    const [cardData, setCardData] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const { RangePicker } = DatePicker;
    const { Option } = Select;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [data, setData] = useState([]);
    const [businessData, setBusinessData] = useState([]);
    const [tabValue, setTabValue] = useState("customer");
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
            searchValue: "",
            selectedValue: ""
        },

    });



    const onDateChange = (dates, dateStrings) => {
        if (dates) {
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



    const fetchSingleBusinessData = async () => {
        let servicesExtraQuery = `${tabValue}?businessId=${businessId}`
        if (tabValue == 'service') {
            servicesExtraQuery = `product?businessId=${businessId}&productType=SERVICES`
        }
        setLoading(true)
        const data = await Api()
            .get(`/admin/business/${servicesExtraQuery}`)
            .then((data) => {
                if (data) {
                    AppNotification("Success", "success", 'topRight', data?.data?.message)
                    setLoading(false);
                    setData(data?.data?.data.content)
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: 1000,
                        },
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response);
                    let message = error?.response?.data?.error
                    if (!message) message = "Error fetching data";
                    AppNotification("Oops", "error", 'topRight', message + " " + error.response.status);
                } else if (error.request) {
                    console.log(error.request);
                    let message = error?.data?.message
                    if (!message) message = "Please Check Your Network"
                    AppNotification("Oops", "error", 'topRight', message);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
                return [];

            });
    };

    //     // api Call
    //    const { data: totalCustomers, isLoading: statussss, isErrorrrr, } = useQuery(
    //     ["fetchTotalCustomers", tableParams?.pagenation, "admin/business/customer/overview", tableParams?.searchParams],
    //     fetchData, {
    //         onError: (err) => {
    //             alert(err);
    //         },
    //     },
    //     {
    //       keepPreviousData: true,
    //     }
    //   );


    // // api Call
    //    const { data: totalTransactions, isLoading: statusssss, isErrorrrrr, } = useQuery(
    //     ["fetchTotalTransactions", tableParams?.pagenation, "admin/business/transactions/overview", tableParams?.searchParams],
    //     fetchData, {
    //         onError: (err) => {
    //             alert(err);
    //         },
    //     },
    //     {
    //       keepPreviousData: true,
    //     }
    //   );

    useEffect(() => {
        let paramString = window.location.href.split('?')[1];
        let queryString = new URLSearchParams(paramString);
        for (let pair of queryString.entries()) {
            setBusinessId(pair[1])
        }
        fetchSingleBusinessData();
    }, [JSON.stringify(tableParams?.pagination), tabValue]);

    useEffect(() => {
        const BusinessData = JSON.parse(localStorage.getItem("SingleBusiness"))
        setBusinessData(BusinessData);
        // fetchSingleBusinessData();
    }, []);

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
    const options = columns.map(d => <Option value={d.key} key={d.key}>{d.title}</Option>)
    const popoverContent = (
        <div>
            <Card>
                <CardBody>
                    <form>
                        <h6 className="text-huzz-green text-sm mt-2 mb-2 font-light">
                            Search Table
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
                                >
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
                            Filter Table
                        </h6>
                        <div className="flex flex-wrap mt-2">
                            <div className="w-full lg:w-6/12 mb-2 font-light">
                                <Space direction="vertical" size={12}>
                                    <RangePicker
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
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
                    <CSVLink filename={"Users-Huzz-file.csv"} data={data}>
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
                            title="Transactions"
                            amount="0"
                            percentage="0"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                        <StatusCard
                            color="green"
                            icon="groups"
                            title="Customers"
                            amount="0"
                            percentage="0"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="green"
                            icon="paid"
                            title="Debtors"
                            amount="0"
                            percentage="0"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday"
                        />
                        <StatusCard
                            color="green"
                            icon="poll"
                            title="Invoices"
                            amount="0"
                            percentage="0"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                    </div>

                </div>
                <div className='flex'>
                    <Button
                        type="primary"
                        onClick={() => { setTabValue("customer"); setColumns(CustomersColumns) }}
                        icon={<SearchOutlined />}
                        size="large"
                        style={{
                            width: 170,
                            color: (tabValue == "customer") ? "green" : "#fff",
                            backgroundColor: (tabValue == "customer") ? "#fff" : "green",
                            marginRight: "5px",
                            marginleft: "5px",
                            border: "1px solid green",
                            borderColor: "green",
                            borderRadius: "5px"

                        }}
                    >
                        Customers
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => { setTabValue("invoice"); setColumns(InvoicesColumns) }}
                        icon={<SearchOutlined />}
                        size="large"
                        style={{
                            width: 170,
                            color: (tabValue == "invoice") ? "green" : "#fff",
                            backgroundColor: (tabValue == "invoice") ? "#fff" : "green",
                            marginRight: "5px",
                            marginleft: "5px",
                            border: "1px solid green",
                            borderColor: "green",
                            borderRadius: "5px"

                        }}
                    >
                        Invoice
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => { setTabValue("debtor"); setColumns(DebtorsColumns) }}
                        icon={<SearchOutlined />}
                        size="large"
                        style={{
                            width: 170,
                            color: (tabValue == "debtor") ? "green" : "#fff",
                            backgroundColor: (tabValue == "debtor") ? "#fff" : "green",
                            marginRight: "5px",
                            marginleft: "5px",
                            border: "1px solid green",
                            borderColor: "green",
                            borderRadius: "5px"

                        }}
                    >
                        Debtors
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => setTabValue("transaction")}
                        icon={<SearchOutlined />}
                        size="large"
                        style={{
                            width: 170,
                            color: (tabValue == "transaction") ? "green" : "#fff",
                            backgroundColor: (tabValue == "transaction") ? "#fff" : "green",
                            marginRight: "5px",
                            marginleft: "5px",
                            border: "1px solid green",
                            borderColor: "green",
                            borderRadius: "5px"

                        }}
                    >
                        Transactions
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => { setTabValue("service") }}
                        icon={<SearchOutlined />}
                        size="large"
                        style={{
                            width: 170,
                            color: (tabValue == "service") ? "green" : "#fff",
                            backgroundColor: (tabValue == "service") ? "#fff" : "green",
                            marginRight: "2px",
                            marginleft: "2px",
                            border: "1px solid green",
                            borderColor: "green",
                            borderRadius: "5px"
                        }}
                    >
                        Services
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => setTabValue("product")}
                        icon={<SearchOutlined />}
                        size="large"
                        style={{
                            width: 170,
                            color: (tabValue == "product") ? "green" : "#fff",
                            backgroundColor: (tabValue == "product") ? "#fff" : "green",
                            marginRight: "2px",
                            marginleft: "2px",
                            border: "1px solid green",
                            borderColor: "green",
                            borderRadius: "5px"
                        }}
                    >
                        Products
                    </Button>
                </div>
            </div>
            <div className='w-1/2 m-auto flex justify-center'>
                <CardHeader color="green" contentPosition="none">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-white text-2xl capitalize">{businessData.name}'s {tabValue}s</h2>
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
                            dataSource={data} />
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
