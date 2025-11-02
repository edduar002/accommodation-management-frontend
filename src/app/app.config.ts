import { ApplicationConfig } from '@angular/core'; // Importa la interfaz para configurar la aplicación
import { provideRouter } from '@angular/router'; // Función para registrar las rutas de Angular
import { provideHttpClient } from '@angular/common/http'; // Función para registrar HttpClient como proveedor
import { routes } from './app.routes'; // Importa las rutas definidas en el proyecto

/**
 * Configuración principal de la aplicación Angular.
 * Aquí se registran los proveedores globales que la aplicación necesita.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Configura el enrutamiento de la aplicación usando las rutas definidas
    provideRouter(routes),

    // Configura HttpClient para realizar peticiones HTTP en toda la app
    provideHttpClient()
  ]
};