document.addEventListener('DOMContentLoaded', () => {
    const makeCallButton = document.getElementById('makeCallButton');

    makeCallButton.addEventListener('click', () => {
         fetch('/make-call', {
            method: 'GET'
        })
        .then(response => {
            if (response.ok) {
                console.log('Call initiated successfully');
            } else {
                console.error('Failed to initiate call');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});



