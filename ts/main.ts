/**
 *  Represents an individual painting that can be purchased
 */
class Painting {
    /**
     * The 5 digit inventory number
     */
    inventorynumbers : string;

    /**
     * The 5 digit global ID
     */
    globalIDs : string;

    /**
     * The name of the artwork archive
     */
    artworkarchive : string;

    /**
     * The retail price of the painting
     */
    price : number;

    /**
     * The title of the painting
     */
    title : string;
}

// Painting object test code
let myPainting = new Painting();
myPainting.inventorynumbers = "48L08";
myPainting.globalIDs = "DW284";
myPainting.artworkarchive = "Schedule Feature"
myPainting.price = 28.99;
myPainting.title = "The Art of Programming for Novices"

console.log(myPainting);


window.onload = function() {
    // set up button click for add painting form
    let addPaintingBtn = document.querySelector("#add-painting") as HTMLButtonElement;
    addPaintingBtn.onclick = processPainting;
}

function processPainting() {
    console.log("processPainting was called")

    let userPainting = getPainting();
    if (userPainting !=null) {
        addPainting(userPainting);
    }
}

/**
 * This function will retrieve all the painting
 * data from the HTML page. If all data is valid
 * a painting project will be returned. If any data
 * is invalid, null will be returned and error messages
 * will be shown on the web page.
 */
function getPainting():Painting {
    clearAllErrorMessages();

    // Get all inputs
    let inventorynumbersTextBox = document.querySelector("#inventory-numbers") as HTMLInputElement;
    let globalIDsTextBox = document.querySelector("#global-ids") as HTMLInputElement;
    let artworkarchiveTextBox = document.querySelector("artwork-archive") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    // Validate the Inventory Numbers
    let inventorynumbers = inventorynumbersTextBox.value;
    if (isValidInventoryNumbers(inventorynumbers)) {
        isValidData = false;
        inventorynumbersTextBox.nextElementSibling.textContent = "The inventory number must represent the last two digits of the year and then define a category or type of work";
    }

    // Validate the Global IDs
    function isValidGlobalId(id: string): boolean {
        // A simple regex for validation
        const regex = /^[a-zA-Z0-9-_]+$/;
        return regex.test(id);
    }
    
    // Usage
    const id: string = "yourGlobalId";
    if(isValidGlobalId(id)) {
        console.log("Valid Global ID");
        isValidData = false;
        globalIDsTextBox.nextElementSibling.textContent = "You must enter a 5 digit global ID";
    } else {
        console.log("Invalid Global ID");
    }
    
    
    // Validate the Artwork Archive
    // Define the structure of an artwork item
    interface Artwork {
        id: string;
        title: string;
        artist: string;
        year: number;
    }

    // Define the structure of an artwork archive
    interface ArtworkArchive {
        artworks: Artwork[];
    }

    // Function to validate an artwork item
    function isValidArtwork(item: any): item is Artwork {
        return typeof item.id === 'string' &&
            typeof item.title === 'string' &&
            typeof item.artist === 'string' &&
            typeof item.year === 'number';
    }

    // Function to validate an artwork archive
    function isValidArtworkArchive(archive: any): archive is ArtworkArchive {
        if (!Array.isArray(archive.artworks)) {
            return false;
        }
        for (const item of archive.artworks) {
            if (!isValidArtwork(item)) {
                return false;
            }
        }
        return true;
    }

    // Usage
    const archive: any = {
        artworks: [
            {
                id: "1",
                title: "Artwork 1",
                artist: "Artist 1",
                year: 2020
            },
            {
                id: "2",
                title: "Artwork 2",
                artist: "Artist 2",
                year: 2021
            }
        ]
    };
    ;
    if (isValidArtworkArchive(archive)) {
        console.log("Valid Artwork Archive");
        isValidData = false;
        artworkarchiveTextBox.nextElementSibling.textContent = "You must enter the name of the artwork archive";
    } else {
        console.log("Invalid Artwork Archive");
    }

    // Validate the Price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number";
    }

    // Validate the Title
    let title:string = titleTextBox.value;
    if (title.trim() == "") {
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        titleErrorSpan.textContent = "You must provide a title";
    }

    if (isValidData) {
        let addedPainting = new Painting();
        addedPainting.inventorynumbers = inventorynumbers;
        addedPainting.globalIDs = (id);
        addedPainting.artworkarchive = (archive);
        addedPainting.price = price;
        addedPainting.title = title;

        return addedPainting;
    }
    return null; // Return null if any invalid data is present
}

/**
 * This validates an inventory number..
 * @param n The string to be validated
 * @returns True if n is a valid inventory number
 */
function isValidInventoryNumbers(n) {
    return typeof n === 'number' && !isNaN(n) && isFinite(n);
}

/**
 * Adds a Painting object to web storage. Assumes
 * all data is valid
 * @param b The Painting containing valid data to be added
 */
function addPainting(b:Painting):void{
    alert("Data was valid, painting added")
    console.log(b);
}

/**
 * Clears all the validation eror message spans
 * in the form
 */
function clearAllErrorMessages() {
    // Get all error spans
    let allSpans = document.querySelectorAll("form span.error-msg");

    // Loop through, and set each span to an empty string
    for(let i = 0; i < allSpans.length; i++){
        let currentSpan = allSpans[i];
        currentSpan.textContent = "";
    }
}