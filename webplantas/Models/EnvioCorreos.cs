using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Web;

namespace webplantas.Models
{
    public class EnvioCorreos
    {
        public static bool SendEmailRecuperarContrasena(string CorreoPara, Datos_Recomedacion data)
        {
            //cuerpo del correo.
            string HTML = @"<table class='wrapper' width='100%' cellpadding='0' cellspacing='0' role='presentation'>
                <tr>
                    <td align='center text-center'>
                        <table class='content' width='100%' cellpadding='0' cellspacing='0' role='presentation'>
                                <tr>
                                        <td class='header'>
                                            <a href=''>
                                            </a>
                                        </td>
                                </tr>
                                    
                            
        
                            <!-- Email Body -->
                            <tr>
                                <td class='body' width='100%' cellpadding='0' cellspacing='0'>
                                    <table class='inner-body' align='center' width='570' cellpadding='0' cellspacing='0' role='presentation'>
                                        <tr>
                                            <td colspan='2' align='center' >
                                          
                                                <hr>
                                            </td>

                                            
                                        </tr>
                                        <tr>
                                            <td colspan='2'><h3 style='text-align:center;'> <span style='color:#075f3a; font-weight:bold;'>Proceso ejecutado!</span>  </p></h3>
                                            <p>Hola " + data.NOMBRE_USUARIO + @", has ejecutado un proceso de riegado en el lugar " + data.LUGAR + @",
                                             en el sector " + data.SECTOR + @", el dia  " + data.FECHA + @".
                                                    <span style='color:#075f3a; font-weight:bold;'> Bienvenido a tu portal Riego.</span>  </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan='2' align='center'>
                                                <br>

           
                                                       </td>
                                        </tr>
                                        <tr>
                                            <td colspan='2' align='center'>
                                                <br>
                                                <p>Recuerda que tu Proceso expirará en " + data.TIENPO_RIEGO + @" minuto.</p>
                                                
                                            </td>
                                        </tr>
                                        

                                            
                                           
                                       
                                        <tr>
                                            <td colspan='2' align='center'>
                                                <br>
                                                <hr>
                                                <span><i>Este correo ha sido generado automaticamente. Por favor no responder. <br> Saludos,</i></span>
                                                <hr>
                                            </td>
                                            
                                        </tr>


                                    </table>


                                    
                                </td>
                            </tr>
                            <tr>
                                    <td>
                                        <table class='footer' align='center' width='570' cellpadding='0' cellspacing='0' role='presentation'>
                                            <tr>
                                                <td class='content-cell' align='center'>
                                                        Sistema Procesos de Riego. @copy 2022
                                                </td>
                                            </tr>
                                            
                                        </table>
                                    </td>
                                </tr>
                                
        
                            
                                
                        </table>
                    </td>
                </tr>
            </table>";

            using (SmtpClient cliente = new SmtpClient("smtp.gmail.com", 587))
            {

                string imagenLogo = "~/Img/planta.png";
                string firmaLogo = HttpContext.Current.Server.MapPath(imagenLogo);

                if (!System.IO.File.Exists(firmaLogo))
                {
                    firmaLogo = HttpContext.Current.Server.MapPath("~/Img/planta.png");
                }

                cliente.EnableSsl = true;
                cliente.UseDefaultCredentials = false;
                cliente.Credentials = new NetworkCredential("sistemaprocesosriego@gmail.com", "Bastitron123");
                MailMessage mensaje = new MailMessage();
                mensaje.From = new MailAddress("sistemaprocesosriego@gmail.com", "Portal Sistema de Riego");
                mensaje.To.Add(CorreoPara);
                mensaje.Subject = "Proceso ejecutado";
                mensaje.Priority = MailPriority.Normal;
                mensaje.IsBodyHtml = true;
                string htmlCompleto = HTML;

                AlternateView htmlView =
                AlternateView.CreateAlternateViewFromString(htmlCompleto,
                             Encoding.UTF8,
                             MediaTypeNames.Text.Html);


                LinkedResource img2 =
               new LinkedResource(firmaLogo,
                                   MediaTypeNames.Image.Jpeg);

                img2.ContentId = "imagen";


                htmlView.LinkedResources.Add(img2);

                mensaje.AlternateViews.Add(htmlView);



                mensaje.BodyEncoding = System.Text.Encoding.UTF8;
                //cliente.EnableSsl = true;
                cliente.Send(mensaje);
                mensaje.Dispose();

                return true;
            }

        }
    }
}
public class Datos_Recomedacion
{
    public string NOMBRE_USUARIO;
    public TimeSpan? TIENPO_RIEGO;
    public string LUGAR;
    public string SECTOR;
    public DateTime FECHA;

}