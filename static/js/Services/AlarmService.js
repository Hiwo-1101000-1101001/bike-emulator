/**
 * Service for handling alarm-related operations.
 */
export class AlarmService {
	/**
	 * Triggers an alarm with visual and audio effects.
	 */
	static triggerAlarm() {
		const alarmSound = document.getElementById("alarm-sound");

		// Функция для воспроизведения звука
		const playSound = () => {
			alarmSound.play();
		};

		// Воспроизводим звук каждую секунду в течение 15 секунд
		const intervalId = setInterval(playSound, 1000);

		// Останавливаем звук через 15 секунд
		setTimeout(() => {
			clearInterval(intervalId);
			alarmSound.pause();
			alarmSound.currentTime = 0;
		}, 15000);
	}
}
