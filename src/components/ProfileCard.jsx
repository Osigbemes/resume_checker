import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import Image from '@material-tailwind/react/Image';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
// import Button from '@material-tailwind/react/Button';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Button } from '../partials/Button';

export default function ProfileCard({cardData, showChildrenDrawer}) {
    return (
        <Card>
            <div className="flex flex-wrap justify-center mt-16">
                <div className="w-60 px-4 -mt-24 flex justify-center mt-0">
                      <Avatar size={64} icon={<UserOutlined />} />

                    {/* <Image src={ProfilePicture} rounded raised /> */}
                </div>
                <div className="w-full flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            0
                        </span>
                        <span className="text-sm text-gray-700">Friends</span>
                    </div>
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            0
                        </span>
                        <span className="text-sm text-gray-700">Comments</span>
                    </div>
                    <div className="p-4 text-center">
                        <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                            0
                        </span>
                        <span className="text-sm text-gray-700">Photos</span>
                    </div>
                </div>
            </div>
            {console.log(cardData)}
            <div className="text-center">
                <H5 color="gray">{cardData?.firstName} {""} {cardData?.lastName} {""} {cardData?.name} {""} {cardData?.balance}</H5>
                <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                    {/* <Icon name="place" size="xl" /> */}
                    {cardData?.phoneNumber}
                </div>
                <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                    {/* <Icon name="work" size="xl" /> */}
                    E mail: {cardData?.email}
                </div>
                <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                    {/* <Icon name="account_balance" size="xl" /> */}
                   Provider:  {cardData?.provider}
                </div>
            </div>
            <CardBody>
                <div className="border-t border-lightBlue-200 text-center px-2 ">
                    {/* <LeadText color="blueGray">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                    </LeadText> */}
                </div>
            </CardBody>
            <CardFooter>
                <div className="w-full flex justify-center -mt-8">
                    <a
                        href="#pablo"
                        className="mt-5"
                        onClick={(e) => e.preventDefault()}
                    >


                                                                                   <Button
onClick={()=>{showChildrenDrawer()}}                                            loadingText={"Authenticating"}
                                            //   loading={loading}
                                            text={"Edit"}
                                            btnType={"secondary"}
                                        />
                    </a>
                    <a
                        href="#pablo"
                        className="mt-5"
                        onClick={(e) => e.preventDefault()}
                    >
                                                           <Button
                                            // onClick={onChildrenDrawerClose}
                                            loadingText={"Authenticating"}
                                            //   loading={loading}
                                            text={"Delete"}
                                            btnType={"secondary"}
                                        />
                    </a>
                </div>
            </CardFooter>
        </Card>
    );
}
