import { hideButton } from "../FixFunctions/HideEntriesButton.js"
import { pastEntriesHeading } from "../FixFunctions/PastEntriesHeading.js"
import { getEntries, useJournalEntries, deleteEntry } from "../JournalDataProvider.js"
import { JournalEntryComponent } from "../JournalEntry.js"
import { FilterBar } from "../Moods/FilterBar.js"

// DOM reference to where all entries will be rendered

const entryLog = document.querySelector(".pastEntries")

export const EntryListComponent = () => {
    // Use the journal entry data from the data provider component
    getEntries()
        .then(() => { 
        const entries = useJournalEntries()

        entryLog.innerHTML = entries.map(entry => JournalEntryComponent(entry)).join("")
        
        return entryLog.innerHTML
        }
        )
        // Only runs when Show Entries button is clicked
        .then(() => {
            // Recreates Past Entries header at the top of container
            if (stateChanged === true) {
                // Put heading back after Show Entries is clicked
                pastEntriesHeading()
            }
        })
        .then(() => {
            // renders button for user to hide past journal entries after header
            hideButton()
        })
       
}

// Renders saved entries to DOM when Show Entries button is clicked
const eventHub = document.querySelector(".container")

    let stateChanged = false
    let showNotesPreviouslyClicked = false
    eventHub.addEventListener("ShowEntriesClicked", event => {
        
        if (showNotesPreviouslyClicked === false) {
            EntryListComponent()
            FilterBar()
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

// Rnvokesn delete function when Delete button is clicked
eventHub.addEventListener("DeleteButtonClicked", event => {
    stateChanged = true
    deleteEntry(event.detail.id)
})