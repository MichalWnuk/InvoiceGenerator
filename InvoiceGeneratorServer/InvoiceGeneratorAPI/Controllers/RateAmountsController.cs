using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceGeneratorAPI.DAL;
using InvoiceGeneratorAPI.DTO;
using InvoiceGeneratorAPI.Models;
using InvoiceGeneratorAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace InvoiceGeneratorAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class RateAmountsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public RateAmountsController(DatabaseContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/RateAmounts
        [HttpGet]
        public async Task<IEnumerable<UserRateAmountDTO>> GetUserRateAmount()
        {
            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var rateAmounts = _context.UserRateAmount.Include(rateAmount => rateAmount.RateType)
                .Where(rateAmount => rateAmount.UserId.Equals(currentUser.Id)).ToList();
            
            var dtos = ModelToDto.RateAmountsToDtos(rateAmounts);

            return dtos;
        }

        // PUT: api/RateAmounts
        [HttpPut]
        public async Task<IActionResult> PutUserRateAmount(IEnumerable<UserRateAmountDTO> userRateAmounts)
        {
            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var rateAmounts = _context.UserRateAmount.Include(rateAmount => rateAmount.RateType)
                .Where(rateAmount => rateAmount.UserId.Equals(currentUser.Id)).ToList();

            var userRateAmountDtos = userRateAmounts.ToList();

            foreach (var rateAmount in rateAmounts)
            {
                rateAmount.RateAmount = userRateAmountDtos
                    .First(rateAmountDTO => rateAmountDTO.RateName.Equals(rateAmount.RateType.DisplayName)).RateAmount;
                _context.Entry(rateAmount).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
