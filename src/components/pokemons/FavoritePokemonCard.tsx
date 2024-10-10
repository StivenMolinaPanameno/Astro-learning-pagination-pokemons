import type { FavoritePokemon } from "@interfaces/favorite-pokemon"
import { createSignal, Show, type Component } from "solid-js";

interface Props {
    pokemon: FavoritePokemon;
}

export const FavoritePokemonCard:Component<Props> = (props) => {
    const {pokemon} = props;
    const [isVisible, setIsVisible ] = createSignal(true)
    const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    
    const deleteFavorite = () => {
        const favorites = JSON.parse (
            localStorage.getItem('favorites') ?? '[]'
        ) as FavoritePokemon[];

        const newFavorites = favorites.filter(p => p.id !== pokemon.id)
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsVisible(false)
    }

    return (
        <>
            <Show when={isVisible()}>

                <div class="flex flex-col justify-center items-center">
                    <a href={`/pokemons/${pokemon.name}`}> 
                        <img
                            style={`view-transition-name: ${pokemon.name}-image`}
                            src={imageSrc} width="96" height="96" alt={pokemon.name} />
                        <p class="capitalize">#{pokemon.id} {pokemon.name}</p>
                    </a>
                    <button onclick={deleteFavorite} class="text-red-400">Borrar</button>
                </div>
            </Show>
        </>
    ) 
} 