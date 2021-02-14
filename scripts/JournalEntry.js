export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p>${entry.entry}</p>
            <p>Entry Date: ${entry.date}</p>
            <p>Mood: ${entry.mood.label}</p>
            <p>Instructor: ${entry.instructor.first_name} ${entry.instructor.last_name}</p>
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