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
    public class EditController : ControllerBase
    {
        
        [HttpPost]
       public async Task<string> editProduct()
       {
            var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            MongodbModel model = new MongodbModel();
            Product product = JsonConvert.DeserializeObject<Product>(body);
            model.editProduct(product);
            return body;
            // Product product = JsonConvert.DeserializeObject<Product>(body);
            // var document = new BsonDocument
            // {
            //     { "email", product.email },
            //     { "prix", product.prix  },
            //     {"quantite",product.quantite},
            //     {"image",product.image},
            //     {"matricule",product.matricule},
            //     {"_id", new BsonObjectId(ObjectId.Parse(product.Id))}
            // };
            // Console.WriteLine(document);
            // return await model.editProduct(product, document);
        }
    }
}
