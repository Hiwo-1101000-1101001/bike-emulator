/**
 * Class to manage UI interactions.
 */
export class UIController {
	/**
	 * @param {MqttClientManager} mqttClient - The MQTT client instance.
	 */
	constructor(mqttClient) {
		this.mqttClient = mqttClient;
		this.initializeEventListeners();
	}

	/**
	 * Initializes event listeners for UI interactions.
	 */
	initializeEventListeners() {
		const bikeIdInput = document.getElementById("bikeId");
		const alarmButton = document.getElementById("alarm");
		const disconnectButton = document.getElementById("disconnect");

		bikeIdInput.addEventListener("change", () => {
			this.mqttClient.updateClientId(bikeIdInput.value);
		});

		alarmButton.addEventListener("click", () => {
			if (confirm("Вы уверены, что хотите запустить сигнализацию?")) {
				this.mqttClient.publish(this.mqttClient.commandsTopic, "trigger_alarm");
			}
		});

		disconnectButton.addEventListener("click", () => {
			this.mqttClient.disconnect();
			alert("Disconnected manually.");
		});
	}
}
