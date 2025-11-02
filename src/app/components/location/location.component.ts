import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Componente LocationComponent: permite mostrar un mapa, seleccionar ubicación y buscar direcciones
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  standalone: true,
  imports: [
    CommonModule, // Necesario para directivas comunes de Angular
    FormsModule,  // Para usar [(ngModel)] en los inputs
  ],
})
export class LocationComponent implements AfterViewInit {

  // Instancia del mapa Leaflet
  map!: L.Map;

  // Marcador draggable en el mapa
  marker!: L.Marker;

  // Objeto que almacena las coordenadas seleccionadas
  selected: { lat: number; lng: number } | null = null;

  // Variable enlazada al input de búsqueda
  searchText: string = '';

  // Evento que emite las coordenadas seleccionadas hacia el componente padre
  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  // Constructor con inyección de HttpClient para realizar búsquedas de direcciones
  constructor(private http: HttpClient) {}

  /**
   * Inicializa el mapa y los eventos una vez que la vista se ha cargado
   */
  ngAfterViewInit(): void {
    // Crear el mapa centrado en una coordenada inicial (Bogotá)
    this.map = L.map('map').setView([4.6482837, -74.0636163], 13);

    // Añadir capa de OpenStreetMap al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Crear un marcador draggable en la ubicación inicial
    this.marker = L.marker([4.6482837, -74.0636163], { draggable: true }).addTo(
      this.map
    );

    // Evento que actualiza la ubicación seleccionada cuando se arrastra el marcador
    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng(); // Obtener posición del marcador
      this.selected = { lat: pos.lat, lng: pos.lng }; // Actualizar variable selected
      this.locationSelected.emit(this.selected); // Emitir coordenadas al padre
    });

    // Evento que actualiza la ubicación cuando el usuario hace clic en el mapa
    this.map.on('click', (e: any) => {
      const latlng = e.latlng; // Obtener coordenadas del clic
      this.marker.setLatLng(latlng); // Mover marcador a la ubicación clickeada
      this.selected = { lat: latlng.lat, lng: latlng.lng }; // Actualizar variable selected
      this.locationSelected.emit(this.selected); // Emitir coordenadas al padre
    });
  }

  /**
   * Busca una ubicación por texto utilizando la API de Nominatim
   * y actualiza el mapa y marcador si se encuentra
   */
  searchLocation() {
    // Si el input está vacío, no hacer nada
    if (!this.searchText) return;

    // Construir URL de búsqueda codificando el texto ingresado
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      this.searchText
    )}`;

    // Hacer petición HTTP GET a la API de Nominatim
    this.http.get<any[]>(url).subscribe((results) => {

      // Si se encontraron resultados
      if (results.length > 0) {
        const place = results[0]; // Tomar el primer resultado
        const lat = parseFloat(place.lat); // Convertir latitud a número
        const lng = parseFloat(place.lon); // Convertir longitud a número

        // Actualizar vista del mapa centrado en la ubicación encontrada
        this.map.setView([lat, lng], 15);

        // Mover marcador a la nueva ubicación
        this.marker.setLatLng([lat, lng]);

        // Actualizar variable selected
        this.selected = { lat, lng };

        // Emitir coordenadas al componente padre
        this.locationSelected.emit(this.selected);
      } else {
        // Mostrar alerta si no se encontró la dirección
        alert('No se encontró la dirección');
      }
    });
  }
}