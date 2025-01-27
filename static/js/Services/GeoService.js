/**
 * Service for handling geolocation-related operations.
 */
export class GeoService {
	/**
	 * Sends GPS coordinates to a specified MQTT topic.
	 * @param {MqttClientManager} mqttClient - The MQTT client instance.
	 * @param {string} coordsTopic - The topic to publish the coordinates to.
	 */
	static sendCoordinates(mqttClient, coordsTopic) {
		if (!navigator.geolocation) {
			console.error("Geolocation API not supported by the browser.");
			return;
		}

		navigator.geolocation.getCurrentPosition((position) => {
			const coords = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
				timestamp: Date.now(),
			};
			mqttClient.publish(coordsTopic, JSON.stringify(coords));
		});
	}
}
