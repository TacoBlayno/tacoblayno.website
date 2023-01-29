var searchEl = document.getElementById("search");
var searchElDiv = document.getElementById("search-div");

searchEl.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    search(searchEl.value);
  };
});

function search(value) {
  values = value.split(" ");
  delete value;
  
  searchElDiv.innerHTML = "";
  let webPages = {
    "Minecraft" : {
      "Home" : {
        "src" : "https://tacoblayno.github.io/minecraft/home",
        "description" : "",
      },
      "Parkour Generator" : {},
      "Shape Comands" : {},
    },
    "History" : {
      
    },
    //"" : {},
  };
  
  function searchKeys(value, object) {
    if (object[values[0]]) {
      if (typeof(object[values[0]) === "object") {
        let newValue;
        for (index = 1; index < values.length; index++) {
          newValue.push(values[index]);
        }
        if (searchKeys(newValue, values[0]) === false) {
          document.write();
          object["src"]
          return true;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
  
  searchKeys(values, webPages)
}
