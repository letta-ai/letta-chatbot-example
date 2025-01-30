import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { AgentDetailsProvider } from '@/components/ui/agent-details'
import { SidebarProvider } from '@/components/ui/sidebar'
import ContentLayout from './content-layout'
import { ReasoningMessageProvider } from '@/components/toggle-reasoning-messages'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Letta Chatbot with Memory Template',
  description: 'An example chatbot application built on the Letta API, which makes each chatbot a stateful agent (agent with memory) under the hood.',
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SidebarProvider>
            <AgentDetailsProvider>
              <ReasoningMessageProvider>
                <ContentLayout>{children}</ContentLayout>
              </ReasoningMessageProvider>
            </AgentDetailsProvider>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  )
}
