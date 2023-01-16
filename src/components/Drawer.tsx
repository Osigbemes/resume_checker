import { Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import React, { useState } from 'react';
import { Button } from '../partials/Button';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const AppDrawer: React.FC = ({ children, open, setOpen, title, showChildrenDrawer, childrenDrawer, onChildrenDrawerClose }: any) => {
    //   const [open, setOpen] = useState(true);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
    const showDrawer = () => {
        setOpen(true);
    };
    const onChange = (e: RadioChangeEvent) => {
        setPlacement(e.target.value);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Drawer
                title={title}
                placement={placement}
                width={500}
                onClose={onClose}
                open={open}
                // extra={
                //     <Space>
                //         <Button onClick={onClose}>Cancel</Button>
                //         <Button type="primary" onClick={onClose}>
                //             OK
                //         </Button>
                //     </Space>
                // }
            >
                <>
                    {children}
                    <Drawer
                        title="Edit Samuel Adebayo's Account"
                        width={420}
                        closable={false}
                        onClose={onChildrenDrawerClose}
                        open={childrenDrawer}
                    >
                        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                            <div className="w-full max-w-md space-y-8">
                                <div>

                                    <div className='flex justify-center'> <Avatar size={64} icon={<UserOutlined />} /></div>


                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Edit User</h2>
                                    <p className="mt-2 text-center text-sm text-gray-600">

                                        <a href="#" className="font-medium text-huzz-green hover:text-indigo-500">...</a>
                                    </p>
                                </div>
                                <form
                                    className="mt-8 space-y-6" action="#" method="POST">
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div className="-space-y-px rounded-md shadow-sm">
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">Email address</label>
                                            <input

                                                id="phoneNumber"
                                                name=""
                                                type="text"
                                                // onChange={formik.handleChange}
                                                autoComplete="phoneNumber"
                                                required
                                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="sr-only">Password</label>
                                            <input



                                                id="password"
                                                name="password"
                                                type="text"
                                                // onChange={formik.handleChange}
                                                autoComplete="current-password"
                                                required




                                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="" />
                                        </div>
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">Address</label>
                                            <input

                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="text"
                                                // onChange={formik.handleChange}
                                                autoComplete="phoneNumber"
                                                required
                                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="sr-only">Last Name</label>
                                            <input



                                                id="password"
                                                name="password"
                                                type="text"
                                                // onChange={formik.handleChange}
                                                autoComplete="current-password"
                                                required




                                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="" />
                                        </div>
                                    </div>

                                    <div>
                                        <Button
                                            onClick={onChildrenDrawerClose}
                                            loadingText={"Authenticating"}
                                            //   loading={loading}
                                            text={"Update User Details"}
                                            btnType={"secondary"}
                                        />

                                        {/* <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

  
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button> */}
                                    </div>
                                </form>
                            </div>
                        </div>                    </Drawer>
                </>

            </Drawer>
        </>
    );
};

export default AppDrawer;