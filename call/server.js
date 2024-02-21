const express = require('express');
const twilio = require('twilio');

const app = express();
const port = 5500;

const accountSid = 'ACebc373525d99fefb11956dc1ab9f5a61';
const authToken = '76bcec16651bf56ab6ddab8af0ab2a28';
const client = twilio(accountSid, authToken);

app.get('/make-call', (req, res) => {
    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: '+919136006659',
            from: '+19287698480'
        })
        .then(call => {
            console.log(call.sid);
            res.send('Call initiated!');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error initiating call');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/make-call`);
});

