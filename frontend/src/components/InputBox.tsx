import React, { useState } from 'react';
export default function InputBox({ onSend }: {
    onSend: (text: string) =>
        void
}) {
    const [text, setText] = useState('Run smoke tests for login and homepage');
    return (
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSend(text)}
                placeholder="Type a command…"
                style={{
                    flex: 1, padding: 10, border: '1px solid #000000ff', borderRadius:
                        6
                }}
            />
            <button onClick={() => onSend(text)} style={{
                padding: '10px 16px',
                borderRadius: 6
            }}>Send</button>
        </div>
    );
}