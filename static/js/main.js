import { MqttClientManager } from "./Handlers/MqttClientManager.js";
import { UIController } from "./Controllers/UIController.js";
import { GeoService } from "./Services/GeoService.js";

const BROKER_URL = "ws://localhost:8083/mqtt";
const BIKE_ID = document.getElementById("bikeId")?.value || "bike_test";

const mqttClient = new MqttClientManager(BROKER_URL, BIKE_ID);
mqttClient.initializeEventListeners();

const uiController = new UIController(mqttClient);

// Periodically send coordinates
setInterval(() => {
	GeoService.sendCoordinates(mqttClient, mqttClient.coordsTopic);
}, 1000);
