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
    public class LoginController : ControllerBase
    {
        
        [HttpPost]
       public async Task<bool> GetStringAsync()
       {
            var reader = new StreamReader(Request.Body);
            var body = await reader.ReadToEndAsync();
            MongodbModel model = new MongodbModel();
            Account account = JsonConvert.DeserializeObject<Account>(body);


            bool check = await model.loginCheck(account.email,account.password);
            if (check)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
