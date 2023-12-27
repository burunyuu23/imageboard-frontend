import { Message, ReplyMessage } from "@/entity/Message/model/types";
import MessageInfo from "@/entity/Message/ui/MessageInfo";
import { QUOTE_SIGN, REPLY_SIGN } from "./model/replySign";
import { messageApi } from "@/entity/Message/model/api";

export type { Message, ReplyMessage }
export { MessageInfo }
export { REPLY_SIGN, QUOTE_SIGN }
export { messageApi }