using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using webplantas.Controllers;

namespace webplantas.Models
{
    public class Modelo_Login
    {
        public static object Autentificar(string _username, string _contrasena)
        {

            try
            {
                bool Respuesta;
                int Tipo;
                using (ClimaEntities db = new ClimaEntities())
                {
                    usuario Usuario = db.usuario.Where(a => a.userName == _username).FirstOrDefault();
                    if (Usuario != null)
                    {

                                if (Usuario.password == _contrasena)
                                {
                                  
                                    HttpContext.Current.Session["userName"] = Usuario.userName;
                                    HttpContext.Current.Session["nombreUsuario"] = Usuario.nombreUsuario;
                                    HttpContext.Current.Session["idUsuario"] = Usuario.idUsuario;
                                    Respuesta = true;
                                    Tipo = 1;

                                }
                                else
                                {
                                    Respuesta = false;
                                    Tipo = 2;
                                }



                    }
                    else
                    {
                        Respuesta = false;
                        Tipo = 2;
                    }
                    object Data = new { Respuesta, Tipo };
                    return Data;
                }
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}