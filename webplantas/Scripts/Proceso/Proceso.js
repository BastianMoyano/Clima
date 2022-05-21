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


const Espanol = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};
window.addEventListener("load", function () {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../Clima/ObtenerhitorialProceso', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = JSON.parse(xhr.responseText);

            if (resultado.RESPUESTA) {

                var table = document.getElementById('historico');
                var tbody = table.getElementsByTagName('tbody')[0];
                for (var i = 0; i < resultado.Datos.length; i++) {
                    var cuerpo = '<tr>' +
                        //'<td>' + resultado.Datos[i].ID_EDAD + '</td>' +
                        '<td>' + resultado.Datos[i].nombreUsuario + '</td>' +
                        '<td>' + resultado.Datos[i].clima + '</td>' +
                        '<td>' + resultado.Datos[i].temperatura + '</td>' +
                        '<td>' + resultado.Datos[i].humedad + '</td>' +
                        '<td>' + moment(resultado.Datos[i].fechaProceso).format('DD/MM/YYYY HH:mm:ss') + '</td>' +
                        '<td>' + resultado.Datos[i].lugar + '</td>' +
                        '<td>' + resultado.Datos[i].tiempo_de_riego/*.value(Minutes) */ + '</td>' +
                        '<td>' + resultado.Datos[i].sector_de_riego + '</td>' +
                        '<td>' + resultado.Datos[i].calculo_de_agua + '</td>';
                       

                    cuerpo += '</td>' +
                        '</tr>';
                    tbody.innerHTML += cuerpo;
                }


                $("#historico").DataTable({
                    "paging": false,
                    "language": Espanol,
                    destroy: true,
                    scrollX: true,
                    "aaSorting": [],
                    fixedHeader: {
                        header: false,
                        footer: false
                    },
                    "lengthMenu": true,
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Excel'
                        }

                    ]
                });

            }

          
        }
    };
    xhr.send();



});