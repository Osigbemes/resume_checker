import ChartLine from '../components/ChartLine';
import ChartBar from '../components/ChartBar';
import UsersOverviewCard from '../components/UsersOverviewCard';
import TrafficCard from '../components/TrafficCard';
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

  var curr = new Date; // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6
  var firstWeekDay = new Date(curr.setDate(first)).toISOString().split('T')[0] + " 00:00";
  var lastWeekDay = new Date(curr.setDate(last)).toISOString().split('T')[0] + " 00:00";
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 200,
      searchValue: "",
      selectedValue: "",
      from: firstWeekDay,
      to: lastWeekDay,
    },
    searchParams: {
      searchValue: "femmydhayor@gmail.com",
      selectedValue: "email",
    },
  });
  const [tableParamsTwo, setTableParamsTwo] = useState({
    pagination: {
      from: "2021-10-16 01:00",
      to: "2022-12-01 04:59",
    },
  });


  // api Call
  const { data: responseData, isLoading: status, isError, } = useQuery(
    ["fetchUsers", tableParams?.pagination, "/admin/user"],
    fetchData, {
    onError: (err) => {
      alert(err);
    },
  },
    {
      keepPreviousData: true,
    }
  );


  // api Call
  const { data: totalUsers, isLoading: statuss, isErrorr, } = useQuery(
    ["fetchTotalUsers", tableParamsTwo?.pagination, "admin/user/overview"],
    fetchData, {
    onError: (err) => {
      alert(err);
    },
  },
    {
      keepPreviousData: true,
    }
  );

  // api Call
  const { data: totalBusiness, isLoading: statusss, isErrorrr, } = useQuery(
    ["fetchTotalBusiness", tableParamsTwo?.pagination, "admin/business/overview"],
    fetchData, {
    onError: (err) => {
      alert(err);
    },
  },
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div className="bg-huzz-green px-3 md:px-8 h-40" />

      {/* <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <ChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <ChartBar />
                        </div>
                    </div>
                </div>
            </div> */}
      <div className="px-3 md:px-8 -mt-24">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
            <StatusCard
              color="green"
              icon="trending_up"
              title="Users"
              amount={totalUsers?.numberOfUsers}
              percentage={responseData?.content?.length}
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="New Users"
            />
            <StatusCard
              color="green"
              icon="groups"
              title="Businesses"
              amount={totalBusiness?.numberOfUsers}
              percentage={responseData?.content?.length}
              percentageIcon="arrow_downward"
              percentageColor="red"
              date="Active Businesses"
            />
            <StatusCard
              color="green"
              icon="paid"
              title="Customers"
              amount="0"
              percentage="0%"
              percentageIcon="arrow_downward"
              percentageColor="orange"
              date="Since yesterday"
            />
            <StatusCard
              color="green"
              icon="poll"
              title="Transactions"
              amount="0"
              percentage="0%"
              percentageIcon="arrow_upward"
              percentageColor="green"
              date="Since last month"
            />
          </div>
        </div>
      </div>

      {/* <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                        <StatusCard
                            color="green"
                            icon="trending_up"
                            title="Traffic"
                            amount="0"
                            percentage="0%"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                        <StatusCard
                            color="green"
                            icon="groups"
                            title="New Users"
                            amount="0"
                            percentage="0%"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="green"
                            icon="paid"
                            title="Sales"
                            amount="0"
                            percentage="0%"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday"
                        />
                        <StatusCard
                            color="green"
                            icon="poll"
                            title="Performance"
                            amount="0"
                            percentage="0%"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                    </div>
                </div>
            </div> */}

      <div className="px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <UsersOverviewCard data={responseData?.content} />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <TrafficCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
