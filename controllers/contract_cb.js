const amqp = require('amqplib/callback_api')
require('dotenv').config()
const contractRouter_cb = require('express').Router()

contractRouter_cb.get('/:add', async (request, response) => {
    const test_string = 'hello'

    amqp.connect(process.env.CLOUDAMQP_URL, upon_connection)
})

const upon_connection = (error0, connection) => {
    if (error0) {
        console.log(error0);
    }

    console.log(test_string);
}

module.exports = contractRouter_cb