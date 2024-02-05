import { useEffect, useRef, useState } from 'react';
import * as api from './api';
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { AiOutlineSearch } from 'react-icons/ai';

type Tabs = 'search' | 'favorites';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );

  const [selectedTab, setSelectedTab] = useState<Tabs>('search');

  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteRecipes = await api.getFavoriteRecipes();
        setFavoriteRecipes(favoriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);

      setRecipes((prev) => [...prev, ...nextRecipes.results]);
    } catch (error) {
      console.log(error);
    }
  };

  const onRecipeSelect = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavoriteRecipe(recipe);

      setFavoriteRecipes((prev) => [...prev, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavoriteRecipe(recipe);

      setFavoriteRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app-container">
      <div className="header">
        <img src="https://shorturl.at/tzNU8" alt="" />
        <div className="title">Recipe App</div>
      </div>
      <div className="tabs">
        <h1
          className={selectedTab === 'search' ? 'tab-active' : ''}
          onClick={() => setSelectedTab('search')}
        >
          Recipe Search
        </h1>
        <h1
          className={selectedTab === 'favorites' ? 'tab-active' : ''}
          onClick={() => setSelectedTab('favorites')}
        >
          Favorites
        </h1>
      </div>

      {selectedTab === 'search' ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Enter a search term"
              required
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch size={40} />
            </button>
          </form>

          <div className="recipe-grid">
            {recipes.map((recipe) => {
              const isFav = favoriteRecipes.some((f) => f.id === recipe.id);
              return (
                <RecipeCard
                  onRecipeSelect={onRecipeSelect}
                  recipe={recipe}
                  key={recipe.id}
                  onFavoriteButtonClick={
                    isFav ? removeFavoriteRecipe : addFavoriteRecipe
                  }
                  isFavorite={isFav}
                />
              );
            })}
          </div>

          <button onClick={handleViewMore} className="view-more-button">
            View More
          </button>

          {selectedRecipe ? (
            <RecipeModal
              onClose={() => setSelectedRecipe(undefined)}
              recipeId={selectedRecipe.id}
            />
          ) : null}
        </>
      ) : (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onRecipeSelect={onRecipeSelect}
              onFavoriteButtonClick={removeFavoriteRecipe}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
