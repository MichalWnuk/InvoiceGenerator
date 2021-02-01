using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using InvoiceGeneratorAPI.DTO;
using InvoiceGeneratorAPI.Models;

namespace InvoiceGeneratorAPI.Utils
{
    public static class ModelToDto
    {
        public static IEnumerable<TimesheetDTO> TimesheetsToDtos(IEnumerable<Timesheet> timesheets)
        {
            var timesheetList = timesheets.ToList();
            return timesheetList.Any() ? timesheetList.Select(TimesheetToDto) : Enumerable.Empty<TimesheetDTO>();
        }

        public static TimesheetDTO TimesheetToDto(Timesheet timesheet)
        {
            var rows = RowsCollectionToDto(timesheet.Rows);
            var timesheetDto = new TimesheetDTO {Date = timesheet.Date, Id = timesheet.Id, Rows = rows, UserId = timesheet.UserId, State = timesheet.State};

            return timesheetDto;
        }

        public static RowDTO RowToDto(Row row)
        {
            ICollection<DayDTO> days = DaysCollectionToDto(row.Days);
            var rowDto = new RowDTO {Days = days, Id = row.Id, RateTypeId = row.RateTypeId, TimesheetId = row.TimesheetId };

            return rowDto;
        }

        private static IEnumerable<RowDTO> RowsCollectionToDto(ICollection<Row> rows)
        {
            return rows?.Select(RowToDto) ?? Enumerable.Empty<RowDTO>();
        }

        private static ICollection<DayDTO> DaysCollectionToDto(string day)
        {
            var dto = JsonSerializer.Deserialize<ICollection<DayDTO>>(day);

            return dto;
        }
    }
}
