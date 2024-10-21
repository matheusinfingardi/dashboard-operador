"use client"

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Map } from 'lucide-react';

const position: LatLngExpression = [51.505, -0.09];

const MapComponent: React.FC = () => (
<Card className="w-full md:w-1/2 md:max-w-[600px]">
    <CardHeader>
        <div className="flex items-center justify-center">
            <CardTitle className="text-lg sm:text-xl text-gray-800">
                Acompanhe seus pedidos em tempo real
            </CardTitle>
            <Map className="ml-auto w-4 h-4"/>
        </div>
    </CardHeader>

    <CardContent>
        <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
            <Popup>
                Localização atual: {position[0]}, {position[1]}
            </Popup>
            </Marker>
        </MapContainer>
    </CardContent>
    
</Card>
);

export default MapComponent;
