let cat_link = 'http://localhost:8000/cats/';
let cat_param = ["name", "characteristics"];
var read_cats = () => read(cat_link, cat_param);
var create_cat = () => create(cat_link, cat_param);

let dog_link = 'http://localhost:8080/dogs/';
let dog_param = ["name", "breed"];
var read_dogs = () => read(dog_link, dog_param);
var create_dog = () => create(dog_link, dog_param);

let dolphin_link = 'http://localhost:8001/dolphins/';
let dolphin_param = ["name", "color", "age"];
var read_dolphins = () => read(dolphin_link, dolphin_param);
var create_dolphin = () => create(dolphin_link, dolphin_param);

var capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

function read(link, elements) {
    var table = document.createElement("table")
    table.classList.add('table');
    table.classList.add('table-primary');
    
    var tr = document.createElement("tr");
    elements.forEach(elem => {
        var h = document.createElement("th");
        h.innerHTML = capitalize(elem);
        tr.append(h);
    });
    var h = document.createElement("th");
    tr.append(h);
    h = document.createElement("th");
    tr.append(h);

    var head = document.createElement("thead");
    head.append(tr)
    table.append(head)

    var body = document.createElement("tbody");
    $.ajax({
        url: link,
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                tr = document.createElement("tr");
                tr.id = data[i].id;

                elements.forEach(elem => {
                    var e = document.createElement("td");
                    e.innerHTML = data[i][elem];
                    tr.appendChild(e); 
                });

                var adopt = document.createElement("a");
                adopt.innerHTML = "Adopt";
                adopt.onclick = function remove(event) {
                    $.ajax({
                        url: link + this.parentNode.parentNode.id +'/',
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'text',
                        success: function r() { location.reload() }
                    });

                    event.preventDefault();
                }
                adopt.classList.add('btn');
                adopt.classList.add('btn-primary');
                adopt.classList.add('btn-light');
                var thadopt = document.createElement("th");
                thadopt.appendChild(adopt);

                var rename = document.createElement("a");
                rename.innerHTML = "Rename";
                rename.onclick = function() {
                    update(link, elements, this.parentNode.parentNode.id);
                }
                rename.classList.add('btn');
                rename.classList.add('btn-primary');
                rename.classList.add('btn-light');
                var threname = document.createElement("th");
                threname.appendChild(rename);
                tr.appendChild(threname);

                tr.appendChild(thadopt);
                body.appendChild(tr);
            }
        }
    }
    )
    table.append(body);
    var div = document.getElementById("data");
    div.append(table);
}

function part_form(link, elements) {
    var form = document.createElement("form");
    form.method = "POST";
    elements.forEach(elem => {
        var label = document.createElement("label");
        label.classList.add("form-control-label");
        label.htmlFor = elem;
        label.innerHTML = capitalize(elem);

        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("form-text");
        input.classList.add("form-control");
        input.name = elem;
        input.id = elem;

        var div = document.createElement("div");
        div.append(label);
        div.append(input);
        div.classList.add("form-group");
        form.append(div);
    });
    return form;
}

function create(link, elements) {
    var form = part_form(link, elements);
    var input = document.createElement("input");
    input.classList.add("btn-secondary");
    input.value = "I'll miss you...";
    input.id = "submit";
    input.type = "submit";
    input.onclick = function renaming(event) {
        var values = {};
        elements.forEach(elem => {
            values[elem] = document.getElementById(elem).value;
        });
        $.ajax({
            type: "POST",
            url: link,
            data: JSON.stringify(values),
            dataType: "json",
            contentType : "application/json; charset=utf-8",
            success: function (){
                window.location.href = "read.html"
            }
          });

          event.preventDefault();
    };

    var p = document.createElement("p");
    p.append(input);
    form.append(p);

    var div = document.getElementById("data");
    div.append(form);
}

function update(link, elements, i) {
    var h = document.getElementsByTagName("h2")[0];
    h.firstElementChild.innerHTML = "A fresh start";
    h.lastElementChild.innerHTML = "A new name";

    var form = part_form(link + i +'/', elements);
    form.id = i;
    var input = document.createElement("input");
    input.classList.add("btn-secondary");
    input.value = "Rename";
    input.id = "submit";
    input.type = "submit";
    input.onclick = function renaming(event) {
        var values = {};
        elements.forEach(elem => {
            values[elem] = document.getElementById(elem).value;
        });
        $.ajax({
            type: "PUT",
            url: link + this.parentNode.parentNode.id +'/',
            data: JSON.stringify(values),
            dataType: "json",
            contentType : "application/json; charset=utf-8",
            success: function() {
                window.location.href = "read.html"
            }
          });

          event.preventDefault();
    };

    var p = document.createElement("p");
    p.append(input);
    form.append(p);

    var div = document.getElementById("data");
    div.replaceChild(form, div.firstElementChild);
}