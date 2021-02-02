import { saveJournalEntry } from "./JournalDataProvider.js"

let contentTarget = document.querySelector("form")

export const JournalFormComponent = () => {
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
        <p>Mood: </p>
        <input type="radio" id="good" value="moods">
        <label for="good">I Got This!</label>
        
        <input type="radio" id="meh" value="moods">
        <label for="meh">Meh</label>
        
        <input type="radio" id="help" value="moods">
        <label for="help">Help!</label>
    </fieldset>

    <button type="submit" id="recordJournalButton">Record Journal Entry</button>
    `
}

const eventHub = document.querySelector(".container")


eventHub.addEventListener("click", event => {
    if (event.target.id === "recordJournalButton") {
        const newJournalEntry = {
            date: document.querySelector("#journalDate").value,
            concept: document.querySelector("#journalConcept").value,
            entry: document.querySelector("#journalEntry").value,
            mood: document.querySelector('input[type="radio"]').checked.value 
        }
        saveJournalEntry(newJournalEntry)
    }
})
