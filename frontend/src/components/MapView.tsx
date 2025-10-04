import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Doctor } from '../types';

interface MapViewProps {
  doctors: Doctor[];
  onDoctorSelect: (doctorId: string) => void;
}

export function MapView({ doctors, onDoctorSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current && !googleMapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 }, // Center of India
          zoom: 5,
        });
        googleMapRef.current = map;

        // Add markers for each doctor
        doctors.forEach(doctor => {
          if (doctor.location?.coordinates) {
            const marker = new google.maps.Marker({
              position: {
                lat: doctor.location.coordinates.latitude,
                lng: doctor.location.coordinates.longitude,
              },
              map,
              title: doctor.name,
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${doctor.name}</h3>
                  <p>${doctor.specialty}</p>
                  <p class="text-sm text-gray-600">${doctor.location.address}</p>
                </div>
              `,
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
              onDoctorSelect(doctor.id);
            });

            markersRef.current.push(marker);
          }
        });
      }
    });

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [doctors, onDoctorSelect]);

  return (
    <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow-md" />
  );
}