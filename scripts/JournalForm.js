import { getInstructors, useInstructors } from "./Instructors/InstructorProvider.js"
import { saveJournalEntry } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "./Moods/MoodProvider.js"

let contentTarget = document.querySelector(".form")


export const JournalFormComponent = () => {
    getMoods()
        .then(() => getInstructors())
            .then(() => {
                
                const allMoods = useMoods()
                const allInstructors = useInstructors()
                
                
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
                    <label for="whoTaught">Instructor: </label>
                    <select name="whoTaught" id="whoTaught">
                        <option value = "0">Please select an instructor</option>
                        ${
                            allInstructors.map(
                                (instructor) => {
                                    return `<option value="${ instructor.id }">${ instructor.first_name } ${ instructor.last_name }</option>`
                                }
                                ).join("")
                        }
                    </select>
                </fieldset>

                <fieldset>
                <label for="journalMood">Mood:</label>
                    <select name="journalMood" id="journalMood">
                    <option value = "0">How are you feeling?</option>

                        ${
                            allMoods.map(
                                (mood) => {
                                    return `<option value="${ mood.id }">${ mood.label }</option>`
                                }
                                ).join("")
                        }
                        </select>
                    </fieldset>
                
                    
                    <button type="submit" id="recordJournalButton">Record Journal Entry</button>
                    `
                })
}
        
const eventHub = document.querySelector(".container")


eventHub.addEventListener("click", event => {
    if (event.target.id === "recordJournalButton") {
        
        const newJournalEntry = {
            date: document.querySelector("#journalDate").value,
            concept: document.querySelector("#journalConcept").value,
            entry: document.querySelector("#journalEntry").value,
            moodId: parseInt(document.querySelector("#journalMood").value),
            instructorId: parseInt(document.querySelector("#whoTaught").value)
        }
        saveJournalEntry(newJournalEntry)
    }
})
