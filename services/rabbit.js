var amqp = require("amqplib/callback_api");
var uuid = require("node-uuid");

const sendMessage = (endpoint, method, body, params, query, res) => {
	amqp.connect("amqp://localhost", function (error0, connection) {
		if (error0) {
			throw error0;
		}
		return new Promise((resolve) => {
			connection.createChannel((error1, channel) => {
				if (error1) {
					throw error1;
				}
				const corrId = uuid.v4();
				var queue = "api-redes";
				var msgContent = {
					endpoint: endpoint,
					method: method,
					body: body,
					params: params,
					query: query,
				};
				channel.assertQueue(queue, { durable: false });
				const jsonMessage = JSON.stringify(msgContent);
				channel.sendToQueue(queue, Buffer.from(jsonMessage), {
					replyTo: queue,
					correlationId: corrId,
				});
				channel.assertQueue("reply_api", { durable: false });
				channel.consume("reply_api", (msg) => {
					if (corrId === msg.properties.correlationId) {
						const response = JSON.parse(msg.content);
						console.log(response);
						res.status(response.code).json(response.body);
						resolve(response);
						setTimeout(() => {
							connection.close();
						}, 1500);
					}
				});
				console.log(" [x] Sent %s", msgContent);
			});
		});
	});
};

module.exports = { sendMessage };
