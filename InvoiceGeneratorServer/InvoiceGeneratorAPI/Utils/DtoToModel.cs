using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using AutoMapper.Internal;
using InvoiceGeneratorAPI.DTO;
using InvoiceGeneratorAPI.Models;

namespace InvoiceGeneratorAPI.Utils
{
    public static class DtoToModel
    {
        public static Timesheet DtoToTimesheet(TimesheetDTO dto)
        {
            var rows = DtosToRows(dto.Rows);
            var timesheet = new Timesheet
            {
                Id = dto.Id,
                Date = dto.Date,
                State = dto.State,
                UserId = dto.UserId,
                Rows = new List<Row>()
            };

            rows.ForAll(row => timesheet.Rows.Add(row));

            return timesheet;
        }

        private static ICollection<Row> DtosToRows(IEnumerable<RowDTO> dtos)
        {
            return dtos.Select(DtoToRow).ToList();
        }

        private static Row DtoToRow(RowDTO row)
        {
            return new()
            {
                Id = row.Id,
                RateTypeId = row.RateTypeId,
                TimesheetId = row.TimesheetId,
                Days = JsonSerializer.Serialize(row.Days)
            };
        }
    }
}
