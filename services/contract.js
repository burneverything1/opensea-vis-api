const amqp = require('amqplib/callback_api')
require('dotenv').config()

const getContractData = (contract_add, response) => {

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
                        "address": contract_add
                    }
        
                    console.log('requesting')
        
                    channel.consume(queue, (msg) => {
                        if (msg.properties.correlationId == correlationId) {
                            // got contract
                            const msg_content = JSON.parse(JSON.parse(msg.content).contract)
                            console.log(msg_content);
                            response.json(msg_content)

                            setTimeout(() => {
                                connection.close()
                            }, 500)
                        }
                    }, {
                        noAck: true
                    })

                    console.log('sent msg', JSON.stringify(send_msg));
        
                    channel.sendToQueue(queue,
                        Buffer.from(JSON.stringify(send_msg)), {
                            contentType: 'application/json',
                            correlationId: correlationId,
                            replyTo: queue
                        })
                })
            })
        })

}


const generateUUid = () => {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString()
}

module.exports = getContractData