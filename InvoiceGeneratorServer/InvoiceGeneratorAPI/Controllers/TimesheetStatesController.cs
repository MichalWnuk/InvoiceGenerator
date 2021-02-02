using System.Collections.Generic;
using InvoiceGeneratorAPI.Const;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceGeneratorAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TimesheetStatesController : ControllerBase
    {
        // GET: api/TimesheetStates
        [HttpGet]
        public IEnumerable<string> GetTimesheet()
        {
            var states = States.GetStatesValues();

            return states;
        }
    }
}
