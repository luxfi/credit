'use client'
import React from 'react'

import { AiProvider, useChat } from '@hanzo/ai/react'
import { Chat } from '@hanzo/ui/chat'
import { Button } from '@hanzo/ui/primitives'

/**
 * The Lux assistant: the mark bottom right, and the thread it opens.
 * Turn-taking, streaming and abort are `useChat`; the thread and its
 * composer are `Chat`. Positioning is inline style — this app compiles
 * no utility CSS of its own.
 */

/** The publishable key the browser carries. Absent, the thread runs anonymous. */
const KEY = process.env.NEXT_PUBLIC_HANZO_AI_KEY

const Mark: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg viewBox='0 0 100 100' width={size} height={size} aria-hidden>
    <path d='M50 85 L15 25 L85 25 Z' fill='white' />
  </svg>
)

const QUESTIONS = [
  'What is Lux Credit?',
  'How do card rewards work?',
  'How do I apply?',
]

const Thread: React.FC = () => {
  const { messages, streaming, send, stop } = useChat({ model: 'auto' })

  return (
    <Chat
      messages={messages}
      streaming={streaming}
      send={send}
      stop={stop}
      composer={{ placeholder: 'Ask anything' }}
      empty={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, overflowY: 'auto' }}>
          <p style={{ fontSize: 13, opacity: 0.6 }}>Ask about Lux Credit — cards, rewards, or your account.</p>
          {QUESTIONS.map((q) => (
            <Button
              key={q}
              variant='outline'
              onClick={() => { void send(q) }}
              style={{ justifyContent: 'flex-start', height: 'auto', padding: '8px 12px', textAlign: 'left', whiteSpace: 'normal' }}
            >{q}</Button>
          ))}
        </div>
      )}
    />
  )
}

const panel: React.CSSProperties = {
  position: 'fixed',
  bottom: 104,
  right: 24,
  zIndex: 60,
  width: 'min(400px, calc(100vw - 32px))',
  height: 'min(560px, calc(100vh - 140px))',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 16,
  background: '#0a0a0a',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
}

const fab: React.CSSProperties = {
  position: 'fixed',
  bottom: 20,
  right: 24,
  zIndex: 60,
  width: 72,
  height: 72,
  borderRadius: '50%',
  background: '#000',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.25s ease',
}

const Assistant: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [glow, setGlow] = React.useState<boolean>(false)

  return (
    <AiProvider token={KEY}>
      {open && (
        <div style={panel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', height: 48, flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Mark size={18} />
              <span style={{ fontWeight: 600, color: '#fafafa' }}>LUX <span style={{ opacity: 0.6 }}>AI</span></span>
            </div>
            <Button onClick={() => { setOpen(false) }} variant='ghost' size='icon'>✕</Button>
          </div>
          <Thread />
        </div>
      )}

      <span
        onClick={() => { setOpen(!open) }}
        onMouseEnter={() => { setGlow(true) }}
        onMouseLeave={() => { setGlow(false) }}
        style={{
          ...fab,
          filter: glow ? 'drop-shadow(0 0 14px rgba(255,255,255,0.55))' : 'none',
          transform: open ? 'rotate(180deg)' : 'none',
        }}
      >
        <Mark size={40} />
      </span>
    </AiProvider>
  )
}

export default Assistant
