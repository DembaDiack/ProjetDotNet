using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class AjoutController : Controller
    {
        [HttpPost]
        public async Task<int> ajoutProduitAsync()
        {
            var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            System.Diagnostics.Debug.Write(body);
            MongodbModel model = new MongodbModel();
            return await model.ajoutProduit(body);
        }
    }

}