import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import path from 'path';
import * as RecipeAPI from './recipe-api';

const app = express();

const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get('/api/recipes/search', async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);

  const results = await RecipeAPI.searchRecipes(searchTerm, page);

  res.json(results);
});

app.get('/api/recipes/:recipeId/summary', async (req, res) => {
  const { recipeId } = req.params;
  const result = await RecipeAPI.getRecipeSummary(recipeId);

  return res.json(result);
});

app.post('/api/recipes/favorite', async (req, res) => {
  const { recipeId } = req.body;
  try {
    const favoriteRecipe = await prismaClient.favoriteRecipes.create({
      data: {
        recipeId,
      },
    });
    return res.status(201).json(favoriteRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Oops something went wrong' });
  }
});

app.get('/api/recipes/favorite', async (req, res) => {
  try {
    const recipes = await prismaClient.favoriteRecipes.findMany();

    const recipesIds = recipes.map((recipe) => recipe.recipeId.toString());

    const favorites = await RecipeAPI.getFavoriteRecipesByIDs(recipesIds);

    return res.json(favorites);
  } catch (error) {
    return res.status(500).json({ error: 'Oops something went wrong' });
  }
});

app.delete('/api/recipes/favorite', async (req, res) => {
  const { recipeId } = req.body;

  try {
    await prismaClient.favoriteRecipes.delete({
      where: {
        recipeId,
      },
    });

    return res.status(200).json('deleted');
  } catch (error) {
    return res.status(500).json({ error: 'Oops something went wrong' });
  }
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(5000, () => console.log(`server running on port ${port}`));
