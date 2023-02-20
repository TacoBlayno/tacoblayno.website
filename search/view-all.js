class DisplayTags {
    constructor(xmlDoc) {
        this._xmlDoc = xmlDoc;
        this._pagesValues = function(xmlDoc) {
            console.log("this._pagesValues = function(xmlDoc) {");
            let map = new Map();
            if (xmlDoc.childNodes.length > 1) {
                console.log("if (xmlDoc.childNodes.length > 1) {");
                let array = [];
                for (const element of xmlDoc.childNodes) {
                    if (element.nodeType == 1) {
                        console.log("if (element.nodeType == 1) {");
                        console.log(element);
                        array.push(this._pagesValues(element));
                    }
                }
                console.log(xmlDoc);
                console.log(array);
                map.set(xmlDoc, array);
            } else {
                console.log("} else {");
                if (xmlDoc.firstChild.nodeType == 3) {
                    console.log("if (xmlDoc.firstChild.nodeType == 3) {");
                    console.log(xmlDoc);
                    console.log(xmlDoc.firstChild);
                    map.set(xmlDoc, xmlDoc.firstChild);
                } else if (xmlDoc.firstChild.nodeType == 1) {
                    console.log("} else if (xmlDoc.firstChild.nodeType == 1) {");
                    map.set(xmlDoc, [this._pagesValues(xmlDoc.firstChild)]);
                }
            }
            return map;
        }
        this._pages = this._pagesValues(this._xmlDoc.documentElement);
        console.log(this._pages);
    }

    get pages() {
        return this._pages;
    }
    set pages(xmlDoc) {
        this._pages = this._pagesValues(xmlDoc);
    }
}

let viewAllEl = document.getElementById("view-all");
let viewAllElDiv = document.getElementById("view-all-div");

function mapFolder(map) {
    console.log("function mapFolder(map) {")
    console.log(map);
    if (map.entries) {
        console.log("if (map.entries) {")
        for (const [key, value] of map.entries()) {
            let ulEl = document.createElement("ul");
            let liEl = document.createElement("li");
            liEl.appendChild(document.createTextNode(key));
            liEl.addEventListener("mouseup", function() {
                if (liEl.style.borderLeft == "none") {
                    console.log("if (liEl.style.borderLeft != \"none\") {");
                    liEl.style.borderLeft = "3px solid #f0f";
                    if (Array.isArray(value)) {
                        console.log("if (Array.isArray(value)) {");
                        liEl.appendChild(mapFolder(key));
                    } else if (typeof value == "string") {
                        console.log("} else if (typeof value == \"string\") {");
                        liEl.appendChild(value);
                    }
                } else {
                    console.log("} else {");
                    liEl.style.borderLeft = "none";
                    for (let i = 1; i < liEl.children; i++) {
                        liEl.removeChild(liEl.children[i]);
                    }
                }
            });

        ulEl.appendChild(liEl);
        return ulEl;
        }
    }
}

function viewAll() {
    let displayTags;
    let xmlRequest = new XMLHttpRequest();
    console.log(xmlRequest);
    xmlRequest.addEventListener("load", function (values) {
        if (this.readyState == 4 && this.status == 200) {
            displayTags = new DisplayTags(xmlRequest.responseXML);
            viewAllElDiv.appendChild(mapFolder(displayTags.pages));
        }
    });
  
    xmlRequest.open("GET", "https://tacoblayno.github.io/search/information");
    xmlRequest.send();
}
