import { FC } from 'react'


import { ErrorMessage, SpinnerWrapper, Spinner } from 'assets/styled/Reused.styled'
import SpinnerBg from 'assets/images/icons/spinner-bg.svg'

import { RecipeCard } from '../RecipeCard/RecipeCard'
import { BiError } from 'react-icons/bi'
import { RecipeResultType } from 'types/Recipe'

import { splideOptions } from 'utils/constants/splide.constants'
import { useGetRandomRecipesQuery } from 'services/RecipesService'
import { Splide } from '@splidejs/react-splide'

import { SectionContainer } from 'components/containers/SectionContainer/SectionContainer'

export const Recipes: FC = () => {
    const { data: recipes, error, isLoading } = useGetRandomRecipesQuery()

    return (
        <SectionContainer>
            <Splide options={splideOptions(3)}>
                {isLoading ?
                    <SpinnerWrapper height='50vh'>
                        <Spinner src={SpinnerBg} alt='spinner' />
                    </SpinnerWrapper>
                    :
                    recipes?.map((recipe: RecipeResultType): JSX.Element => <RecipeCard key={recipe.id} {...recipe} />)
                }
            </Splide>

            {error && <ErrorMessage><BiError />Server error</ErrorMessage>}
        </SectionContainer>
    )
}