import { notification } from "antd";
export const openNotify = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
