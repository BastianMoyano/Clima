using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using webplantas.Models;
namespace webplantas.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Ingreso(string _username, string _contrasena)
        {
            return Json(Modelo_Login.Autentificar(_username, _contrasena), JsonRequestBehavior.AllowGet);
        }
    }
}