{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;\red27\green27\blue27;\red242\green242\blue242;}
{\*\expandedcolortbl;;\cssrgb\c14118\c14118\c14118;\cssrgb\c96078\c96078\c96078;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 const express = require('express');\
const app = express();\
\
// \uc0\u9881 \u65039  SEU TOKEN DE VERIFICA\'c7\'c3O \'97 pode deixar esse mesmo\
const VERIFY_TOKEN = 'aniversarios2026';\
\
app.use(express.json());\
\
// \uc0\u9989  Rota de verifica\'e7\'e3o do Webhook pela Meta\
app.get('/webhook', (req, res) => \{\
  const mode      = req.query['hub.mode'];\
  const token     = req.query['hub.verify_token'];\
  const challenge = req.query['hub.challenge'];\
\
  console.log('Meta tentando verificar webhook...');\
  console.log('Mode:', mode);\
  console.log('Token recebido:', token);\
  console.log('Token esperado:', VERIFY_TOKEN);\
\
  if (mode === 'subscribe' && token === VERIFY_TOKEN) \{\
    console.log('\uc0\u9989  Webhook verificado com sucesso!');\
    res.status(200).send(challenge);\
  \} else \{\
    console.log('\uc0\u10060  Token inv\'e1lido!');\
    res.sendStatus(403);\
  \}\
\});\
\
// \uc0\u55357 \u56553  Rota para receber notifica\'e7\'f5es da Meta\
app.post('/webhook', (req, res) => \{\
  console.log('\uc0\u55357 \u56553  Notifica\'e7\'e3o recebida:', JSON.stringify(req.body, null, 2));\
  res.sendStatus(200);\
\});\
\
// \uc0\u55356 \u57312  Rota principal (s\'f3 para confirmar que est\'e1 rodando)\
app.get('/', (req, res) => \{\
  res.send('\uc0\u9989  Webhook WhatsApp rodando com sucesso!');\
\});\
\
// \uc0\u55357 \u56960  Iniciar servidor\
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => \{\
  console.log(`\uc0\u9989  Servidor rodando na porta $\{PORT\}`);\
\});\
}