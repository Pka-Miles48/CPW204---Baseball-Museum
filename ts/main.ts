/**
 *  Represents an individual baseball item that can be purchased
 */
class BaseballItem {
    /**
     * The 5 digit inventory number
     */
    inventoryNumber: string;

    /**
     * The 5 digit global ID
     */
    globalID: string;

    /**
     * The name of the baseball archive
     */
    baseballArchive: string;

    /**
     * The retail price of the baseball item
     */
    price: number;

    /**
     * The title of the baseball item
     */
    title: string;
}

// BaseballItem object test code
let myBaseballItem = new BaseballItem();
myBaseballItem.inventoryNumber = "48L08";
myBaseballItem.globalID = "DW284";
myBaseballItem.baseballArchive = "Hall of Fame Collection";
myBaseballItem.price = 28.99;
myBaseballItem.title = "Historic Home Run Ball";

console.log(myBaseballItem);

window.onload = function() {
    // set up button click for add baseball item form
    let addBaseballItemBtn = document.querySelector("#add-baseball-item") as HTMLButtonElement;
    addBaseballItemBtn.onclick = processBaseballItem;
}

function processBaseballItem() {
    console.log("processBaseballItem was called");

    let userBaseballItem = getBaseballItem();
    if (userBaseballItem != null) {
        addBaseballItem(userBaseballItem);
    }
}

/**
 * This function will retrieve all the baseball item
 * data from the HTML page. If all data is valid
 * a baseball item object will be returned. If any data
 * is invalid, null will be returned and error messages
 * will be shown on the web page.
 */
function getBaseballItem(): BaseballItem {
    clearAllErrorMessages();

    // Get all inputs
    let inventoryNumberTextBox = document.querySelector("#inventory-number") as HTMLInputElement;
    let globalIDTextBox = document.querySelector("#global-id") as HTMLInputElement;
    let baseballArchiveTextBox = document.querySelector("#baseball-archive") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;

    // Validate data
    let isValidData: boolean = true;

    // Validate the Inventory Number
    let inventoryNumber = inventoryNumberTextBox.value;
    if (!isValidInventoryNumber(inventoryNumber)) {
        isValidData = false;
        inventoryNumberTextBox.nextElementSibling.textContent = "The inventory number must represent the last two digits of the year and then define a category or type of item";
    }

    // Validate the Global ID
    let globalID = globalIDTextBox.value;
    if (!isValidGlobalID(globalID)) {
        isValidData = false;
        globalIDTextBox.nextElementSibling.textContent = "You must enter a 5 digit global ID";
    }

    // Validate the Baseball Archive
    let baseballArchive = baseballArchiveTextBox.value;
    if (baseballArchive.trim() == "") {
        isValidData = false;
        baseballArchiveTextBox.nextElementSibling.textContent = "You must enter the name of the baseball archive";
    }

    // Validate the Price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number";
    }

    // Validate the Title
    let title = titleTextBox.value;
    if (title.trim() == "") {
        isValidData = false;
        titleTextBox.nextElementSibling.textContent = "You must provide a title";
    }

    if (isValidData) {
        let addedBaseballItem = new BaseballItem();
        addedBaseballItem.inventoryNumber = inventoryNumber;
        addedBaseballItem.globalID = globalID;
        addedBaseballItem.baseballArchive = baseballArchive;
        addedBaseballItem.price = price;
        addedBaseballItem.title = title;

        return addedBaseballItem;
    }
    return null; // Return null if any invalid data is present
}

/**
 * This validates an inventory number.
 * @param n The string to be validated
 * @returns True if n is a valid inventory number
 */
function isValidInventoryNumber(n: string): boolean {
    return /^[0-9]{5}$/.test(n);
}

/**
 * This validates a global ID.
 * @param id The string to be validated
 * @returns True if id is a valid global ID
 */
function isValidGlobalID(id: string): boolean {
    return /^[a-zA-Z0-9]{5}$/.test(id);
}

/**
 * Adds a BaseballItem object to web storage. Assumes
 * all data is valid
 * @param b The BaseballItem containing valid data to be added
 */
function addBaseballItem(b: BaseballItem): void {
    alert("Data was valid, baseball item added");
    console.log(b);
}

/**
 * Clears all the validation error message spans
 * in the form
 */
function clearAllErrorMessages() {
    // Get all error spans
    let allSpans = document.querySelectorAll("form span.error-msg");

    // Loop through, and set each span to an empty string
    for (let i = 0; i < allSpans.length; i++) {
        let currentSpan = allSpans[i];
        currentSpan.textContent = "";
    }
}
