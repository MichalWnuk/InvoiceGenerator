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

        public static IEnumerable<UserRateAmountDTO> RateAmountsToDtos(IEnumerable<UserRateAmount> rateAmounts)
        {
            var rateAmountList = rateAmounts.ToList();
            return rateAmountList.Any() ? rateAmountList.Select(RateAmountToDto) : Enumerable.Empty<UserRateAmountDTO>();
        }

        public static InvoiceSettingsDTO InvoiceSettingsToDTO(UserInvoiceSettings settings)
        {
            return new()
            {
                BuyerAddressLine1 = settings.BuyerAddressLine1,
                BuyerAddressLine2 = settings.BuyerAddressLine2,
                BuyerName = settings.BuyerName,
                BuyerPhone = settings.BuyerPhone,
                BuyerTaxId = settings.BuyerTaxId,
                IssuedBy = settings.IssuedBy,
                SellerAccountNumber = settings.SellerAccountNumber,
                SellerAddressLine1 = settings.SellerAddressLine1,
                SellerAddressLine2 = settings.SellerAddressLine2,
                SellerBankName = settings.SellerBankName,
                SellerEmail = settings.SellerEmail,
                SellerName = settings.SellerName,
                SellerTaxId = settings.SellerTaxId
            };
        }

        private static RowDTO RowToDto(Row row)
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

        private static UserRateAmountDTO RateAmountToDto(UserRateAmount rateAmount)
        {
            var rateAmountDto = new UserRateAmountDTO { RateName = rateAmount.RateType.DisplayName, RateAmount = rateAmount.RateAmount };

            return rateAmountDto;
        }
    }
}
