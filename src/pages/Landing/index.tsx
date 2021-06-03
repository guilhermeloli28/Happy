import React from 'react';
import { PageLanding, ContentWrapper, Location, EnterApp } from './styles';
import { FiArrowRight } from 'react-icons/fi';
import logoImg from '../../images/logo.svg';


const Landing: React.FC = () => (
    <PageLanding>
        <ContentWrapper>
            <img src={logoImg} alt="Happy"/>

            <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main> 

            <Location>
                <strong>Orleans</strong>
                <span>Santa Catarina</span>
            </Location>

            <EnterApp to="/app">
                <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
            </EnterApp>
        </ContentWrapper>
    </PageLanding>
)

export default Landing;