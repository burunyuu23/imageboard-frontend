import { NextResponse } from 'next/server';
import {imageboardApi} from "@/shared/api/base_paths";
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const url = `${imageboardApi}/attachments`;
    if (!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const blob = Array.from(new Uint8Array(bytes));
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ file: blob })
    });

    return response;
}
