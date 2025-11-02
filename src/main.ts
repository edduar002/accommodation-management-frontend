// Importa la función para arrancar la aplicación Angular
import { bootstrapApplication } from '@angular/platform-browser';

// Importa la configuración global de la aplicación (providers, imports, etc.)
import { appConfig } from './app/app.config';

// Importa el componente raíz que se cargará al iniciar la app
import { AppComponent } from './app/app.component';

// Importa los estilos de Leaflet (mapas) para que se apliquen globalmente
import 'leaflet/dist/leaflet.css';

/**
 * Inicializa la aplicación Angular con el componente raíz y la configuración global.
 * Si ocurre algún error durante el arranque, se muestra en la consola.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) =>
    // Captura y muestra errores de inicialización de la aplicación
    console.error(err)
  );