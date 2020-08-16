import Vuex from 'vuex'
import MealDb from './mealdb'
const MealDbStore = () => {
    return new Vuex.Store({
        modules: {
            MealDb
        }
    })
}

export default MealDbStore