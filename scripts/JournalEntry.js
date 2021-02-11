export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p>${entry.entry}</p>
            <p>Entry Date: ${entry.date}</p>
            <p>Mood: ${entry.mood}</p>
        </section>
    `
}