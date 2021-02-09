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
    public class InvoiceSettingsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public InvoiceSettingsController(DatabaseContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/InvoiceSettings
        [HttpGet]
        public async Task<ActionResult<InvoiceSettingsDTO>> GetUserInvoiceSettings()
        {
            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var invoiceSettings =  await _context.UserInvoiceSettings.Where(settings => settings.UserId.Equals(currentUser.Id)).FirstOrDefaultAsync();

            var dtos = ModelToDto.InvoiceSettingsToDTO(invoiceSettings);

            return dtos;
        }

        // PUT: api/InvoiceSettings
        [HttpPut]
        public async Task<IActionResult> PutUserInvoiceSettings(InvoiceSettingsDTO userInvoiceSettings)
        {
            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var invoiceSettings = await _context.UserInvoiceSettings.Where(settings => settings.UserId.Equals(currentUser.Id)).FirstAsync();

            invoiceSettings.UpdatePropertiesFromDto(userInvoiceSettings);

            _context.Entry(invoiceSettings).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
