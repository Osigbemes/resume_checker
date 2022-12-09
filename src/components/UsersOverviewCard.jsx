import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import { useNavigate } from 'react-router-dom';
import moment from "moment"
import SpinFC from 'antd/lib/spin';

export default function UsersOverviewCard({ data }) {
    const navigate = useNavigate();
    return (
        <Card>
            <CardHeader color="green" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">New Users This Week</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                        onClick={() => navigate("/users")}
                    >
                        See More
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <div className="overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    First Name
                                </th>
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Last Name
                                </th>
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Phone
                                </th>
                                <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Last Login
                                </th>

                              
                            </tr>
                        </thead>
                        <tbody>
                            {(data) ? data.map(d =>
                                <>
                                    <tr key={d?.id}>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {d?.firstName}
                                        </th>
                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {d?.lastName}
                                        </td>
                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {d?.phoneNumber}
                                        </td>
                                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                           {/* {moment(d?.lastLogin,'mm/dd/yyyy')} */}
                                           {moment(d?.lastLogin).format('MM/DD/YYYY')}
                                        </td>
                                    </tr>
                                </>  
                            ): <div className='flex justify-center my-20'><SpinFC></SpinFC></div> }
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}
