import React from 'react';
import ChatWindow from './components/chatWindow';

export default function App() {
  return (
    <div style={{
      maxWidth: 900, margin: '0 auto', padding: 16, fontFamily:
        'Inter, system-ui, Arial'
    }}>
      <h1> Smoke Automation Agent</h1>
      <p>Ask me to run smoke tests. Example: <code>Run smoke tests for login
        and homepage</code></p>
      <ChatWindow />
    </div>
  );
}