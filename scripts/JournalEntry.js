export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h3>${entry.concept}</h3>
            <p>${entry.entry}</p>
            <p>Entry Date: ${entry.date}</p>
            <p>Mood: ${entry.mood.label}</p>
            <p>Instructor: ${entry.instructor.first_name} ${entry.instructor.last_name}</p>
        </section>
    `
}