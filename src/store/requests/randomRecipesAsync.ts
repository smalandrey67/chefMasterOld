import { createAsyncThunk } from '@reduxjs/toolkit'
import { getRandomRecipes } from '../../config'

export const randomRecipeAsync = createAsyncThunk(
    'randomRecipe/randomRecipeAsync',

    async (_, { rejectWithValue }) => {
        try {
            if(localStorage.getItem('recipes')){
                return [...JSON.parse(localStorage.getItem('recipes') || '')]
            }

            const response = await fetch(getRandomRecipes())

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const data = await response.json()

            localStorage.setItem('recipes', JSON.stringify(data.recipes))

            return data.recipes
        } catch (error) {
            console.log((error as Error).message)
            return rejectWithValue((error as Error).message)
        }
    }
)