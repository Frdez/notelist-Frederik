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

function buildList()
{
  var noteList = getLocal();
  var ulElm = document.querySelector("ul");

  ulElm.innerHTML = "";

  for(var i = 0; i < noteList.length; i++)
  {
    var liElm = document.createElement("li");
    var pElm = document.createElement("p");
    var delBtnElm = document.createElement("button");
    var editBtnElm = document.createElement("button");

    editBtnElm.innerHTML = "Edit";
<<<<<<< HEAD
    editBtnElm.setAttribute("data-index", 1);
=======
>>>>>>> 15e1dea6d397c6a734c46788e71e0f0faa06ff23

    pElm.innerHTML = noteList[i].text;

    delBtnElm.innerHTML = "Delete";
    delBtnElm.setAttribute("data-index", i);

    delBtnElm.addEventListener("click", submitDelEvent);

    liElm.appendChild(pElm);
    liElm.appendChild(delBtnElm);

    ulElm.appendChild(liElm);
  }
}

function submitDelEvent(event)
{
  var arrIndex = event.target.getAttribute("data-index");
  var notes = getLocal();

  notes.splice(arrIndex, 1);

  setLocal(notes);
  buildList();
}

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
