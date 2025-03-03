// src/services/rabbitmq.service.js
const amqp = require('amqplib');
const { rabbitmq } = require('../config');

let channel;

const init = async () => {
  try {
    const connection = await amqp.connect(rabbitmq.url);
    channel = await connection.createChannel();
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
};

init();

exports.sendMessage = async (queue, message) => {
  if (!channel) {
    console.error('RabbitMQ channel not available');
    return;
  }
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
};
