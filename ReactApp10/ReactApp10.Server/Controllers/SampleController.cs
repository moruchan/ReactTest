using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SampleController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var sweets = new List<object>
        {
            new { Name = "ショートケーキ", Price = 500 },
            new { Name = "ガトーショコラ", Price = 650 },
            new { Name = "モンブラン", Price = 480 }
        };

        return Ok(sweets);
    }
}