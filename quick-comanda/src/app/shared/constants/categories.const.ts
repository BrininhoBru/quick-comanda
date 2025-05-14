import { Category, CategoryValue } from "../models/category.model";

// TODO Colocar icones
export const CATEGORIES: Record<CategoryValue, Category> = {
    beer: {
        value: 'beer',
        label: 'Cervejas',
        icon: 'assets/icon/beer-icon.svg',
    },
    cocktail: {
        value: 'cocktail',
        label: 'Drinks',
        icon: 'assets/icon/cocktail-icon.svg',
    },
    nonAlcoholic: {
        value: 'non-alcoholic',
        label: 'Sem Álcool',
        icon: 'assets/icon/non-alcoholic-icon.svg',
    },
    spirits: {
        value: 'spirits',
        label: 'Destilados',
        icon: 'assets/icon/spirits-icon.svg',
    },
    wine: {
        value: 'wine',
        label: 'Vinhos',
        icon: 'assets/icon/wine-icon.svg',
    },
    burger: {
        value: 'burger',
        label: 'Hamburguers',
        icon: 'assets/icon/burger-icon.svg',
    },
    dessert: {
        value: 'dessert',
        label: 'Sobremesas',
        icon: 'assets/icon/desert-icon.svg',
    },
    snack: {
        value: 'snack',
        label: 'Porções',
        icon: 'assets/icon/snacks-icon.svg',
    },
}

export const CATEGORIES_ARRAY = Object.values(CATEGORIES);