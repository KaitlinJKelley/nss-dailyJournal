import { saveJournalEntry } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "./Moods/MoodProvider.js"

let contentTarget = document.querySelector(".form")


export const JournalFormComponent = () => {
    getMoods()
    .then(() => {
        
        const allMoods = useMoods()
        
        
        
        contentTarget.innerHTML += `
        <fieldset>
        <label for="journalDate">Entry Date</label>
        <input type="date" name="journalDate" id="journalDate">
        </fieldset>
        
        <fieldset>
        <label for="journalConcept">Concept(s) Covered</label>
        <input class="concept" type="text" name="journalConcept" id="journalConcept">
        </fieldset>
        <fieldset class="textarea">
        <label for="journalEntry">What did you learn today?</label>
        <input type="textarea" name="journalEntry" id="journalEntry">
        </fieldset>
        
        <fieldset>
        <label for="journalMood">Mood:</label>
        <select name="journalMood" id="journalMood">
            ${
                allMoods.map(
                    (mood) => {
                        return `<option value="${ mood.id }">${ mood.label }</option>`
                    }
                    ).join("")
            }
            </select>
            </fieldset>
            
            <button type="submit" id="recordJournalButton">Record Journal Entry</button>
            `
        })
}
        
const eventHub = document.querySelector(".container")


eventHub.addEventListener("click", event => {
    if (event.target.id === "recordJournalButton") {
   
        const newJournalEntry = {
            date: document.querySelector("#journalDate").value,
            concept: document.querySelector("#journalConcept").value,
            entry: document.querySelector("#journalEntry").value,
            moodId: document.querySelector("#journalMood").value
        }
        saveJournalEntry(newJournalEntry)
    }
})
