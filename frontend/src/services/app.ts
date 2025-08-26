export async function sendMessage(message: string) {
    try {
        const res = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error('Backend error response:', errorText);
            throw new Error('Backend error: ' + errorText);
        }
        return res.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}