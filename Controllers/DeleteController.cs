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
    public class DeleteController : ControllerBase
    {
        
        [HttpPost]
       public async Task<string> DeleteProduct()
       {
            var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            MongodbModel model = new MongodbModel();
            Product product = JsonConvert.DeserializeObject<Product>(body);
            
            return await model.deleteProduct(product.matricule);
        }
    }
}
