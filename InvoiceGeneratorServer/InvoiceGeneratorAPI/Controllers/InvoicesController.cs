using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InvoiceGeneratorAPI.DAL;
using InvoiceGeneratorAPI.DTO;
using InvoiceGeneratorAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System;
using InvoiceGeneratorAPI.Utils;

namespace InvoiceGeneratorAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public InvoicesController(DatabaseContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceDTO>>> GetInvoice()
        {
            var user = await _userManager.FindByNameAsync(User?.Identity?.Name);

            if (user == null)
            {
                return Forbid();
            }

            var dtos = _context.Invoice.Include(invoice => invoice.Timesheet).Where(invoice => invoice.UserId.Equals(user.Id)).Select(invoice =>
                new InvoiceDTO
                {
                    Id = invoice.Id,
                    GeneratedDate = invoice.GeneratedDate,
                    InvoiceNumber = invoice.InvoiceNumber,
                    TimesheetId = invoice.TimesheetId,
                    InvoiceForMonth = invoice.Timesheet.Date.Month.ToString(),
                    InvoiceForYear = invoice.Timesheet.Date.Year.ToString()
                });

            return await dtos.ToListAsync();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemoryStream>> GetInvoice(int id)
        {
            var user = await _userManager.FindByNameAsync(User?.Identity?.Name);

            if (user == null || !_context.Invoice.Any(searchedInvoice => searchedInvoice.UserId.Equals(user.Id) && searchedInvoice.Id.Equals(id)))
            {
                return Forbid();
            }

            var invoice = await _context.Invoice.FindAsync(id);
            var bytes = invoice.FileArray;
            var invoiceArray = System.Text.Encoding.UTF8.GetString(invoice.FileArray);

            var dataStream = new MemoryStream(bytes);

            Response.ContentType = "application/pdf";

            return dataStream;
        }

        // POST: api/Invoices
        [HttpPost]
        public async Task<ActionResult<InvoiceDataDTO>> PostInvoice(InvoiceDTO invoice)
        {
            var user = await _userManager.FindByNameAsync(User?.Identity?.Name);

            if (user == null)
            {
                return Forbid();
            }

            var isInvoiceValid = !_context.Invoice.Any(i => i.TimesheetId.Equals(invoice.TimesheetId)) &&
                                 _context.Timesheet.Any(t =>
                                     t.Id.Equals(invoice.TimesheetId) && t.State.Equals(Const.States.Closed));

            if (!isInvoiceValid)
            {
                return BadRequest(new { Message = "Cannot create new invoice for provided timesheet!"});
            }

            var invoiceTimesheet = await _context.Timesheet.FindAsync(invoice.TimesheetId);

            var invoiceObj = DtoToModel.DtoToInvoice(invoice);
            invoiceObj.InvoiceNumber = $"1/{invoiceTimesheet.Date.Month}/{invoiceTimesheet.Date.Year}";
            invoiceObj.UserId = user.Id;

            await _context.Invoice.AddAsync(invoiceObj);
            await _context.SaveChangesAsync();

            var obj = _context.Invoice.Include(i => i.Timesheet).Include(i => i.Timesheet.Rows)
                .First(i => i.Id.Equals(invoiceObj.Id));

            var invoiceSettings = await _context.UserInvoiceSettings.FirstAsync(settings => settings.UserId.Equals(user.Id));
            var invoiceSettingsDto = ModelToDto.InvoiceSettingsToDTO(invoiceSettings);

            var rateTypes = _context.RateTypes.ToList();

            var userRateAmounts = _context.UserRateAmount.Where(amount => amount.UserId.Equals(user.Id)).ToList();

            var dto = ModelToDto.InvoiceToDto(obj, invoiceSettingsDto, rateTypes, userRateAmounts);

            return dto;
        }

        // PATCH: api/Invoices/5
        [HttpPatch]
        public async Task<IActionResult> PatchInvoice(int id)
        {
            var user = await _userManager.FindByNameAsync(User?.Identity?.Name);

            if (user == null)
            {
                return Forbid();
            }

            var isInvoiceValid = _context.Invoice.Any(i => i.Id.Equals(id) && i.UserId.Equals(user.Id));

            if (!isInvoiceValid)
            {
                return BadRequest(new { Message = "Invoice with provided id does not exist for current user!" });
            }

            byte[] invoiceBytes;

            using (var stream = new StreamReader(Request.Body))
            {
                var file = await stream.ReadToEndAsync();
                invoiceBytes = System.Text.Encoding.UTF8.GetBytes(file);
            }

            if (invoiceBytes.Length <= 0)
            {
                return BadRequest();
            }

            var invoice = await _context.Invoice.FindAsync(id);
            invoice.FileArray = invoiceBytes;
                
            _context.Entry(invoice).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();

        }
    }
}
