import { hideButton } from "../FixFunctions/HideEntriesButton.js"
import { pastEntriesHeading } from "../FixFunctions/PastEntriesHeading.js"
import { getEntries, useJournalEntries } from "../JournalDataProvider.js"
import { JournalEntryComponent } from "../JournalEntry.js"
import { getMoods, useMoods } from "./MoodProvider.js"

export const MoodFilter = (moods) => {
  
        let allMoods = useMoods()

        return `
        <section class="filters">
            <fieldset class="fieldset">
                <legend>Filter Journal Entries by Mood</legend>
                ${
                    allMoods.map(
                        (mood) => {
                            return `<input type="radio" name="moodFilter" value="${ mood.id }"/>
                            <label for="moodFilter--happy">${ mood.label }</label>
                            `
                        }
                    ).join("")
                }
            </fieldset>
        </section>
        `       
}

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".pastEntries")

// Filters entries by mood when the user selects a radio button is the Filter By Mood section
eventHub.addEventListener("change", e => {
    if (e.target.name === "moodFilter") {
        // debugger
        getEntries()
        .then(() => {

            let allEntries = useJournalEntries()
            let selectedMood = parseInt(e.target.value)
            // Filters entries down to only entries that have the same Id as the clicked button's value
            const filteredEntries = allEntries.filter((entry => entry.moodId === selectedMood))

            // Translates each object into HTML and renders to DOM
            contentTarget.innerHTML = filteredEntries.map(entry => JournalEntryComponent(entry)).join("")
        
        })
        .then(pastEntriesHeading)
        .then(hideButton)
    }
})