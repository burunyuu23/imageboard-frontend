import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.scss'
import React from "react";
import StoreProvider from "@/shared/redux/StoreProvider";
import StyledComponentsRegistry from "@/shared/style/StyledComponentsRegistry";
import Header from "@/widget/Header/ui/Header";

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
                <body className={inter.className}>
                <Header/>
                <main>
                    {children}
                </main>
                </body>
            </StyledComponentsRegistry>
        </StoreProvider>
        </html>
    )
}
