const contentTarget = document.querySelector(".pastEntries")

export const ShowNotesButton = () => {
    contentTarget.innerHTML += `
        
        <button id="ShowEntriesButton">Show Past Journal Entries</button>
    `
}

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
    if (event.target.id === "ShowEntriesButton") {
        const customEvent = new CustomEvent("ShowEntriesClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

