import { MoodFilter } from "./MoodFilter.js"
import { getMoods, useMoods } from "./MoodProvider.js"

/*
 You need to make a new HTML element with a class of
 `filters` in index.html
*/
const contentTarget = document.querySelector(".form")

export const FilterBar = () => {
    const render = () => {
        getMoods()
        .then(() => {
        let allMoods = useMoods()

        contentTarget.innerHTML += `
        ${MoodFilter(allMoods)}
    `})
        
    }

    render()
}


