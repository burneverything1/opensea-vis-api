const amqp = require('amqplib/callback_api')
require('dotenv').config()

const generateUUid = () => {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString()
}

const queue = 'nft'
const correlation_Id = generateUUid()
const send_msg = {
    "address": '0xF8C08433DD41eAeE2e424C9E91467aB27772d9ec'
}

const on_open_send = (err1, channel) => {
    if (err1) {
        console.log(err1);
    }
    channel.assertQueue(queue, {durable: false})
    channel.sendToQueue(queue,
        Buffer.from(JSON.stringify(send_msg)), {
            contentType: 'application/json',
            correlationId: correlation_Id,
            replyTo: queue
        })
}

// send
const sendAddress = (connection, contract_address) => {
    connection.createChannel(on_open_send)
}

const on_open_rec = (err2, channel) => {
    if (err2) {
        console.log(err2);
    }

    channel.assertQueue(queue, {durable: false})
    channel.consume(queue, (msg) => {
        if (msg.properties.correlationId == correlation_Id) {
            // got contract
            const msg_content = JSON.parse(JSON.parse(msg.content).contract)
            console.log(msg_content);
            channel.ack(msg)
        }
    })
}

// receive
const receiveData = (connection) => {
    console.log('receive data started');
    connection.createChannel(on_open_rec)
}

const connectMQ = () => {
    console.log('execute connectMQ');
    amqp.connect(process.env.CLOUDAMQP_URL, (err0, connection) => {
        if (err0) {
            console.log(err0);
        }
        console.log('amqp has connected');

        receiveData(connection)
        sendAddress(connection)

    })
}

connectMQ()