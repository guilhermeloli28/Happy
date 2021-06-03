import React, { useState, useEffect } from 'react';
import { PageMap, CreateOrphanage  } from './styles';
import mapMarkerImg from '../../images/mapMarker.svg';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import  { Map , TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import 'leaflet/dist/leaflet.css';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

interface Orphanage {
    id: number;
    name: string,
    latitude: number;
    longitude: number;
}

const OrphanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        });
    }, []);

    return (
        <PageMap>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Orleans</strong>
                    <span>Santa catarina</span>
                </footer>
            </aside>

            <Map 
                center={[-28.3675505, -49.2877006]} 
                zoom={15} 
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                
                {orphanages.map(orphanage => (
                    <Marker 
                        position={[orphanage.latitude, orphanage.longitude]} 
                        icon={mapIcon}
                        key={orphanage.id}
                    >
                        <Popup 
                            closeButton={false} 
                            minWidth={240} 
                            maxWidth={240}
                            className="map-popup"
                        >
                            {orphanage.name}
                            <Link to={`/orphanage/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}

            </Map>

            <CreateOrphanage to="/orphanages/create">
                <FiPlus size={32} color="#fff" />
            </CreateOrphanage>
        </PageMap>
    )
}

export default OrphanagesMap;