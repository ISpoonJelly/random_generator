module.exports = {
    AMQP_HOST: process.env.AMQP_HOST || 'amqp://localhost',
    QUEUE_NAME: process.env.QUEUE_NAME || 'generated_numbers'
}