const registerPromise = window.navigator.serviceWorker.register('static/notification.worker.js');

export const notifyMe = () => {
  if (Notification) {
    Notification.requestPermission();
  } else {
    console.error('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }
  if (Notification.permission === 'granted') {
    registerPromise.then(registration => {
      registration.showNotification('Pomodoro done!', {
        vibrate: 200,
        icon: 'static/favicon-196x196.png',
        body: 'Congrats! You finished yor pomodoro!'
      });
    });
  } else {
    Notification.requestPermission();
  }
};
