// Gets all tags from API
let allTags = []
export const getTags = () => {
    return fetch(`http://localhost:8088/tags`)
        .then(response => response.json())
        .then(parsedTags => allTags = parsedTags)
}

export const useTags = () => allTags.slice()



// Only gets the tag object where the subject value matchs the string passed to the function
let matchingTags = []
export const findTag = (subject) => {
    return fetch(`http://localhost:8088/tags?subject=${subject}`)
        .then(response => response.json())
        .then(matched => matchingTags = matched)
}


// Posts new tags to API and then gets updated list of tags
export const saveTag = (tagObj) => {
    return fetch("http://localhost:8088/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tagObj)
    })
    .then(() => {
        let tagArray = findTag(tagObj.subject)
        return tagArray
    })
    .then(array => {
        return array[0]
    })
}



