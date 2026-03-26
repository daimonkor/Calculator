import {
  checkNotifications,
  requestNotifications,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

export async function requestNotificationsIfNeeded() {
  const { status } = await checkNotifications();

  // Уже разрешено
  if (status === RESULTS.GRANTED) {
    return RESULTS.GRANTED;
  }

  // Навсегда запрещено
  if (status === RESULTS.BLOCKED) {
    await openSettings();
    return RESULTS.BLOCKED;
  }

  // DENIED → можно спрашивать
  const result = await requestNotifications(['alert', 'sound', 'badge']);

  return result.status;
}
