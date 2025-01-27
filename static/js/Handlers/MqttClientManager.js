import { CommandHandler } from "./CommandHandler.js";

/**
 * Class to manage MQTT client connections and subscriptions.
 */
export class MqttClientManager {
	/**
	 * @param {string} brokerUrl - The URL of the MQTT broker.
	 * @param {string} bikeId - Initial bike ID to use as the client ID.
	 */
	constructor(brokerUrl, bikeId) {
		this.brokerUrl = brokerUrl;
		this.bikeId = bikeId;
		this.client = this.createClient(bikeId);
		this.coordsTopic = `bikes/${bikeId}/coords`;
		this.commandsTopic = `bikes/${bikeId}/commands`;
	}

	/**
	 * Creates a new MQTT client with the specified client ID.
	 * @param {string} clientId - The client ID for the MQTT connection.
	 * @returns {Object} - The MQTT client instance.
	 */
	createClient(clientId) {
		return mqtt.connect(this.brokerUrl, {
			clientId,
			clean: true,
			reconnectPeriod: 1000,
		});
	}

	/**
	 * Updates the client ID and reinitializes the MQTT connection.
	 * @param {string} newClientId - The new client ID.
	 */
	updateClientId(newClientId) {
		this.client.end();
		this.bikeId = newClientId;
		this.client = this.createClient(newClientId);
		this.coordsTopic = `bikes/${newClientId}/coords`;
		this.commandsTopic = `bikes/${newClientId}/commands`;
		this.initializeEventListeners();
	}

	/**
	 * Initializes MQTT event listeners for connection and messages.
	 */
	initializeEventListeners() {
		this.client.on("connect", () => {
			console.log(`Connected with clientId: ${this.bikeId}`);
			this.subscribeToTopic(this.commandsTopic);
		});

		this.client.on("message", (topic, message) => {
			this.handleMessage(topic, message.toString());
		});
	}

	/**
	 * Subscribes to a specified MQTT topic.
	 * @param {string} topic - The topic to subscribe to.
	 */
	subscribeToTopic(topic) {
		this.client.subscribe(topic, (err) => {
			if (err) console.error(`Subscription error: ${err}`);
			else console.log(`Subscribed to topic: ${topic}`);
		});
	}

	/**
	 * Publishes a message to a specified MQTT topic.
	 * @param {string} topic - The topic to publish to.
	 * @param {string} message - The message payload.
	 */
	publish(topic, message) {
		this.client.publish(topic, message, (err) => {
			if (err) console.error(`Publish error: ${err}`);
			else console.log(`Message sent to ${topic}: ${message}`);
		});
	}

	/**
	 * Handles incoming messages on subscribed topics.
	 * @param {string} topic - The topic the message was received on.
	 * @param {string} message - The message payload.
	 */
	handleMessage(topic, message) {
		console.log(`Message received on ${topic}: ${message}`);
		if (topic === this.commandsTopic) {
			CommandHandler.execute(message);
		}
	}

	/**
	 * Disconnects the MQTT client.
	 */
	disconnect() {
		this.client.end();
	}
}
