import React, { type PropsWithChildren } from 'react'

import { RootLayout as RootLayoutCore } from '@luxfi/ui/root-layout'
import { viewport as themeColors } from '@luxfi/ui/viewport'

import siteDef from '@/site-def'
import _metadata from '@/metadata'
import Assistant from '@/components/assistant'

import './fonts.css'

export const metadata = { ..._metadata }
export const viewport = { ...themeColors }

const RootLayout: React.FC<PropsWithChildren> = async ({
  children
}) =>  (
  <RootLayoutCore siteDef={siteDef} >
    {children}
    <Assistant />
  </RootLayoutCore>
)

export default RootLayout
