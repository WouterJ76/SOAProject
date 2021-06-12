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
    var mainContainer = document.getElementsByTagName("table")[0];

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
    mainContainer.append(head)

    var body = document.createElement("tbody");
    $.ajax({
        url: link,
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                tr = document.createElement("tr");

                elements.forEach(elem => {
                    var e = document.createElement("td");
                    e.innerHTML = data[i][elem];
                    tr.appendChild(e); 
                });

                var adopt = document.createElement("a");
                adopt.innerHTML = "Adopt";
                adopt.id = data[i].id;
                adopt.onclick = function remove() {
                    $.ajax({
                        url: link + this.id +'/',
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'text',
                        success: function r() { location.reload() }
                    });
                }
                adopt.classList.add('btn');
                adopt.classList.add('btn-primary');
                adopt.classList.add('btn-light');
                var thadopt = document.createElement("th");
                thadopt.appendChild(adopt);

                var rename = document.createElement("a");
                rename.innerHTML = "Rename";
                rename.href = "update.html";
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
    mainContainer.append(body)
}

function create(link, elements) {
    var mainContainer = document.getElementsByTagName("form")[0];
    mainContainer.action = link;
    mainContainer.method = "POST";
    elements.forEach(elem => {
        var label = document.createElement("label");
        label.classList.add("form-label");
        label.htmlFor = elem;
        label.innerHTML = capitalize(elem);

        var input = document.createElement("input");
        input.classList.add("form-text");
        input.name = elem;
        input.id = elem;
        input.type = "text";

        var p = document.createElement("p");
        p.append(label);
        p.append(input);
        mainContainer.append(p);
    });

    var input = document.createElement("input");
    input.classList.add("btn-secondary");
    input.value = "I'll miss you...";
    input.id = "submit";
    input.type = "submit";
    input.onclick = function giveUp() {
        $.ajax({
            type: "POST",
            url: link,
            data: JSON.stringify(mainContainer.serializeArray()),
            dataType: "json",
            contentType : "application/json",
            success: window.location.href = "read.html"
          });
    };

    var p = document.createElement("p");
    p.append(input);
    mainContainer.append(p);
}