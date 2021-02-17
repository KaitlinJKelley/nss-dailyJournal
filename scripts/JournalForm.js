import { getInstructors, useInstructors } from "./Instructors/InstructorProvider.js"
import { getEntries, saveJournalEntry, updateEntry, useJournalEntries } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "./Moods/MoodProvider.js"
import { saveEntryTag } from "./Tags/EntryTagProvider.js"
import { findTag, saveTag, getTags, useTags } from "./Tags/TagProvider.js"



let contentTarget = document.querySelector(".form")


export const JournalFormComponent = () => {
    getMoods()
        .then(() => getInstructors())
            .then(() => {
                
                const allMoods = useMoods()
                const allInstructors = useInstructors()
                
                
                contentTarget.innerHTML += `
                <input type="hidden" name="entryId" id="entryId" value="">
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

                    <fieldset>
                        <label for="journalTags">Add Tags:</label>
                        <input  type="text" name="journalTags" id="tag">
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
        
                let tags = document.querySelector("#tag").value
                if (tags !== "") {
                    let tagsArray = tags.split(",")
                    
                    tagsArray.map(tagString => {
                        
                        const tag = {
                            subject: tagString
                        }
                        
                        findTag(tag.subject)  // tag variable will have a string value
                        
                        .then(matches => {  // `matches` variable value will be array of matching objects
                        let matchingTag = null
                        
                        if (matches.length > 0) {
                            matchingTag = matches[0].id
                        }
                        
                        if (matchingTag === null) {
                            // Tag doesn't exist. Create it then assign it to entry.
                            saveTag(tag)
                            
                            .then(new_tag => {
                                getEntries()
                                .then(() => {
                                    let entries = useJournalEntries()
                                    let entry = entries[0]
                                    
                                    saveEntryTag(entry.id, new_tag.id)
                                })
                                 // promise.all?
                            })
                        }
                        else {
                            // Tag does exist. Assign it to entry.
                            
                            getEntries()
                            .then(getTags)
                            .then(() => {
                                let entries = useJournalEntries()
                                let entry = entries[0]
                                
                                let tags = useTags()
                                const foundTag = tags.find(tagItem => tagItem.subject === tag.subject)
                                
                                saveEntryTag(entry.id, foundTag.id)
                                // promise.all?
                            })
                        }
                    })})
                }
                const id = document.querySelector("#entryId")
                
                if (id.value === "") {
                    // No id value, so POST new entry with `saveEntry()`
                    // from data provider
                    saveJournalEntry(newJournalEntry)
                } else {
                    // id value is there, so PUT entry with `updateEntry()`
                    // from data provider
                    
                    newJournalEntry.id = editedId
                    updateEntry(newJournalEntry)
                    id.value = ""
                }
    }   
})

let editedId
eventHub.addEventListener("journalEdited", event => {
    editedId = event.detail.editedId
})