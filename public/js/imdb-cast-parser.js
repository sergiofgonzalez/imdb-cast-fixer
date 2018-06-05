(function() {
"use strict";

/*
  Initialization code
*/

var btn = document.querySelector("#btnFix");
var input = document.querySelector("#textareaInput");
var output = document.querySelector("#textareaOutput");

input.addEventListener("input", function() {
  btn.disabled = input.value.length === 0;
});

btn.addEventListener("click", function(event) {
  event.preventDefault();
  try {
    output.value = getCastAsFormattedString(input.value);
  } catch (e) {
    output.value = "";
    alert(e);
  }

  btn.disabled = true;
});

/*
  IMDb Cast Parser Service
*/

var currentEntry;

function getCast(textCutFromImdb) {
    function extractCastEntryLines(text) {
        var castLines = text.split(/\n/);
        return castLines;
    }

    function parseEntry(castEntry) {
        currentEntry = castEntry;
        var patternFirstEntry = /^([^]+(\s+[^]+)*)\s+\.{3}\s+(.+)$/;
        var match = patternFirstEntry.exec(castEntry);
        return {
            actor: match[1],
            character: match[3]
        };
    }

    function fixNonFirstEntry(castElem) {
        console.log("Fixing:", castElem);
        return {
            actor: castElem.actor.slice(0, castElem.actor.length / 2).trim(),
            character: castElem.character
        };
    }

    var castEntries = extractCastEntryLines(textCutFromImdb.trim());
    var cast = [];
    castEntries.forEach(function(castEntry, index) {
        console.log("parsing element #" + index);
        var castElem = parseEntry(castEntry);
        if (index === 0) {
            cast.push(castElem);
        } else {
            cast.push(fixNonFirstEntry(castElem));
        }
    });
    return cast;
}

function getCastAsFormattedString(textCutFromImdb) {
  var result;
  try {
    result = getCast(textCutFromImdb)
                .reduce(function(accumulator, castEntry) {
                    return accumulator + castEntry.actor + "..." + castEntry.character + "\n";
                  }, "");
  } catch(e) {
    throw new Error("Error while parsing entry: " + currentEntry + "; error=" + e.message);
  }
  result = result.slice(0, result.length - 1);

  return result;
}

})();
