using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceGeneratorAPI.DAL;
using InvoiceGeneratorAPI.Models;

namespace InvoiceGeneratorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RateTypesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public RateTypesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/RateTypes
        [ResponseCache(Duration = 600, Location = ResponseCacheLocation.Any)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RateType>>> GetRateTypes()
        {
            return await _context.RateTypes.ToListAsync();
        }

        // GET: api/RateTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RateType>> GetRateType(int id)
        {
            var rateType = await _context.RateTypes.FindAsync(id);

            if (rateType == null)
            {
                return NotFound();
            }

            return rateType;
        }
    }
}
