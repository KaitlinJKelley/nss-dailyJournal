let instructors = []

export const getInstructors = () => {
    return fetch("http://localhost:8088/instructors") // Fetch from the API
    .then(response => response.json())  // Parse as JSON
    .then(parsedInstructors => {
        // What should happen when we finally have the array?
        instructors = parsedInstructors
    })
}

export const useInstructors = () => {
    instructors.slice()
    console.log(instructors)
}