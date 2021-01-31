let contentTarget = document.querySelector("form")

export const JournalFormComponent = () => {
    contentTarget.innerHTML += `
    <fieldset>
        <label for="journalDate">Entry Date</label>
        <input type="date" name="journalDate" id="journalDate">
    </fieldset>

    <fieldset>
        <label for="journalConcept">Concept(s) Covered</label>
        <input class="concept" type="text" name="journalConcept" id="journalConcept">
    </fieldset>
    <fieldset class="textarea">
        <label for="journalEntry">What did you learn today?</label>
        <input type="textarea" name="journalEntry" id="journalEntry">
    </fieldset>

    <fieldset>
        <label for="journalMood">Mood:</label>
        <select name="journalMood" id="journalMood">
            <option value="help">Help!</option>
            <option value="meh">Meh</option>
            <option value="good">I Got This!</option>
            </select>
    </fieldset>

    <button type="submit" id="recordJournalButton">Record Journal Entry</button>
    `
}