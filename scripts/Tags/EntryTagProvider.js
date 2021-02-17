let allEntryTags = []
export const getEntryTags = () => {
    return fetch(`http://localhost:8088/entrytags`)
        .then(response => response.json())
        .then(parsedEntryTags => allEntryTags = parsedEntryTags)
}


export const useEntryTags = () => allEntryTags.slice()


export const saveEntryTag = (entry, tag) => {
    const newEntryTag = {
        entryId: entry,
        tagId: tag
    }
    fetch("http://localhost:8088/entrytags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEntryTag)
    })
    
}