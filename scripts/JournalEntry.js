export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <fieldset>
                <label for="journalDate">Date</label>
                <input type="date" name="journalDate" id="journalDate">
            </fieldset>

            <fieldset>
                <label for="journalConcept">Consept(s) Covered</label>
                <input type="text" name="journalConcept" id="journalConcept">
            </fieldset>

            <fieldset>
                <label for="journalEntry">Entry</label>
                <input type="textarea" name="journalEntry" id="journalEntry">
            </fieldset>
        </section>
    `
}