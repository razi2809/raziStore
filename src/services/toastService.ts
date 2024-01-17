import { message } from "antd";

// Define a type for the possible types of messages
type MessageType = "success" | "error" | "info" | "warning";

// Create a notification object with methods for each type of message
const notify = {
  loading: (content: string) => {
    const hide = message.loading(content, 0);
    return hide;
  },
  show: (type: MessageType, content: string, duration: number = 2) => {
    message[type](content, duration);
  },

  success: (content: string, duration: number = 2) => {
    message.success(content, duration);
  },

  error: (content: string, duration: number = 2) => {
    message.error(content, duration);
  },

  info: (content: string, duration: number = 2) => {
    message.info(content, duration);
  },

  warning: (content: string, duration: number = 2) => {
    message.warning(content, duration);
  },
};

export default notify;
