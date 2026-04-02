document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const portInput = document.getElementById('portInput');
    const sendButton = document.getElementById('sendButton');
    const statusMessage = document.getElementById('statusMessage');

    sendButton.addEventListener('click', async () => {
        const message = messageInput.value;
        const port = portInput.value;

        if (!message || !port) {
            displayStatus('Please enter both a message and a port number.', 'error');
            return;
        }

        const url = `http://localhost:${port}`;

        try {
            displayStatus(`Sending message to ${url}...`, '');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: message
            });

            if (response.ok) {
                const responseText = await response.text();
                displayStatus(`Message sent successfully to ${url}. Response: ${responseText}`, 'success');
            } else {
                const errorText = await response.text();
                displayStatus(`Failed to send message. Status: ${response.status}, Response: ${errorText}`, 'error');
            }
        } catch (error) {
            console.error('Network error:', error);
            displayStatus(`Network error: ${error.message}. Check if the service is running on localhost:${port} and if CORS is configured correctly.`, 'error');
        }
    });

    function displayStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type}`;
    }
});