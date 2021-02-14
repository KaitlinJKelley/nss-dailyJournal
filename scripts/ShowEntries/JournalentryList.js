import { getEntries, useJournalEntries, deleteEntry } from "../JournalDataProvider.js"
import { JournalEntryComponent } from "../JournalEntry.js"

// DOM reference to where all entries will be rendered

const entryLog = document.querySelector(".pastEntries")
const place = document.querySelector(".afterMe")

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
               
                let container = document.querySelector(".pastEntries")
                
                let header = document.createElement('h2');
                header.innerHTML = '<p class="pastHeader">Past Entries</p>';
                container.prepend(header);
            }
        })
        .then(() => {
            // renders button for user to hide past journal entries after header
            let container = document.querySelector(".pastHeader")
            
            let hideButton = document.createElement('button');
            hideButton.innerHTML = '<p>Hide Past Entries</p>';
            container.after(hideButton);
        })
}

// Renders saved entries to DOM when Show Entries button is clicked
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

// Rnvokesn delete function when Delete button is clicked
eventHub.addEventListener("DeleteButtonClicked", event => {
    stateChanged = true
    deleteEntry(event.detail.id)
})