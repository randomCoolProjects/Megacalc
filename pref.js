var opened = false;

function insertAtCursor(myField, myValue) {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    
    else if (myField.selectionStart || myField.selectionStart == '0') {
        
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
    myField.focus;
    myField.selectionEnd = endPos + startPos;
}

function open_pref()
{
    var menu = document.getElementById("menu");
    opened = !opened;

    if (opened)
    menu.style = "width: 200px;";
    else
    menu.style = "width: 50px;";
}

function add(txt)
{
    insertAtCursor(document.getElementById("calc"),txt);
}

function cls()
{
    if (confirm("Clear this page? This action can't be undone!"))
    document.getElementById("calc").value = "";
}