import { getEntries, useJournalEntries, deleteEntry } from "../JournalDataProvider.js"
import { JournalEntryComponent } from "../JournalEntry.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector(".pastEntries")

export const EntryListComponent = () => {
    // Use the journal entry data from the data provider component
    getEntries()
        .then(() => { 
        const entries = useJournalEntries()

        for (const entry of entries) {
            /*
                Invoke the component that returns an
                HTML representation of a single entry
            */
        entryLog.innerHTML += JournalEntryComponent(entry)
        }
        return entryLog.innerHTML
        }
    )
}

const eventHub = document.querySelector(".container")

let stateChanged = false
let showNotesPreviouslyClicked = false
eventHub.addEventListener("ShowEntriesClicked", event => {
    
    if (showNotesPreviouslyClicked === false) {
        EntryListComponent()
        stateChanged = true
        showNotesPreviouslyClicked = true
        }
    }
)

// Listen for state change. If the state was changed to true => get entries, copy array, copy the last (newest) object into a new array, 
// run that object through the JournalEntryComponent, and render to DOM in past entries
eventHub.addEventListener("journalStateChanged", event => {
    
    if (stateChanged === true) {
    EntryListComponent()
    }
})

eventHub.addEventListener("DeleteButtonClicked", event => {
    stateChanged = true
    deleteEntry(event.detail.id)
})