import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.scss'
import React from "react";
import StoreProvider from "@/shared/redux/StoreProvider";
import StyledComponentsRegistry from "@/shared/style/StyledComponentsRegistry";
import Header from "@/widget/Header/ui/Header";
import {ConfigProvider} from 'antd';

const inter = Inter({subsets: ['latin']})
import theme from '@/shared/style/themeConfig';

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
                    <main>
                        {children}
                    </main>
                    </body>
                </ConfigProvider>
            </StyledComponentsRegistry>
        </StoreProvider>
        </html>
    )
}
