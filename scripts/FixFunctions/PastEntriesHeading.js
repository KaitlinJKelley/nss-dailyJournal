export const pastEntriesHeading = () => {
    let container = document.querySelector(".pastEntries")
                
    let header = document.createElement('h2');
    header.classList.add("pastHeader")
    header.innerHTML = 'Past Entries';
    container.prepend(header);
}