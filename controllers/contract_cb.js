const amqp = require('amqplib/callback_api')
require('dotenv').config()
const contractRouter_cb = require('express').Router()

contractRouter_cb.get('/:add', async (request, response) => {
    const test_string = 'hello'

    amqp.connect(process.env.CLOUDAMQP_URL, upon_connection)
})

module.exports = contractRouter_cb