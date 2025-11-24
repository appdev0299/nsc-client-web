import { ApplicationLayout } from './application-layout'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function AppGroupLayout({ children }: Props) {
    return <ApplicationLayout>{children}</ApplicationLayout>
}
