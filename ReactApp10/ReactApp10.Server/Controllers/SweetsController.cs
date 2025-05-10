using Microsoft.AspNetCore.Mvc;
using static SweetsController;

[ApiController]
[Route("api/[controller]")]
public class SweetsController : ControllerBase
{
    public class Sweet
    {
        public string Name { get; set; }
        public int Price { get; set; }
    }

    private static List<Sweet> sweets = new List<Sweet>
{
    new Sweet { Name = "ショートケーキ", Price = 500 },
    new Sweet { Name = "ガトーショコラ", Price = 650 },
    new Sweet { Name = "モンブラン", Price = 480 }
};

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(sweets);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Sweet newSweet)
    {
        if (newSweet == null || string.IsNullOrEmpty(newSweet.Name) || newSweet.Price <= 0)
        {
            return BadRequest(new { Message = "Invalid sweet data" });
        }

        sweets.Add(newSweet);
        return Ok(sweets);
    }

    [HttpDelete("{name}")]
    public IActionResult Delete(string name)
    {
        var sweetToRemove = sweets.FirstOrDefault(s => s.Name == name);
        if (sweetToRemove == null)
        {
            return NotFound(new { Message = "Item not found" });
        }

        sweets.Remove(sweetToRemove);
        return Ok(sweets);
    }

}


//追加リクエストの流れ
//- ユーザーが 「追加」ボタン を押す
//- Reactの fetch() が POST リクエストを送信 (FetchExample.tsx)
//- ASP.NET Core の SampleController.cs で Post() メソッドが実行される
//- データが sweets のリストに追加される
//- 追加後の新しいリストがフロントエンドに返される
//- Reactがデータを受け取り、画面を更新する