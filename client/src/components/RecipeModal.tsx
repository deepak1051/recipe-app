import { useEffect, useState } from 'react';
import { RecipeSummary } from '../types';

import * as api from '../api';

interface Props {
  recipeId: number;
  onClose: () => void;
}

const RecipeModal = ({ recipeId, onClose }: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipes = await api.getRecipeSummary(recipeId);
        setRecipeSummary(recipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => console.log('clean up');
  }, [recipeId]);

  if (!recipeSummary) return null;

  console.log(recipeSummary);

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary?.title}</h2>
            <span onClick={onClose} className="close-btn">
              &times;
            </span>
          </div>

          <p dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }} />
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
