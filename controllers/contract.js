const amqp = require('amqplib/callback_api')
require('dotenv').config()
const contractRouter = require('express').Router()

const getContractData = require('../services/contract')

contractRouter.get('/:add', async (request, response) => {
    const contract_add = request.params.add
    getContractData(contract_add, response)
})

module.exports = contractRouter