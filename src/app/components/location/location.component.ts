import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  standalone: true,         // <--- obligatorio para standalone
  imports: [FormsModule, HttpClientModule]  // <--- importa aquí los módulos
})
export class LocationComponent implements AfterViewInit {
  map!: L.Map;
  marker!: L.Marker;
  selected: { lat: number, lng: number } | null = null;
  searchText: string = '';

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([4.6482837, -74.0636163], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([4.6482837, -74.0636163], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.selected = { lat: pos.lat, lng: pos.lng };
    });

    this.map.on('click', (e: any) => {
      const latlng = e.latlng;
      this.marker.setLatLng(latlng);
      this.selected = { lat: latlng.lat, lng: latlng.lng };
    });
  }

  searchLocation() {
    if (!this.searchText) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchText)}`;
    this.http.get<any[]>(url).subscribe(results => {
      if (results.length > 0) {
        const place = results[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);

        this.map.setView([lat, lng], 15);
        this.marker.setLatLng([lat, lng]);
        this.selected = { lat, lng };
      } else {
        alert('No se encontró la dirección');
      }
    });
  }

  sendLocation() {
    if (!this.selected) return;

    this.http.post('http://localhost:8080/api/locations', this.selected)
      .subscribe({
        next: () => alert('Ubicación guardada'),
        error: (err) => { console.error(err); alert('Error guardando'); }
      });
  }
}