using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : Controller
    {
        [HttpPost]
        public async Task<int> SearchUserAsync()
        {
            var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            MongodbModel model = new MongodbModel();
            Account account = JsonConvert.DeserializeObject<Account>(body);
            var hashedPassword = Crypto.HashPassword(account.password);
            var document = new BsonDocument
            {
                { "email", account.email },
                { "password", hashedPassword }
            };
            if(await model.insertUserAsync(document) == 1)
            {
                return 1;
            }
            if (await model.insertUserAsync(document) == 0)
            {
                return 0;
            }
            else
            {
                return 2;
            }


        }
    }

}