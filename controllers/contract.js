const amqp = require('amqplib/callback_api')
require('dotenv').config()
const contractRouter = require('express').Router()

contractRouter.get('/:add', async (request, response) => {
    const contract_address = request.params.add
    console.log(contract_address)

    amqp.connect(process.env.CLOUDAMQP_URL, (error0, connection) => {
        if (error0) {
            console.log(error0)
        }
    
        connection.createChannel((error1, channel) => {
            if (error1) {
                console.log(error1)
            }
            const queue = 'nft'
    
            channel.assertQueue(queue, {
                durable: false
            }, (error2) => {        // callback after assert
                if (error2) {
                    console.log(error2)
                }
    
                const correlationId = generateUUid()
                const send_msg = {
                    "address": contract_address.toString()
                }
    
                console.log('requesting')
    
                channel.consume(queue, (msg) => {
                    if (msg.properties.correlationId == correlationId) {
                        // got contract
                        const msg_content = JSON.parse(JSON.parse(msg.content).contract)
    
                        setTimeout(() => {
                            connection.close()
                            response.json(msg_content)
                        }, 500)
                    }
                }, {
                    noAck: true
                })
    
                channel.sendToQueue(queue,
                    Buffer.from(JSON.stringify(send_msg)), {
                        contentType: 'application/json',
                        correlationId: correlationId,
                        replyTo: queue
                    })
            })
        })
    })
})

module.exports = contractRouter