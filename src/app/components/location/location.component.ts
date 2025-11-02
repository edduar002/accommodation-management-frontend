import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 IMPORTA ESTO

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  standalone: true,
  imports: [
    CommonModule, // ✅ AGREGA AQUÍ
    FormsModule,
    HttpClientModule,
  ],
})
export class LocationComponent implements AfterViewInit {
  map!: L.Map;
  marker!: L.Marker;
  selected: { lat: number; lng: number } | null = null;
  searchText: string = '';

  @Output() locationSelected = new EventEmitter<{ lat: number; lng: number }>();

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([4.6482837, -74.0636163], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.marker = L.marker([4.6482837, -74.0636163], { draggable: true }).addTo(
      this.map
    );

    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.selected = { lat: pos.lat, lng: pos.lng };
      this.locationSelected.emit(this.selected);
    });

    this.map.on('click', (e: any) => {
      const latlng = e.latlng;
      this.marker.setLatLng(latlng);
      this.selected = { lat: latlng.lat, lng: latlng.lng };
      this.locationSelected.emit(this.selected);
    });
  }

  searchLocation() {
    if (!this.searchText) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      this.searchText
    )}`;
    this.http.get<any[]>(url).subscribe((results) => {
      if (results.length > 0) {
        const place = results[0];
        const lat = parseFloat(place.lat);
        const lng = parseFloat(place.lon);

        this.map.setView([lat, lng], 15);
        this.marker.setLatLng([lat, lng]);
        this.selected = { lat, lng };
        this.locationSelected.emit(this.selected);
      } else {
        alert('No se encontró la dirección');
      }
    });
  }
}
