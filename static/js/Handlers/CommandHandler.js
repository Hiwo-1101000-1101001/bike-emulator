import { AlarmService } from "../Services/AlarmService.js";

/**
 * Handler for processing incoming commands.
 */
export class CommandHandler {
	/**
	 * Executes a command based on the provided input.
	 * @param {string} command - The command to execute.
	 */
	static execute(command) {
		switch (command) {
			case "trigger_alarm":
				AlarmService.triggerAlarm();
				break;
			case "disconnect":
				alert("Bike disconnected!");
				mqttClient.disconnect();
				break;
			default:
				console.warn(`Unknown command: ${command}`);
		}
	}
}
