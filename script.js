const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '52b8937d4amsh63b91f77d697a21p195640jsn6462181742d7',
        'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
    }
};

var findd = "kolkata";
let find = document.getElementById("textbox");
let btn = document.getElementById("btn");

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
btn.addEventListener("click", (e) => {
    findd = find.value
    find.value="";
    weather()

})
textbox.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      btn.click();
    }
  });
var info_id, locations, info_loc, timezone, info_w, intemp, inwind, intime, inhumid, f, cloud, maxtemp, mintemp,sy;

async function weather() {

    let weather = await today0()
    weather = await today1()
    weather = await today()
    document.getElementById("description").innerHTML = intime + " "
    document.getElementById("zone").innerHTML = timezone + " "
    document.getElementById("cloud").innerHTML = cloud + " %"
    document.getElementById("maxt").innerHTML = maxtemp + " °C"
    document.getElementById("mint").innerHTML = mintemp + " °C"
    document.getElementById("city").innerHTML = findd
    document.getElementById("tempa").innerHTML = intemp + " °C"
    document.getElementById("winds").innerHTML = inwind + " m/s"
    document.getElementById("humid").innerHTML = inhumid + " "
    document.getElementById("sy").innerHTML =sy+" "
}

weather();

function today0() {
    return fetch(`https://foreca-weather.p.rapidapi.com/location/search/${findd}?lang=en`, options)
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            locations = response
            console.log(typeof (locations))
            console.log(locations.locations[0])
            info_loc = locations.locations[0];
            info_id = info_loc.id
            timezone = info_loc.timezone
        })
        .catch(err => {
            console.error(err)
            alert("Wrong city given")
            location.reload();
        });
}


function today() {
    return fetch(`https://foreca-weather.p.rapidapi.com/observation/latest/${info_id}?lang=en`, options)
        .then(response => response.json())
        .then(response => {
            info_w = response;
            intemp = info_w.observations[0].temperature;
            inwind = info_w.observations[0].windSpeed;
            // let instation = info_w.observations[0].station;
            intime = info_w.observations[0].time;
            inhumid = info_w.observations[0].relHumidity;

            
        })
        .catch(err => console.error(err));
}


function today1() {
    return fetch(`https://foreca-weather.p.rapidapi.com/forecast/daily/${info_id}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`, options)
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            f = response;
            cloud = f.forecast[0].cloudiness;
            maxtemp = f.forecast[0].maxTemp;
            mintemp = f.forecast[0].minTemp;
            sy=f.forecast[0].symbolPhrase;
        })
        .catch(err => console.error(err));
}
