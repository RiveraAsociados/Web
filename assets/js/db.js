let db;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ContactoDB', 1);

        request.onerror = (event) => {
            console.error('Error al abrir DB:', event.target.error);
            reject('Error al abrir la base de datos');
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            console.log('Base de datos abierta exitosamente');
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            if (db.objectStoreNames.contains('mensajes')) {
                db.deleteObjectStore('mensajes');
            }

            const objectStore = db.createObjectStore('mensajes', {
                keyPath: 'id',
                autoIncrement: true
            });

            objectStore.createIndex('fecha', 'fecha', { unique: false });
            objectStore.createIndex('email', 'email', { unique: false });
        };
    });
}

function guardarMensaje(mensaje) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error('Base de datos no inicializada'));
            return;
        }

        const transaction = db.transaction(['mensajes'], 'readwrite');
        const store = transaction.objectStore('mensajes');
        
        const request = store.add(mensaje);

        request.onsuccess = () => {
            console.log('Mensaje guardado exitosamente');
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Error al guardar mensaje:', request.error);
            reject(request.error);
        };
    });
}

function obtenerMensajes() {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error('Base de datos no inicializada'));
            return;
        }

        const transaction = db.transaction(['mensajes'], 'readonly');
        const store = transaction.objectStore('mensajes');
        const request = store.getAll();

        request.onsuccess = () => {
            console.log('Mensajes recuperados:', request.result);
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Error al obtener mensajes:', request.error);
            reject(request.error);
        };
    });
}

function eliminarMensajeDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error('Base de datos no inicializada'));
            return;
        }

        const transaction = db.transaction(['mensajes'], 'readwrite');
        const store = transaction.objectStore('mensajes');
        const request = store.delete(id);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(new Error('Error al eliminar el mensaje'));
        };
    });
} 