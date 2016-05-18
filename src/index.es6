import dotenv from 'dotenv';
import { Server } from 'ws';
import SubscriptionManager from './infrastructure/SubscriptionManager';
import setupInternalProcessor from './bootstrap/setupInternalProcessor';
import hookNewSocket from './utils/hookNewSocket';

dotenv.load();

let wss = new Server({ port: process.env.PORT });
let sm = new SubscriptionManager();
let ip = setupInternalProcessor(sm);

wss.on('connection', (ws) => hookNewSocket(ws, sm, process.env.SECRET));
console.log('wss listening');
