var letter_ans = "x";

function getIndx()
{
    var s = localStorage.getItem("indx");
    var r = 0;
    if (s)
        r = s;
    var t = parseInt(r) + 1;
    document.title = "Megacalc | " + t;
    return r;
}

function load(n = -1)
{
    if (n == -1)
    {
        n = getIndx();
    }
    else
    {
        localStorage.setItem("indx",n);
        getIndx();
    }
    var el = document.getElementById("calc");
    var s = localStorage.getItem("_page_" + n);
    if (s)
    el.value = s;
    else
    el.value = "x = 10*5";

    var x = localStorage.getItem("rst");
    if (x)
    {
        document.getElementById("rst").innerText = x;
        letter_ans = x;
    }
}

function set_result()
{
    var r = prompt("Letter to show result:","x");
    if (!r || r.length != 1)
    {
        alert("Invalid letter!");
    }
    else
    {
        var x = r;
        localStorage.setItem("rst",x);
        document.getElementById("rst").innerText = x;
        letter_ans = x;
    }
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

function smplf(str)
{
    while(str.includes(" "))
    str = str.replace(" ","");
    while(str.includes("\r"))
    str = str.replace("\r","");
    return str;
}

function calc(expr)
{
    expr = smplf(expr);
    return eval(expr);
}

var variables = {};

function calculate()
{
    variables = {};
    var el = document.getElementById("calc");
    var str = el.value;
    str = smplf(str);

    var lines = str.split("\n");

    var openedCmnt = false;
    lines.forEach(line => {
        if (line[0] == "#"){
        openedCmnt = !openedCmnt;
            return;
        }
        if (openedCmnt || !line)
        return;
        var div = line.split("=");
        var ltr = div[0];
        var clc = div[1];

        var ll = clc.length;
        var result_str = "";
        for (var i = 0; i < ll; i ++)
        {
            var c = clc[i];
            if (isLetter(c))
            {
                result_str += "variables[\"" + c + "\"]";
            }
            else if (c == "\u03C0")
            {
                result_str += 3.14159265359;
            }
            else
            result_str += c;
        }

        var res = calc(result_str);
        variables[ltr] = res;
    });

    alert(variables[letter_ans]);
    localStorage.setItem("_page_" + getIndx(),el.value);
}