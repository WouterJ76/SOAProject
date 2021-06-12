function addData(link, elements) {
    var mainContainer = document.getElementsByTagName("table")[0];

    var tr = document.createElement("tr");
    elements.forEach(elem => {
        var h = document.createElement("th");
        h.innerHTML = elem.charAt(0).toUpperCase() + elem.slice(1);
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
                        // url: 'http://localhost:7000/dolphins/'+ i +'/',
                        // url: 'https://localhost:8243/dolphins/1/dolphins/'+ i +'/',
                        url: link + this.id +'/',
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'text',
                        /* beforeSend: function(xhr) {
                            xhr.setRequestHeader("apikey", "eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkE9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBjYXJib24uc3VwZXIiLCJhcHBsaWNhdGlvbiI6eyJvd25lciI6ImFkbWluIiwidGllclF1b3RhVHlwZSI6bnVsbCwidGllciI6IlVubGltaXRlZCIsIm5hbWUiOiJEZWZhdWx0QXBwbGljYXRpb24iLCJpZCI6MSwidXVpZCI6ImUxNjI2OTljLWUxYzMtNGQyMy05OGUxLTE0YmIxYjViMzhlNCJ9LCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJCcm9uemUiOnsidGllclF1b3RhVHlwZSI6InJlcXVlc3RDb3VudCIsImdyYXBoUUxNYXhDb21wbGV4aXR5IjowLCJncmFwaFFMTWF4RGVwdGgiOjAsInN0b3BPblF1b3RhUmVhY2giOnRydWUsInNwaWtlQXJyZXN0TGltaXQiOjAsInNwaWtlQXJyZXN0VW5pdCI6bnVsbH19LCJrZXl0eXBlIjoiU0FOREJPWCIsInBlcm1pdHRlZFJlZmVyZXIiOiIiLCJzdWJzY3JpYmVkQVBJcyI6W3sic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJEb2xwaGlucyIsImNvbnRleHQiOiJcL2RvbHBoaW5zXC8xIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMSIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiQ2F0cyIsImNvbnRleHQiOiJcL2NhdHNcLzEuMCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjEuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiRG9ncyIsImNvbnRleHQiOiJcL2RvZ3NcLzEuMCIsInB1Ymxpc2hlciI6ImFkbWluIiwidmVyc2lvbiI6IjEuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiRG9scGhpbnMiLCJjb250ZXh0IjoiXC9kb2xwaGluc1wvMS4xIiwicHVibGlzaGVyIjoiYWRtaW4iLCJ2ZXJzaW9uIjoiMS4xIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9XSwicGVybWl0dGVkSVAiOiIiLCJpYXQiOjE2MjMzNDcwNzYsImp0aSI6ImNhMzRhNDRmLWFhNGYtNDc5NC1iNzZjLTQ4MGU4ODk5YmE3NyJ9.qXPa1D_vRAlEKeCqgsmCAgqY7hblk4XKJU9eofFfmlIkmKhkqFwvzJu5kOC28WulSbLvcruiG_D1M_gpZQZhTXfOQ2cENklvKHimEOBGYZ9X6qpj7d91_Gme_1p01ir7ufJX-EZjUNh_geRAWRcGFBm6HqTAB6o7MNU0V5LW2AVYmwlDD6T55yCbvE2IEq8lo7w95LB-eNMSyFWQD5IQHGTXfjDT3fCMZxR49bYPhxOyZj2TGdcPefrCTJQy9Jp0Yzohk8dZ-vJTe3s0qvy4q1lYOb18zjBQDhSHGuZpp0V8wb_WrCYgxPJS4iIPwZ-x4Wtt0az4T-9wzeUvHVHZHA==")
                        }, */
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