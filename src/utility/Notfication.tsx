
import { notification } from 'antd';


function AppNotification (title:any, type:any, placement:any, message:any) {

//@ts-ignore
 return notification[type]({
    message: title,
    description: message,
    placement,
  });
};

export default AppNotification