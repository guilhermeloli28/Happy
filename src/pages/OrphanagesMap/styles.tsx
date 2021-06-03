import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageMap = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    
    .leaflet-container {
        z-index: 5;
    }

    aside {
        width: 440px;
        padding: 80px;
        display: flex;
        background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
        flex-direction: column;
        justify-content: space-between;

        header img {
            animation: myLogo 1.5s linear 0s infinite alternate;

            @keyframes myLogo {
                from {
                    transform: translateX(0px) rotate(360deg) scale(2);
                }
                to {
                    transform: translateX(180px) rotate(0deg);
                }
            }
        }

        h2 {
            font-size: 40px;
            font-weight: 800;
            line-height: 42px;
            margin-top: 64px;
        }

        p {
            line-height: 28px;
            margin-top: 24px;
        }

        footer {
            display: flex;
            flex-direction: column;
            line-height: 24px;

            strong {
                font-weight: 800;
            }
        }
    }

    .map-popup .leaflet-popup-content-wrapper {
        background: rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        box-shadow: none;
    }

    .map-popup .leaflet-popup-content {
        color: #0089a5;
        font-size: 20px;
        font-weight: bold;
        margin: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .map-popup .leaflet-popup-content a {
        width: 40px;
        height: 40px;
        background: #15c3d6;
        box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .map-popup .leaflet-popup-tip-container {
        display: none;
    }
`

export const CreateOrphanage = styled(Link)`
    position: absolute;
    right: 40px;
    bottom: 40px;

    z-index: 10;

    width: 64px;
    height: 64px;
    background: #15c3d6;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    &:hover {
        background: #17d6eb;
    }

    animation: scaleButton 1s infinite alternate;

    @keyframes scaleButton {
      from {
        transform: scale(1.2);
      }
      to {
        transform: scale(1);
      }
    }

`