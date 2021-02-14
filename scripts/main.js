import { JournalFormComponent } from "./JournalForm.js"
import "./JournalForm.js"
import "./ShowEntries/ShowEntriesButton.js"
import { ShowEntriesButton } from "./ShowEntries/ShowEntriesButton.js"
import { getMoods, useMoods } from "./Moods/MoodProvider.js"
import { getInstructors, useInstructors } from "./Instructors/InstructorProvider.js"
import "./ShowEntries/JournalentryList.js"

JournalFormComponent()
ShowEntriesButton()



// getInstructors()
//     .then(() => {useInstructors()})