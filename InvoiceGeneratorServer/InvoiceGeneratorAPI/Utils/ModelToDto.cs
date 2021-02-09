using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.Json;
using InvoiceGeneratorAPI.DTO;
using InvoiceGeneratorAPI.Models;
using Microsoft.AspNetCore.Mvc;

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

        public static InvoiceDataDTO InvoiceToDto(Invoice invoice, InvoiceSettingsDTO invoiceSettingsDTO, ICollection<RateType> rateTypes, ICollection<UserRateAmount> rateAmounts)
        {
            var timesheetDto = TimesheetToDto(invoice.Timesheet);
            var summaryNetAmount = TimesheetDtoToSummaryNetAmount(timesheetDto, rateAmounts);

            return new InvoiceDataDTO()
            {
                Id = invoice.Id.ToString(),
                IssuedDate = invoice.GeneratedDate.ToShortDateString(),
                IssuedPlace = "Wroclaw",
                InvoiceNumber = invoice.InvoiceNumber,
                InvoiceSettings = invoiceSettingsDTO,
                InvoiceItems = TimesheetDtoToInvoiceItemDtos(timesheetDto, rateTypes, rateAmounts),
                TimesheetId = timesheetDto.Id.ToString(),
                InvoiceForMonth = invoice.Timesheet.Date.Month.ToString(),
                InvoiceForYear = invoice.Timesheet.Date.Year.ToString(),
                TaxRate = "23%",
                SummaryNetAmount = summaryNetAmount.ToString(CultureInfo.InvariantCulture),
                SummaryTaxAmount = Math.Round(summaryNetAmount * 0.23, 2).ToString(CultureInfo.InvariantCulture),
                SummaryGrossAmount = Math.Round(summaryNetAmount * 1.23, 2).ToString(CultureInfo.InvariantCulture),
                PayToDate = invoice.GeneratedDate.AddDays(30).ToShortDateString(),
                SellDate = invoice.GeneratedDate.ToShortDateString(),
                IssuedBy = invoiceSettingsDTO.IssuedBy
            };
        }

        private static ICollection<InvoiceItemDTO> TimesheetDtoToInvoiceItemDtos(TimesheetDTO dto, ICollection<RateType> rateTypes, ICollection<UserRateAmount> rateAmounts)
        {
            return (from row in dto.Rows
                let hoursCount = row.Days.Sum(day => day.ReportedHours)
                let netPrice = rateAmounts.First(amount => amount.RateTypeId.Equals(row.RateTypeId)).RateAmount
                let netAmount = hoursCount * netPrice
                select new InvoiceItemDTO()
                {
                    Title = rateTypes.First(type => type.Id.Equals(row.RateTypeId)).DisplayName,
                    Count = hoursCount.ToString(CultureInfo.InvariantCulture),
                    GrossAmount = Math.Round(netAmount * 1.23, 2).ToString(CultureInfo.InvariantCulture),
                    NetAmount = Math.Round(netAmount, 2).ToString(CultureInfo.InvariantCulture),
                    Metric = "godzina",
                    NetPrice = netPrice.ToString(CultureInfo.InvariantCulture),
                    TaxAmount = Math.Round(netAmount * 0.23, 2).ToString(CultureInfo.InvariantCulture),
                    TaxRate = "23%"
                }).ToList();
        }

        private static double TimesheetDtoToSummaryNetAmount(TimesheetDTO dto, ICollection<UserRateAmount> rateAmounts)
        {
            var output = (from row in dto.Rows
                let hoursCount = row.Days.Sum(day => day.ReportedHours)
                let netPrice = rateAmounts.First(amount => amount.RateTypeId.Equals(row.RateTypeId))
                    .RateAmount
                select Math.Round(hoursCount * netPrice, 2)).Sum();

            return output;
        }
    }
}
