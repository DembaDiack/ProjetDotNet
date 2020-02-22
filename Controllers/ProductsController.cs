using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using Newtonsoft.Json;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        
        [HttpGet]
       public async Task<string> ShowProductsAsync()
       {
            MongodbModel model = new MongodbModel();
            var products = await model.getAllProducts();
            Console.WriteLine(products);
            return JsonConvert.SerializeObject(products);
        }
    }
}
