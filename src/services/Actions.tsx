import AppNotification from "../utility/Notfication";
import { Api } from '../apis/Api';

export const fetchData = async ({ queryKey }:any) => {
  const pagenation = queryKey[1];
  const apiUrl = queryKey[2];
  const searchParams = queryKey[3];
  try {
    const data = await Api().get(`${apiUrl}?limit=${pagenation?.pageSize}&page=${pagenation?.current}&from=${pagenation?.from}&to=${pagenation?.to}&${pagenation?.selectedValue}=${pagenation?.searchValue}`);
    if ([200, 201].includes(data.status)) {
      // AppNotification("Success", "success", 'topRight', data?.data?.message);
      console.log(data.data.data)
      return data?.data?.data;
    }
  } 
  catch (error:any) {
    // Error
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
  }
};






export const postData = async ({ queryKey }:any) => {
  const payload = queryKey[1];
  const apiUrl = queryKey[2];
  console.log(queryKey);
  try {
    const data = await Api().post(`${apiUrl}`, payload);
    if ([200, 201].includes(data.status)) {
      AppNotification("Success", "success", 'topRight', data?.data?.message)
      return data?.data?.data.content;
    }
  } 
  catch (error:any) {
    // Error
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
  }
};
