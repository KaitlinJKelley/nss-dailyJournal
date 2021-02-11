import { JournalFormComponent } from "./JournalForm.js"
import "./JournalForm.js"
import "./ShowEntries/ShowEntriesButton.js"
import "./ShowEntries/JournalentryList.js"
import { ShowNotesButton } from "./ShowEntries/ShowEntriesButton.js"
import { getMoods, useMoods } from "./Moods/MoodProvider.js"
import { getInstructors, useInstructors } from "./Instructors/InstructorProvider.js"

JournalFormComponent()
ShowNotesButton()

getInstructors()
    .then(() => {useInstructors()})