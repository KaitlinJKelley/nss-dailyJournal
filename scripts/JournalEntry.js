import { getEntries, useJournalEntries } from "./JournalDataProvider.js"

export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p>${entry.entry}</p>
            <p>Entry Date: ${entry.date}</p>
            <p>Mood: ${entry.mood.label}</p>
            <p>Instructor: ${entry.instructor.first_name} ${entry.instructor.last_name}</p>
            <button id="editEntry--${entry.id}">Edit</button>
            <input type="hidden" name="entryId" id="entryId">
            <button id="deleteEntry--${entry.id}">Delete</button>
        </section>
    `
}

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteEntry") ) {
        const [prefix, entryId] = event.target.id.split("--")

        const customEvent = new CustomEvent("DeleteButtonClicked", {
            detail: {
                id: parseInt(entryId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

eventHub.addEventListener("editClicked", event => {
    getEntries()
    .then(() => {
        const entriesCollection = useJournalEntries()
        const entryToEdit = entriesCollection.find(entry => parseInt(event.detail.id) === entry.id)

        renderToEdit(entryToEdit)

        const customEvent = ("journalEdited", {
            detail: {
                editedId: entryToEdit.id
            }
        })
        eventHub.dispatchEvent(customEvent)
    })
})

const renderToEdit = (editEntry) => {
    let date = document.querySelector("#journalDate")
    let concept = document.querySelector("#journalConcept")
    let entry = document.querySelector("#journalEntry")
    let instructor = document.querySelector("#whoTaught")
    let mood = document.querySelector("#journalMood")

    date.value = editEntry.date
    concept.value = editEntry.concept
    entry.value = editEntry.entry
    instructor.value = editEntry.instructor.id
    mood.value = editEntry.mood.id
}
