import * as axios from "axios";

export default {
    state: {
        currentMeals: [],
        currentVisibleMeals: [],
        availableIngredients: [],
        availableAreas: [],
        availableCategories: [],
        favoriteMeals: [],
        currentCategories: [],
        currentAreas: [],
        currentIngredients: [],
        currentMeal: null
    },
    getters: {
        getCurrentMeals: state => { return state.currentMeals },
        getCurrentVisibleMeals: state => { return state.currentVisibleMeals },
        getAvailableIngredients: state => { return state.availableIngredients },
        getAvailableAreas: state => { return state.availableAreas },
        getAvailableCategories: state => { return state.availableCategories },
        getFavoriteMeals: state => { return state.favoriteMeals },
        getCurrentCategories: state => { return state.currentCategories },
        getCurrentAreas: state => { return state.currentAreas },
        getCurrentIngredients: state => { return state.currentIngredients },
        getCurrentMeal: state => { return state.currentMeal }
    },
    mutations: {
        setCurrentMeal(state, meal) {
            state.currentMeal = meal
        },
        closeCurrentMeal(state) {
            state.currentMeal = null
        },
        getAreasFromResults(state, payload) {
            state.availableAreas = []
            payload.results.map((meal) => {
                if (meal !== undefined) {
                    if (state.availableAreas.indexOf(meal.strArea) === -1) {
                        state.availableAreas.push(meal.strArea)
                    }
                }
            })
        },
        getCategoriesFromResults(state, payload) {
            state.availableCategories = []
            payload.results.map((meal) => {
                if (meal !== undefined) {
                    if (state.availableCategories.indexOf(meal.strCategory) === -1) {
                        state.availableCategories.push(meal.strCategory)
                    }
                }
            })
        },
        getIngredientsFromResults(state, payload) {
            state.availableIngredients = []
            payload.results.map((meal) => {
                if (meal !== undefined) {
                    for (let x = 1; x <= 20; x++) {
                        let ingredientKey = `strIngredient${x}`
                        if (meal[ingredientKey]) {
                            if (state.availableIngredients.indexOf(meal[ingredientKey]) === -1) {
                                state.availableIngredients.push(meal[ingredientKey])
                            }
                        }
                    }
                }
            })
        },
        loadFavoriteMeals(state) {
            if (localStorage.favoriteMeals) {
                state.favoriteMeals = JSON.parse(localStorage.favoriteMeals)
            }
        },
        syncFavoriteMeals(state) {
            localStorage.favoriteMeals = JSON.stringify(state.favoriteMeals)
        },
        addFavoriteMeal(state, payload) {
            let index = state.favoriteMeals.findIndex((meal) => {
                return payload.meal.idMeal === meal.idMeal
            })
            if (index === -1) {
                state.favoriteMeals.push(payload.meal)
            }
        },
        removeFavoriteMeal(state, payload) {
            let index = state.favoriteMeals.findIndex((meal) => {
                return payload.meal.idMeal === meal.idMeal
            })
            if (index !== -1) {
                state.favoriteMeals.splice(index, 1)
            }
        },
        addProductsFromResult(state, payload) {
            state.currentMeals = payload.results
            state.currentVisibleMeals = payload.results
        },
        updateCategoryFilter(state, category) {
            if (state.currentCategories.indexOf(category) === -1 ) {
                state.currentCategories.push(category)
            } else {
                state.currentCategories.splice(state.currentCategories.indexOf(category), 1)
            }
        },
        updateAreaFilter(state, area) {
            if (state.currentAreas.indexOf(area) === -1 ) {
                state.currentAreas.push(area)
            } else {
                state.currentAreas.splice(state.currentAreas.indexOf(area), 1)
            }
        },
        updateIngredientsFilter(state, ingredient) {
            if (state.currentIngredients.indexOf(ingredient) === -1) {
                state.currentIngredients.push(ingredient)
            } else {
                state.currentIngredients.splice(state.currentIngredients.indexOf(ingredient), 1)
            }
        },
        filterByCategory(state) {
            state.currentVisibleMeals = []
            if (state.currentCategories.length > 0) {
                state.currentMeals.map((meal) => {
                    if (meal !== undefined) {
                        if (state.currentCategories.indexOf(meal.strCategory) !== -1) {
                            state.currentVisibleMeals.push(meal)
                        }
                    }
                })
            } else {
                state.currentVisibleMeals = state.currentMeals
            }
        },
        filterByArea(state) {
            if (state.currentAreas.length > 0) {
                let products = state.currentVisibleMeals
                state.currentVisibleMeals = []
                products.map((meal) => {
                    if (meal !== undefined) {
                        if (state.currentAreas.indexOf(meal.strArea) !== -1) {
                            state.currentVisibleMeals.push(meal)
                        }
                    }
                })
            }
        },
        filterByIngredients(state) {
            if (state.currentIngredients.length > 0) {
                let products = state.currentVisibleMeals
                state.currentVisibleMeals = []
                products.map((meal) => {
                    if (meal !== undefined) {
                        for (let x = 1; x <= 20; x++) {
                            let ingredientKey = `strIngredient${x}`
                            let index = state.currentVisibleMeals.findIndex((currentMeal) => {
                                return currentMeal.idMeal === meal.idMeal
                            })
                            if (state.currentIngredients.indexOf(meal[ingredientKey]) !== -1 && index === -1) {
                                state.currentVisibleMeals.push(meal)
                            }
                        }
                    }
                })
            }
        }
    },
    actions: {
        setCurrentMeal({commit}, meal) {
            commit('setCurrentMeal', meal)
        },
        closeCurrentMeal({commit}) {
            commit('closeCurrentMeal')
        },
        update({dispatch}, result) {
            dispatch('getAreasFromResults', result)
            dispatch('getCategoriesFromResults', result)
            dispatch('getIngredientsFromResults', result)
            dispatch('addProductsFromResults', result)
        },
        filter({commit}) {
            commit('filterByCategory')
            commit('filterByArea')
            commit('filterByIngredients')
        },
        updateCategoryFilter({commit, dispatch, state}, category) {
            commit('updateCategoryFilter', category)
            dispatch('filter')
            commit('getCategoriesFromResults', {results: state.currentVisibleMeals})
            commit('getAreasFromResults', {results: state.currentVisibleMeals})
            commit('getIngredientsFromResults', {results: state.currentVisibleMeals})
        },
        updateAreaFilter({commit, dispatch, state}, area) {
            commit('updateAreaFilter', area)
            dispatch('filter')
            commit('getCategoriesFromResults', {results: state.currentVisibleMeals})
            commit('getAreasFromResults', {results: state.currentVisibleMeals})
            commit('getIngredientsFromResults', {results: state.currentVisibleMeals})
        },
        updateIngredientsFilter({commit, dispatch, state}, ingredient) {
            commit('updateIngredientsFilter', ingredient)
            dispatch('filter')
            commit('getCategoriesFromResults', {results: state.currentVisibleMeals})
            commit('getAreasFromResults', {results: state.currentVisibleMeals})
            commit('getIngredientsFromResults', {results: state.currentVisibleMeals})
        },
        addFavoriteMeal({commit}, meal) {
            commit('addFavoriteMeal', {meal: meal})
            commit('syncFavoriteMeals')
        },
        removeFavoriteMeal({commit}, meal) {
            commit('removeFavoriteMeal', {meal: meal})
            commit('syncFavoriteMeals')
        },
        addProductsFromResults({commit}, results) {
            commit('addProductsFromResult', {results: results})
        },
        getAreasFromResults({commit}, results) {
            commit('getAreasFromResults', {results: results})
        },
        getCategoriesFromResults({commit}, results) {
            commit('getCategoriesFromResults', {results: results})
        },
        getIngredientsFromResults({commit}, results) {
            commit('getIngredientsFromResults', {results: results})
        },
        initialLoad({dispatch, commit}) {
            commit('loadFavoriteMeals')
            axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=Soup').then((result) => {
                dispatch('update', result.data.meals)
            })
        },
        searchByString({dispatch}, category) {
            axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`).then((result) => {
                dispatch('update', result.data.meals)
            })
        }
    }
}