using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using WebApplication1.Controllers;

namespace WebApplication1.Models
{
    public class MongodbModel
    {
        public IMongoCollection<BsonDocument> getCollection(string name = "stock")
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("gestion");
            var collection = database.GetCollection<BsonDocument>(name);
            return collection;
        }

        public BsonDocument getFirst()
        {
            
            var document = getCollection().Find(new BsonDocument()).FirstOrDefault();
            return document;
        }
        public List<BsonDocument> getAll()
        {
            var document = getCollection().Find(new BsonDocument()).ToList();
            return document;
        }
        public async Task<int> insertUserAsync(BsonDocument document)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("email", document.GetValue("email"));
            var result = await getCollection().Find(filter).CountAsync();
            if (result <= 0)
            {
                try
                {
                    getCollection().InsertOneAsync(document);
                    return 1;
                }
                catch(Exception e)
                {
                    return 2;
                }
            }
            else
            {
                return 0;
            }

        }

        public async Task<bool> loginCheck(string email,string password)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("email",email);
            var count = await getCollection().Find(filter).CountAsync();
            if (count >= 1)
            {
                var result = await getCollection().Find(filter).FirstAsync();
                Account account = BsonSerializer.Deserialize<Account>(result);
                bool check = Crypto.VerifyHashedPassword(account.password, password);
                if (check)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
            
        }
        public async Task<int> ajoutProduit(string body)
        {
            Product product = JsonConvert.DeserializeObject<Product>(body);

            var document = new BsonDocument
            {
                { "email", product.email },
                { "quantite", product.quantite },
                {"matricule",product.matricule },
                {"image",product.image },
                {"prix",product.prix },
                {"nom",product.nom}
            };

            var filter = Builders<BsonDocument>.Filter.Eq("matricule", document.GetValue("matricule"));
            var result = await getCollection("produits").Find(filter).CountAsync();
            if (result <= 0)
            {
                try
                {
                    getCollection("produits").InsertOneAsync(document);
                    return 1;
                }
                catch (Exception e)
                {
                    return 2;
                }
            }
            else
            {
                return 0;
            }
        }
        public async Task<int> countDocs()
        {
            var sort = Builders<BsonDocument>.Sort.Descending("matricule");
            try
            {
                var count = await getCollection("produits").Find(new BsonDocument()).Sort(sort).FirstAsync();
                var result = BsonSerializer.Deserialize<Product>(count);
                return result.matricule;
            }
            catch (System.Exception)
            {
                return 0;
            }
            
        }

        public async Task<List<Product>> getAllProducts(){
            var collection = await getCollection("produits").Find(new BsonDocument()).ToListAsync();
            List<Product> all = new List<Product>();
            foreach(var doc in collection){
                all.Add(BsonSerializer.Deserialize<Product>(doc));
            }
            return all;
        }
        public async Task<string> deleteProduct(int matricule)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("matricule",matricule);
            var result = await getCollection("produits").DeleteOneAsync(filter);
            return result.ToJson();
        }
        public async Task<string> editProduct(Product product){
            var filter = Builders<BsonDocument>.Filter.Eq("matricule",product.matricule);
            Console.WriteLine(product.matricule);
            var result = await getCollection("produits").FindOneAndUpdateAsync(filter,new BsonDocument(){
                {"email",product.email},
                {"matricule",product.matricule},
                {"quantite",product.quantite},
                {"prix",product.prix},
                {"image",product.image},
                {"nom",product.nom}
            });
            return result.ToJson();
        }
        public async Task<string> editAccount(Account account){
            var filter = Builders<BsonDocument>.Filter.Eq("email",account.email);
            var hashedPassword = Crypto.HashPassword(account.password);
            var result = await getCollection().FindOneAndUpdateAsync(filter,new BsonDocument(){
                {"email",account.email},
                {"password",hashedPassword},
            });
            Console.WriteLine(result);
            Console.Write("affected rows " + result.Count());
            return result.ToJson();
        }
        public async Task<string> findProductByMatriculeAsync(int matricule){
            Console.WriteLine(matricule);
            var filter = Builders<BsonDocument>.Filter.Eq("matricule",matricule);
            var result = await getCollection("produits").Find(filter).FirstAsync();
            var product = BsonSerializer.Deserialize<Product>(result);
            return JsonConvert.SerializeObject(product);
        }

        public async Task<List<Product>> findProduct(string query){
            List<Product> all = new List<Product>();
            var builder = Builders<BsonDocument>.Filter;
            var pattern = new BsonRegularExpression(query,"i");
            var emailFilter = builder.Regex("email",pattern);
            var nameFilter = builder.Regex("nom",pattern);
            var matriculeFilter = builder.Regex("matricule",new BsonRegularExpression(query,"i"));
            var combinedOr = builder.Or(matriculeFilter | emailFilter | nameFilter);
            var count = await getCollection("produits").Find(combinedOr).CountAsync();
            Console.WriteLine(count);
            if(count >= 0 ){
                var result = await getCollection("produits").Find(combinedOr).ToListAsync();
                foreach(var doc in result){
                all.Add(BsonSerializer.Deserialize<Product>(doc));
                }
            return all;
            }
            else{
                return all;
            }
        }
}
}