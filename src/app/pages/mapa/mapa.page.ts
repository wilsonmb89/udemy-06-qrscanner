import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  latitud: number;
  longitud: number;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const geoInput = this._activatedRoute.snapshot.paramMap.get('geo').replace('geo:', '').split(',');
    this.latitud = Number(geoInput[0]);
    this.longitud = Number(geoInput[1]);
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsc29ubWI4OSIsImEiOiJjazk3dXQ1ZDUwemNqM3BsMnE5eDN1NWNuIn0.JbsHHrjS7D_dEojRog17pg';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.longitud, this.latitud], // [longitud, latitud]
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    new mapboxgl.Marker().setLngLat([this.longitud, this.latitud]).addTo(map);

    map.on('load', () => {
      map.resize();
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      let labelLayerId;
      const layerLength = layers.length;
      for (let i = 0; i < layerLength; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
  }
}
