var modal = document.querySelector(".modal-bg");

function setLocal(localNotes)
{
  var jsonData = JSON.stringify(localNotes);

  localStorage.setItem("notes", jsonData);
}

function getLocal()
{
  var notes = localStorage.getItem("notes");

  if(notes == null){
    return [];
  }
  else {
    return JSON.parse(notes);
  }
}

function submitNote(text, time, important)
{
  var origNotes = getLocal();

  var newNote = {
    text:     text,
    dueDate:  time,
    important: important
  };

  origNotes.push(newNote);

  setLocal(origNotes);
}


//Bygger selve listen (formatet)
function buildList()
{
  var noteList = getLocal();
  var ulElm = document.querySelector("ul");

  ulElm.innerHTML = "";

  for(var i = 0; i < noteList.length; i++)
  {
    var now = new Date(noteList[i].dueDate);
    var outDate = now.getDate() + '/' + (now.getMonth() + 1) + "-" + now.getFullYear();
    var outTime = now.getHours() + ':' + now.getMinutes();

    var liElm = document.createElement("li");
    var pElm = document.createElement("p");
    var delBtnElm = document.createElement("button");
    var editBtnElm = document.createElement("button");

    editBtnElm.innerHTML = "Edit";
    editBtnElm.setAttribute("data-index", i);
    editBtnElm.addEventListener("click", submitEditEvent);
    editBtnElm.setAttribute("data-index", i);

    pElm.innerHTML = noteList[i].text + " | " + outDate + " " + outTime;

    delBtnElm.innerHTML = "Delete";
    delBtnElm.setAttribute("data-index", i);

    delBtnElm.addEventListener("click", submitDelEvent);

    liElm.appendChild(pElm);
    liElm.appendChild(delBtnElm);
    liElm.appendChild(editBtnElm);

    ulElm.appendChild(liElm);
  }
}

//editer
function submitEditEvent(event)
{
  var notes = getLocal();
  var arrIndex = event.target.getAttribute("data-index");

  notes[arrIndex].text = prompt("Write your new note here:");

  setLocal(notes);
  buildList();

}

//deleter
function submitDelEvent(event)
{
  var arrIndex = event.target.getAttribute("data-index");
  var notes = getLocal();

  notes.splice(arrIndex, 1);

  setLocal(notes);
  buildList();
}

//aktiverer at den laver listen på ny.
//ny artikel, så laver den listen forfra
function submitNoteEvent(event)
{
  console.log("hej");

  var noteText = document.querySelector("#noteText")
  var noteTime = document.querySelector("#noteTime")
  var noteImportant = document.querySelector("#noteImportant")

  submitNote(noteText.value, noteTime.value, noteImportant.checked);
  buildList();
  modal.style.display = "none";

}

//bliver først kørt, når den er færdig med at indlæse HTML, som så kalder buildlist()
window.onload = function()
{
  buildList();
}

var showModalBtn = document.querySelector("#showModal");

showModalBtn.addEventListener("click", function(event)
{
  modal.style.display = "block";
});

var submitNoteBtn = document.querySelector("#addNote")

submitNoteBtn.addEventListener("click", submitNoteEvent)
