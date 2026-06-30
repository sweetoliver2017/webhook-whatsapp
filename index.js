const express = require('express');
const app = express();

const VERIFY_TOKEN = 'aniversarios2026';

app.use(express.json());

app.get('/webhook', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  console.log('Notificação recebida:', JSON.stringify(req.body));
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Webhook WhatsApp rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
