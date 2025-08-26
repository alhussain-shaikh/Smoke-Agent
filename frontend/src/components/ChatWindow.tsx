import React, { useState } from 'react';
import InputBox from './InputBox';
import ReportViewer from './ReportViewer';
import { sendMessage } from '../services/app.ts';
interface Msg { role: 'user' | 'agent'; text: string }

export default function ChatWindow() {
    const [messages, setMessages] = useState<Msg[]>([]);
    const [lastReport, setLastReport] = useState<{ html?: string; pdf?: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const onSend = async (text: string) => {
        setMessages(prev => [...prev, { role: 'user', text }]);
        setLoading(true);
        try {
            let res = await sendMessage(text);
            console.log(res);
            let reply = `Status: ${res.reply}\n\n${res.details.stdout}${res.stderr ? `\nError:\n${res.details.stderr}` : ''}`;
            setMessages(prev => [...prev, { role: 'agent', text: reply }]);
            setLastReport({ html: res.html_report, pdf: res.pdf_report });
        } catch (e: any) {
            setMessages(prev => [...prev, {
                role: 'agent', text: ' Error contacting backend.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{
                border: '1px solid #ddd', borderRadius: 8, padding: 12,
                minHeight: 300
            }}>
                {loading && <div style={{ color: '#777', marginBottom: 8 }}>Loading...</div>}
                {messages.length === 0 && !loading && <div style={{ color: '#777' }}>Start by
                    asking me to run smoke tests…</div>}
                {messages.map((m, i) => (
                    <div key={i} style={{
                        background: m.role === 'user' ? '#000000ff' : '#000000ff',
                        padding: 8,
                        borderRadius: 6,
                        marginBottom: 8
                    }}>
                        <strong>{m.role === 'user' ? 'You' : 'Agent'}: </strong>
                        <span style={{ whiteSpace: 'pre-wrap' }}>{m.text}</span>
                    </div>
                ))}
            </div>
            <InputBox onSend={onSend} />
            <ReportViewer htmlPath={lastReport?.html} pdfPath={lastReport?.pdf}