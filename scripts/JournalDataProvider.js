let journal = []

export const getEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor") // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entries => {
            // What should happen when we finally have the array?
            journal = entries
        })
}
/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            nextEntry.id - currentEntry.id
    )
    return sortedByDate
}


const eventHub = document.querySelector(".container")

// Tells the application that the state of the journal entries has chancged
const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}


export const saveJournalEntry = entryObj => {
    // Use `fetch` with the POST method to add your entry to your API
fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(entryObj)
})
    .then(getEntries)  // <-- Get all journal entries
    .then(dispatchStateChangeEvent)  // <-- Broadcast the state change event
}


export const deleteEntry = entryObj => {
    // Use `fetch` with the POST method to add your entry to your API
    return fetch(`http://localhost:8088/entries/${entryObj}?_expand=mood&_expand=instructor`, {
        method: "DELETE",
        })
        .then(getEntries)  // <-- Get all journal entries
        .then(dispatchStateChangeEvent)  // <-- Broadcast the state change event
}