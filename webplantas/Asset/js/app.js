
var bouncejsShow = function (promise) {
    var n = this;
    new Bounce()
        .translate({
            from: { x: 450, y: 0 }, to: { x: 0, y: 0 },
            easing: 'bounce',
            duration: 1000,
            bounces: 4,
            stiffness: 3
        })
        .scale({
            from: { x: 1.2, y: 1 }, to: { x: 1, y: 1 },
            easing: 'bounce',
            duration: 1000,
            delay: 100,
            bounces: 4,
            stiffness: 1
        })
        .scale({
            from: { x: 1, y: 1.2 }, to: { x: 1, y: 1 },
            easing: 'bounce',
            duration: 1000,
            delay: 100,
            bounces: 6,
            stiffness: 1
        })
        .applyTo(n.barDom, {
            onComplete: function () {
                promise(function (resolve) {
                    resolve();
                });
            }
        });
};

var bouncejsClose = function (promise) {
    var n = this;
    new Bounce()
        .translate({
            from: { x: 0, y: 0 }, to: { x: 450, y: 0 },
            easing: 'bounce',
            duration: 500,
            bounces: 4,
            stiffness: 1
        })
        .applyTo(n.barDom, {
            onComplete: function () {
                promise(function (resolve) {
                    resolve();
                });
            }
        });
};
window.addEventListener('load', () => {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 

    let vientoVelocidad = document.getElementById('viento-velocidad') 
    let Humedad = document.getElementById('humedad-descripcion')


    let temperatura = document.getElementById('temperatura')
    let clima = document.getElementById('clima')
    let humedad = document.getElementById('humedad')
    let destino = document.getElementById('destino')



           //ubicación por ciudad
           const url = 'https://api.openweathermap.org/data/2.5/weather?q=Santiago&lang=es&units=metric&appid=038e0541b5cc6e24b3d6bdf06ba0e9ba'

           //console.log(url)

           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                //console.log(data)
                
                let temp = Math.round(data.main.temp)
                let humidity = Math.round(data.main.humidity)
                //console.log(temp)
                temperaturaValor.textContent = `${temp} ° C`
                temperatura.value = `${temp}`

                //console.log(data.weather[0].description)
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                clima.value = desc.toUpperCase()
                ubicacion.textContent = data.name
                destino.value = data.name
                
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                vientoVelocidad.value = `${data.wind.speed}`

                Humedad.textContent = `${humidity}%`
                humedad.value = `${humidity}`
                
                //para iconos estáticos
                //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`                     
                //icono.src = urlIcon
                //console.log(data.weather[0].icon)

                //para iconos dinámicos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='../Asset/animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                        iconoAnimado.src ='../Asset/animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                        iconoAnimado.src ='../Asset/animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                        iconoAnimado.src ='../Asset/animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src ='../Asset/animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                        iconoAnimado.src ='../Asset/animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src ='../Asset/animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='../Asset/animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

            })
            .catch( error => {
                console.log(error)
            })

    document.getElementById('Proceso').addEventListener('click', function (e) {
        e.preventDefault();
        var Errores = 0;
        if ($("#sector").val() === '') {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe Seleccionar el destino',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }
        if ($("#tiempoderiego").val() === '') {
            Errores += 1;
            new Noty({
                text: '<strong>Advertencia!</strong><br /> Debe ingresar una tiempo de riego',
                type: 'error',
                theme: 'sunset',
                layout: 'topRight',
                timeout: 4000,
                animation: {
                    open: bouncejsShow,
                    close: bouncejsClose
                }
            }).show();
        }


        if (Errores === 0) {
            let temperatura = $("#temperatura").val();
            let clima = $("#clima").val();
            let humedad = Number($("#humedad").val()) ;
            let destino = $("#destino").val();
            let Sector = $("#sector").val();
            let Tiempoderiego = $("#tiempoderiego").val();
           
            if (humedad <= 40) {

                new Noty({
                    text: '<strong>Advertencia!</strong><br />para realizar el proceso, la humedad tiene que ser mayor del 50%',
                    type: 'error',
                    theme: 'sunset',
                    layout: 'topRight',
                    timeout: 4000,
                    animation: {
                        open: bouncejsShow,
                        close: bouncejsClose
                    }
                }).show();

            } else {

                var proceso = new Object();
                proceso.clima = clima;
                proceso.temperatura = temperatura;
                proceso.humedad = humedad;
                proceso.lugar = destino;
                proceso.tiempo_de_riego = Tiempoderiego;
                proceso.sector_de_riego = Sector;
       

                var Enviar = JSON.stringify(proceso);

                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    type: 'POST',
                    url: '../Clima/GuardarProceso',
                    data: Enviar,
                    success: function (d) {
                        if (d.RESPUESTA) {

                            new Noty({
                                text: '<strong>Información</strong><br /> Guardado!.',
                                type: 'success',
                                theme: 'sunset',
                                layout: 'topRight',
                                timeout: 4000,
                                animation: {
                                    open: bouncejsShow,
                                    close: bouncejsClose
                                }
                            }).show();


                        } 
                    },
                    failure: function (response) {
                        alert("Fallo");
                    }
                });

            }




        }
    });
       })
          

