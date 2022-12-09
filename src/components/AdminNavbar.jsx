import { useNavigate } from 'react-router-dom';
// import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from "../partials/Button";
import React, { useState } from 'react';
import AppNotification from '../utility/Notfication';

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    let paramString = window.location.pathname;
    if (paramString == "/") paramString = "/dashboard"
    return (
        <nav className="bg-huzz-green md:ml-64 py-6 px-3"><div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10"><div className="md:hidden"><button className="false flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-full w-12 h-12 p-0 grid place-items-center text-sm leading-relaxed bg-transparent      undefined">

            <span className="material-icons text-white text-2xl leading-none">menu</span></button><div className="absolute top-2 md:hidden -left-64 z-50 transition-all duration-300"><button className="false flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-full w-12 h-12 p-0 grid place-items-center text-sm leading-relaxed bg-transparent      undefined">

                <span className="material-icons text-white text-2xl leading-none">close</span>

            </button></div>

        </div><div className="flex justify-between items-center w-full"><h4 className="uppercase text-white text-sm tracking-wider mt-1"><span className='uppercase'>{paramString}</span></h4>

                <div className="flex"><div className="-mr-4 ml-6"><div>

                    {/* <Button
                className="bg-white"
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loading[1]}
          onClick={() => { AppNotification("Success", "success", 'topRight', "You logged out successfully"); setloading(true); localStorage.clear();
          //@ts-ignore
           setTimeout(function () { navigate("/login") }, 2000);}}
        >
          Logout
        </Button> */}


                    <Button
                        onClick={() => {
                            setloading(true); localStorage.clear();
                            //@ts-ignore
                            setTimeout(function () { AppNotification("Success", "success", 'topRight', "You logged out successfully"); navigate("/login") }, 2000);
                        }}
                        loadingText={"Logging Out"}
                        loading={loading}
                        text={"Logout"}
                        btnType={"secondary"}
                    />



                </div>
                </div>
                </div>
            </div>
        </div>
        </nav>
    );
}
