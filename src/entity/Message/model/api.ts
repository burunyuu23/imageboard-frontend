import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getAllMessagesPath } from "@/entity/Message/model/message_paths";
import { imageboardApi } from "@/shared/api/base_paths";
import { Pagination } from "@/shared/api/pagination";

import { Message } from "./types";

export const messageApi = createApi({
    reducerPath: 'api/messages',
    baseQuery: fetchBaseQuery({baseUrl: imageboardApi}),
    endpoints: build => ({
        getMessages: build.query<Message, Pagination>({
            query: (pagination) => `${getAllMessagesPath}?${pagination}`
        }),
    }),
})

export const { useGetMessagesQuery } = messageApi;