class Painting {
}
let myPainting = new Painting();
myPainting.inventorynumbers = "48L08";
myPainting.globalIDs = "DW284";
myPainting.artworkarchive = "Schedule Feature";
myPainting.price = 28.99;
myPainting.title = "The Art of Programming for Novices";
console.log(myPainting);
window.onload = function () {
    let addPaintingBtn = document.querySelector("#add-painting");
    addPaintingBtn.onclick = processPainting;
};
function processPainting() {
    alert("processPainting was called");
}
