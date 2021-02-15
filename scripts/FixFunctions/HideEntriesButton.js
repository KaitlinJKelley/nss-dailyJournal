export const hideButton = () => {
    let container = document.querySelector(".pastHeader")
            
    let hideButton = document.createElement('button');
    hideButton.classList.add("hideEntriesButton")
    hideButton.innerHTML = 'Hide Past Entries';
    container.after(hideButton);
}