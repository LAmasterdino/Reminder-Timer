// sw.js
self.addEventListener('install', event => {
  // Sofort aktivieren
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  // Öffne oder fokussiere die Seite
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// Optional: Hier könnten Push-Nachrichten empfangen werden (falls Push-Subscription existiert)
self.addEventListener('push', event => {
  const data = event.data?.json?.() ?? { title: 'Push', body: event.data?.text() ?? 'Du hast eine Nachricht' };
  event.waitUntil(
    self.registration.showNotification(data.title, { body: data.body })
  );
});
