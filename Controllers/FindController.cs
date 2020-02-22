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
    public class FindController : ControllerBase
    {
        public class Edit {
            public int matricule {get;set;}
        }
        [HttpPost]
       public async Task<string> FetchProduct()
       {
            var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            MongodbModel model = new MongodbModel();
            Edit account = JsonConvert.DeserializeObject<Edit>(body);
            return await model.findProductByMatriculeAsync(account.matricule);
        }
    }
}
