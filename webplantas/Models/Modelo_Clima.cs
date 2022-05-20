using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using webplantas.Controllers;

namespace webplantas.Models
{
    public class Modelo_Clima
    {
        public static object GuardarClima(proceso proceso)
        {
            try
            {
                using (ClimaEntities db = new ClimaEntities())
                {
             

                    

                    int id = Convert.ToInt32(HttpContext.Current.Session["idUsuario"]);
                    string user =Convert.ToString( HttpContext.Current.Session["userName"]);
                    string name =Convert.ToString( HttpContext.Current.Session["nombreUsuario"]);

                    int calculo = proceso.tiempo_de_riego.Value.Minutes;
                    int calculo1 = (calculo * 20);
                        
                        proceso proceso_definitivo = new proceso
                        {
                            idUsuario = id,
                            clima = proceso.clima,
                            temperatura = proceso.temperatura,
                            humedad = proceso.humedad,
                            fechaProceso = DateTime.Now,
                            lugar = proceso.lugar,
                            tiempo_de_riego = proceso.tiempo_de_riego,
                            sector_de_riego = proceso.sector_de_riego,
                            calculo_de_agua = calculo1


                        };
                        db.proceso.Add(proceso_definitivo);
                        db.SaveChanges();


                    Datos_Recomedacion _Recomedacion = new Datos_Recomedacion();
                    _Recomedacion.NOMBRE_USUARIO = name;
                    _Recomedacion.TIENPO_RIEGO = proceso.tiempo_de_riego;
                    _Recomedacion.LUGAR = proceso.lugar;
                    _Recomedacion.SECTOR = proceso.sector_de_riego;
                    _Recomedacion.FECHA = DateTime.Now;



                    bool Respuesta_Correo = EnvioCorreos.SendEmailRecuperarContrasena(user, _Recomedacion);

                    return new { RESPUESTA = true };
                    
                  

                }

            }
            catch (Exception e)
            {
                return new { RESPUESTA = false, TIPO = 1, e.Message };
            }

        }
    }
}