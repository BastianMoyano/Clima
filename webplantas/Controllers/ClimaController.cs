using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using webplantas.Models;

namespace webplantas.Controllers
{
    public class ClimaController : Controller
    {
        // GET: Clima
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Historico()
        {
            return View();
        }
        public JsonResult GuardarProceso(proceso proceso)
        {
            if (Session["userName"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Clima.GuardarClima(proceso), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ObtenerhitorialProceso()
        {
            if (Session["userName"] == null)
            {
                return Json(2, JsonRequestBehavior.AllowGet);

            }
            return Json(Modelo_Clima.CargarProcesoporusuario(), JsonRequestBehavior.AllowGet);
        }
    }
}