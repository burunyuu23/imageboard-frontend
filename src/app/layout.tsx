import React from "react";
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ConfigProvider} from 'antd';

import Header from "@/widget/Header/ui/Header";
import theme from '@/shared/style/themeConfig';

import { StoreProvider, StyledComponentsRegistry } from "./_providers";
import './globals.scss'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'dnl.hk',
    description: 'new anonymous imageboard',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <StoreProvider>
            <StyledComponentsRegistry>
                <ConfigProvider theme={theme}>
                    <body className={inter.className}>
                    <Header/>
                    <main id="main">
                        {children}
                    </main>
                    </body>
                </ConfigProvider>
            </StyledComponentsRegistry>
        </StoreProvider>
        </html>
    )
}
