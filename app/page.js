import {getGamesByCategory} from './data/data-utils.js'

import {Banner} from './components/Banner/Banner' 
import {Promo} from './components/Promo/Promo' 
import { CardsListSection } from './components/CardsListSection/CardsListSection.jsx';

export default function Home() {
    const popularGames = getGamesByCategory("popular");
    const newGames = getGamesByCategory("new"); 
    return (
        <main className="main">
            <Banner />
            <CardsListSection type="slider" id="popular" title="Популярные" data={popularGames} />
            <CardsListSection type="slider" id="new" title="Новинки" data={newGames} />
            <Promo/>
        </main>
  );
}