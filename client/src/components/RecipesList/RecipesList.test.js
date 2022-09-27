import React from "react";
import { render } from '@testing-library/react';
import RecipesList from './RecipesList'

describe('Recipes List test', () => {
    let component

    beforeEach(() => {
        component = render(<RecipesList/>)
    })

    test('Initially there must be 9 recipe cards', () => {
        component.getBy
    })
})