using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvoiceGeneratorAPI.Const;
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
    public class TimesheetsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TimesheetsController(DatabaseContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Timesheets
        [HttpGet]
        public async Task<IEnumerable<TimesheetDTO>> GetTimesheet()
        {
            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var timesheets = new List<Timesheet>();

            if (currentUser != null)
            {
                timesheets = _context.Timesheet.Include(timesheet => timesheet.Rows).Where(timesheet => timesheet.UserId.Equals(currentUser.Id)).ToList();
            }

            var dtos = ModelToDto.TimesheetsToDtos(timesheets);
            return dtos;
        }

        // GET: api/Timesheets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TimesheetDTO>> GetTimesheet(int id)
        {
            var timesheet = await _context.Timesheet.FindAsync(id);

            if (timesheet == null)
            {
                return NotFound();
            }

            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var isCorrectUser = _context.Timesheet.Any(t => t.Id == id && t.UserId == currentUser.Id);

            if (!isCorrectUser)
            {
                return Forbid();
            }

            var dto = ModelToDto.TimesheetToDto(timesheet);

            return dto;
        }

        // PUT: api/Timesheets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimesheet(int id, TimesheetDTO timesheet)
        {
            if (id != timesheet.Id)
            {
                return BadRequest();
            }

            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var isCorrectUser = _context.Timesheet.Any(t => t.Id == id && t.UserId == currentUser.Id);

            if (!isCorrectUser)
            {
                return Forbid();
            }

            var timesheetObj = DtoToModel.DtoToTimesheet(timesheet);

            var validStates = States.GetStatesValues();

            if (!validStates.Contains(timesheet.State))
            {
                return BadRequest();
            }

            var isModificationAllowed = (await _context.Timesheet.FindAsync(id)).State != States.Closed;

            if (!isModificationAllowed)
            {
                return BadRequest();
            }

            // new Rows
            var newRows = timesheetObj.Rows.Where(row => row.Id.Equals(0));

            foreach (var newRow in newRows)
            {
                await _context.Row.AddAsync(newRow);
            }

            // edited Rows
            var oldRows = timesheetObj.Rows.Where(row => row.Id > 0);

            foreach (var oldRow in oldRows)
            {
                _context.Entry(oldRow).State = EntityState.Modified;
            }


            // main entity
            _context.Entry(timesheetObj).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimesheetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Timesheets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TimesheetDTO>> PostTimesheet(TimesheetDTO timesheet)
        {
            var user = await _userManager.FindByNameAsync(User?.Identity?.Name);

            if (user != null)
            {
                timesheet.UserId = user.Id;
            }

            var timesheetObj = DtoToModel.DtoToTimesheet(timesheet);

            var validStates = States.GetStatesValues();

            if (!validStates.Contains(timesheet.State))
            {
                return BadRequest();
            }

            await _context.Timesheet.AddAsync(timesheetObj);
            await _context.SaveChangesAsync();

            var dto = ModelToDto.TimesheetToDto(timesheetObj);

            return CreatedAtAction("GetTimesheet", new { id = timesheet.Id }, dto);
        }

        // DELETE: api/Timesheets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimesheet(int id)
        {
            var timesheet = await _context.Timesheet.FindAsync(id);
            if (timesheet == null)
            {
                return NotFound();
            }

            var currentUser = await _userManager.FindByNameAsync(User?.Identity?.Name);

            var isCorrectUser = _context.Timesheet.Any(t => t.Id == id && t.UserId == currentUser.Id);

            if (!isCorrectUser)
            {
                return Forbid();
            }

            _context.Timesheet.Remove(timesheet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TimesheetExists(int id)
        {
            return _context.Timesheet.Any(e => e.Id == id);
        }
    }
}
