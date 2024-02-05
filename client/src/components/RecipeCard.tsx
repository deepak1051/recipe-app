import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  onRecipeSelect: (recipe: Recipe) => void;
  onFavoriteButtonClick: (recipe: Recipe) => void;
  isFavorite: boolean;
}

const RecipeCard = ({
  recipe,
  onRecipeSelect,
  onFavoriteButtonClick,
  isFavorite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={() => onRecipeSelect(recipe)}>
      <img src={recipe.image} />
      <div className="recipe-card-title">
        <span
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteButtonClick(recipe);
          }}
        >
          {isFavorite ? (
            <AiFillHeart size={25} fill="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
