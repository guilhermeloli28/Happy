import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { FiClock, FiInfo } from 'react-icons/fi';
import {
    Container,
    OrphanageDetails,
    Images,
    OrphanageDetailsContent,
    MapContainer,
    OpenDetails,
  } from './styles';
import { Map, Marker, TileLayer } from 'react-leaflet';
import mapIcon from '../utils/mapIcon';
import Sidebar from '../../components/Sidebar';
import { useParams } from 'react-router-dom';


interface Orphanages {
    name: string,
    latitude: number;
    longitude: number;
    about: string;
    description: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
        id: number;
        url: string;
    }>
}

interface RouteParams {
    id: string;
}

const Orphanage = () => {
    const params = useParams<RouteParams>();
    const [orphanage, setOrphanage] = useState<Orphanages>();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response => {
            setOrphanage(response.data)
        });
    }, [params.id]);

    if (!orphanage) {
        return <p>Carregando...</p>
    }

    return (
        <Container>
            <Sidebar />
            <main>
                <OrphanageDetails> 
                    <img
                        src={orphanage.images[activeImageIndex].url}
                        alt={orphanage.name}
                    />

                    <Images>
                    {orphanage.images.map((image, index) => {
                        return (
                            <button
                                key={image.id}
                                onClick={() => {
                                    setActiveImageIndex(index)
                                }}
                                className={activeImageIndex === index ? 'active' : ''}
                                type="button"
                            >
                                <img src={image.url} alt={orphanage.name} />
                            </button>
                        )
                    })}
                    </Images>

                    <OrphanageDetailsContent>
                        <h1>{orphanage.name}</h1>
                        <p>{orphanage.about}</p>

                        <MapContainer>
                            <Map
                                center={[orphanage.latitude, orphanage.longitude]}
                                zoom={16}
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[orphanage.latitude, orphanage.longitude]}
                                />
                            </Map>

                            <footer>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                                    >
                                    Ver rotas no Google Maps
                                </a>
                            </footer>
                        </MapContainer>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>{orphanage.instructions}</p>

                        <OpenDetails>
                            <div className="hour">
                                <FiClock size={32} color="#15B6D6" />
                                Segunda à Sexta
                                <br />
                                {orphanage.opening_hours}
                            </div>
                            {orphanage.open_on_weekends ? (
                                <div className="open-on-weekends">
                                    <FiInfo size={32} color="#39CC83" />
                                    Atendemos
                                    <br />
                                    fim de semana
                                </div>
                            ) : (
                                <div className="open-on-weekends dont-open">
                                    <FiInfo size={32} color="#FF669D" />
                                    Não Atendemos
                                    <br />
                                    fim de semana
                                </div>
                            )}
                        </OpenDetails>
                    </OrphanageDetailsContent>
                </OrphanageDetails>
            </main>
        </Container>
    )
}

export default Orphanage;