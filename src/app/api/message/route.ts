
import {postNewMessagePath} from "@/entity/Message/model/message_paths";
import {NextResponse} from "next/server";
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
    const data = await request.json()
    const url = `${postNewMessagePath}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();

    return NextResponse.json(responseData);
}
