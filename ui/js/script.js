function addData(link) {
    $.ajax({
        url: link,
        dataType: 'json',
        success: function(data){
            var mainContainer = document.getElementById("myData");
            for (var i = 0; i < data.length; i++) {
                var tr = document.createElement("tr");
                var name = document.createElement("td");
                var color = document.createElement("td");
                var age = document.createElement("td");
                var thadopt = document.createElement("th");
                var threname = document.createElement("th");
                var adopt = document.createElement("a");
                var rename = document.createElement("a");
                name.innerHTML = data[i].name;
                color.innerHTML = data[i].color;
                age.innerHTML = data[i].age;
                tr.appendChild(name);
                tr.appendChild(color);
                tr.appendChild(age);
                adopt.innerHTML = "Adopt";
                adopt.onclick = function remove() {
                    $.ajax({
                        url: link + i +'/',
                        type: "DELETE",
                        success: window.location.href = "read.html"
                    });
                };
                adopt.classList.add('btn');
                adopt.classList.add('btn-primary');
                adopt.classList.add('btn-light');
                rename.innerHTML = "Rename";
                rename.href = "update.html";
                rename.classList.add('btn');
                rename.classList.add('btn-primary');
                rename.classList.add('btn-light');
                thadopt.appendChild(adopt);
                tr.appendChild(thadopt);
                threname.appendChild(rename);
                tr.appendChild(threname);
                mainContainer.appendChild(tr);
            }
        }
    })
}