document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDate = new Date(document.getElementById('eventDate').value);
    const email = document.getElementById('email').value;

    const countdownDisplay = document.getElementById('countdownDisplay');

    // Send event data to the backend
    fetch('/api/create-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventName, eventDate, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            countdownDisplay.innerText = `Countdown for ${eventName} started!`;
        }
    });

    // Local countdown logic
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = eventDate - now;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerText = `${eventName} is happening now!`;
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownDisplay.innerText = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
});
