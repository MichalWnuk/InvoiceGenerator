using System;
using System.Collections.Generic;
using System.Linq;
using InvoiceGeneratorAPI.Const;
using InvoiceGeneratorAPI.DTO;
using InvoiceGeneratorAPI.Models;
using InvoiceGeneratorAPI.Utils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace InvoiceGeneratorTests.Utils
{
    [TestClass]
    public class ModelToDtoTests
    {
        private readonly string _sampleUserId;
        private readonly DateTime _sampleDate;

        public ModelToDtoTests()
        {
            _sampleUserId = Guid.NewGuid().ToString();
            _sampleDate = new DateTime(2020, 5, 15);
        }

        [TestMethod]
        public void InvoiceSettingsToDTO_Should_ReturnValidDTO()
        {
            var mockUserInvoiceSettings = CreateMockUserInvoiceSettings();

            var sut = ModelToDto.InvoiceSettingsToDTO(mockUserInvoiceSettings);

            Assert.AreEqual(mockUserInvoiceSettings.BuyerAddressLine1, sut.BuyerAddressLine1);
            Assert.AreEqual(mockUserInvoiceSettings.BuyerAddressLine2, sut.BuyerAddressLine2);
            Assert.AreEqual(mockUserInvoiceSettings.BuyerName, sut.BuyerName);
            Assert.AreEqual(mockUserInvoiceSettings.BuyerPhone, sut.BuyerPhone);
            Assert.AreEqual(mockUserInvoiceSettings.BuyerTaxId, sut.BuyerTaxId);
            Assert.AreEqual(mockUserInvoiceSettings.IssuedBy, sut.IssuedBy);
            Assert.AreEqual(mockUserInvoiceSettings.SellerAccountNumber, sut.SellerAccountNumber);
            Assert.AreEqual(mockUserInvoiceSettings.SellerAddressLine1, sut.SellerAddressLine1);
            Assert.AreEqual(mockUserInvoiceSettings.SellerAddressLine2, sut.SellerAddressLine2);
            Assert.AreEqual(mockUserInvoiceSettings.SellerBankName, sut.SellerBankName);
            Assert.AreEqual(mockUserInvoiceSettings.SellerEmail, sut.SellerEmail);
            Assert.AreEqual(mockUserInvoiceSettings.SellerName, sut.SellerName);
            Assert.AreEqual(mockUserInvoiceSettings.SellerTaxId, sut.SellerTaxId);
        }

        [TestMethod]
        public void RateAmountsToDTOs_Should_ReturnValidDTOCollection()
        {
            var mockRateAmounts = CreateMockRateAmounts();

            var sut = ModelToDto.RateAmountsToDtos(mockRateAmounts).ToList();

            Assert.AreEqual(sut.Count, 2);
            Assert.AreEqual(sut.ElementAt(0).RateAmount, 200);
            Assert.AreEqual(sut.ElementAt(1).RateAmount, 239);
            Assert.AreEqual(sut.ElementAt(0).RateName, "Test Rate Type");
            Assert.AreEqual(sut.ElementAt(1).RateName, "Test Rate Type");
        }

        [TestMethod]
        public void TimesheetToDTO_Should_ReturnValidDTO()
        {
            var mockTimesheet = CreateMockTimesheet();

            var sut = ModelToDto.TimesheetToDto(mockTimesheet);

            Assert.AreEqual(sut.Id, 1);
            Assert.AreEqual(sut.Date, _sampleDate);
            Assert.AreEqual(sut.UserId, _sampleUserId);
            Assert.AreEqual(sut.Rows.Count(), 2);
            Assert.AreEqual(sut.Rows.ElementAt(0).Id, 1);
            Assert.AreEqual(sut.Rows.ElementAt(1).Id, 2);
            Assert.AreEqual(sut.Rows.ElementAt(0).RateTypeId, 1);
            Assert.AreEqual(sut.Rows.ElementAt(1).RateTypeId, 2);
            Assert.AreEqual(sut.Rows.ElementAt(0).TimesheetId, 1);
            Assert.AreEqual(sut.Rows.ElementAt(1).TimesheetId, 1);
            Assert.AreEqual(sut.Rows.ElementAt(0).Days.Count(), 2);
            Assert.AreEqual(sut.Rows.ElementAt(1).Days.Count(), 2);
            Assert.AreEqual(sut.Rows.ElementAt(0).Days.ElementAt(0).Date, _sampleDate);
            Assert.AreEqual(sut.Rows.ElementAt(0).Days.ElementAt(1).Date, _sampleDate);
            Assert.AreEqual(sut.Rows.ElementAt(1).Days.ElementAt(0).Date, _sampleDate);
            Assert.AreEqual(sut.Rows.ElementAt(1).Days.ElementAt(1).Date, _sampleDate);
            Assert.AreEqual(sut.Rows.ElementAt(0).Days.ElementAt(0).ReportedHours, 8);
            Assert.AreEqual(sut.Rows.ElementAt(0).Days.ElementAt(1).ReportedHours, 7);
            Assert.AreEqual(sut.Rows.ElementAt(1).Days.ElementAt(0).ReportedHours, 8);
            Assert.AreEqual(sut.Rows.ElementAt(1).Days.ElementAt(1).ReportedHours, 7);
        }

        [TestMethod]
        public void TimesheetsToDTOs_Should_ReturnValidDTOCollection()
        {
            var mockTimesheet1 = CreateMockTimesheet();
            var mockTimesheet2 = CreateMockTimesheet();
            var timesheetsCollection = new List<Timesheet> {mockTimesheet1, mockTimesheet2};

            var sut = ModelToDto.TimesheetsToDtos(timesheetsCollection);

            Assert.AreEqual(sut.Count(), 2);
        }

        [TestMethod]
        public void TimesheetsToDTOs_WhenPassedEmptyArgument_Should_ReturnEmptyDTOCollection()
        {
            var sut = ModelToDto.TimesheetsToDtos(new List<Timesheet>());

            Assert.AreEqual(sut.Count(), 0);
        }

        [TestMethod]
        public void InvoiceToDTO_Should_ReturnValidInvoiceDataDTO()
        {
            var invoice = CreateMockInvoice();
            var invoiceSettingsDto = CreateMockUserInvoiceSettingsDTO();
            var rateTypes = CreateMockRateTypeCollection().ToList();
            var rateAmounts = CreateMockRateAmountsForRateTypes(rateTypes).ToList();

            var sut = ModelToDto.InvoiceToDto(invoice, invoiceSettingsDto, rateTypes, rateAmounts);

            Assert.AreEqual("1", sut.Id);
            Assert.AreEqual("Wroclaw", sut.IssuedPlace);
            Assert.AreEqual(invoice.InvoiceNumber, sut.InvoiceNumber);
            Assert.AreEqual(invoice.TimesheetId.ToString(), sut.TimesheetId);
            Assert.AreEqual(_sampleDate.Month.ToString(), sut.InvoiceForMonth);
            Assert.AreEqual(_sampleDate.Year.ToString(), sut.InvoiceForYear);
            Assert.AreEqual("23%", sut.TaxRate);
            Assert.AreEqual("6000", sut.SummaryNetAmount);
            Assert.AreEqual("1380", sut.SummaryTaxAmount);
            Assert.AreEqual("7380", sut.SummaryGrossAmount);
            Assert.AreEqual(_sampleDate.AddDays(30).ToShortDateString(), sut.PayToDate);
            Assert.AreEqual(_sampleDate.ToShortDateString(), sut.IssuedDate);
            Assert.AreEqual(invoiceSettingsDto.IssuedBy, sut.IssuedBy);
            Assert.AreSame(invoiceSettingsDto, sut.InvoiceSettings);
        }

        private UserInvoiceSettings CreateMockUserInvoiceSettings()
        {
            var mock = new UserInvoiceSettings
            {
                BuyerAddressLine1 = "BuyerAddressLine1",
                BuyerAddressLine2 = "BuyerAddressLine2",
                BuyerName = "BuyerName",
                BuyerPhone = "BuyerPhone",
                BuyerTaxId = "BuyerTaxId",
                IssuedBy = "IssuedBy",
                SellerAccountNumber = "SellerAccountNumber",
                SellerAddressLine1 = "SellerAddressLine1",
                SellerAddressLine2 = "SellerAddressLine2",
                SellerBankName = "SellerBankName",
                SellerEmail = "SellerEmail",
                SellerName = "SellerName"
            };

            return mock;
        }

        private IEnumerable<UserRateAmount> CreateMockRateAmounts()
        {
            var mockRateType = CreateMockRateType();
            var mock1 = new UserRateAmount()
            {
               RateType = mockRateType,
               RateAmount = 200
            };
            var mock2 = new UserRateAmount()
            {
                RateType = mockRateType,
                RateAmount = 239
            };


            return new List<UserRateAmount> {mock1, mock2};
        }

        private RateType CreateMockRateType()
        {
            var mock = new RateType
            {
                Id = 1,
                Type = "TEST",
                DisplayName = "Test Rate Type"
            };

            return mock;
        }

        private Timesheet CreateMockTimesheet()
        {
            var mock = new Timesheet
            {
                Date = _sampleDate,
                Id = 1,
                UserId = _sampleUserId,
                State = States.Open,
                Rows = CreateMockRowCollection().ToList()
            };

            return mock;
        }

        private IEnumerable<Row> CreateMockRowCollection()
        {
            var row1 = new Row
            {
                Id = 1,
                RateTypeId = 1,
                TimesheetId = 1,
                Days = CreateMockDaysString()
            };

            var row2 = new Row
            {
                Id = 2,
                RateTypeId = 2,
                TimesheetId = 1,
                Days = CreateMockDaysString()
            };

            return new List<Row>
            {
                row1,
                row2
            };
        }

        private string CreateMockDaysString()
        {
            return
                "[{\"Date\":\"2020-05-15T00:00:00\",\"ReportedHours\":8},{\"Date\":\"2020-05-15T00:00:00\",\"ReportedHours\":7}]";
        }

        private Invoice CreateMockInvoice()
        {
            var invoice = new Invoice
            {
                Id = 1,
                GeneratedDate = _sampleDate,
                InvoiceNumber = "01/01/2020",
                TimesheetId = 1,
                UserId = _sampleUserId,
                Timesheet = CreateMockTimesheet()
            };

            return invoice;
        }

        private InvoiceSettingsDTO CreateMockUserInvoiceSettingsDTO()
        {
            var mock = new InvoiceSettingsDTO
            {
                BuyerAddressLine1 = "BuyerAddressLine1",
                BuyerAddressLine2 = "BuyerAddressLine2",
                BuyerName = "BuyerName",
                BuyerPhone = "BuyerPhone",
                BuyerTaxId = "BuyerTaxId",
                IssuedBy = "IssuedBy",
                SellerAccountNumber = "SellerAccountNumber",
                SellerAddressLine1 = "SellerAddressLine1",
                SellerAddressLine2 = "SellerAddressLine2",
                SellerBankName = "SellerBankName",
                SellerEmail = "SellerEmail",
                SellerName = "SellerName"
            };

            return mock;
        }

        private IEnumerable<RateType> CreateMockRateTypeCollection()
        {
            var rateType1 = new RateType
            {
                Id = 1,
                DisplayName = RateTypes.Standard,
                Type = "STD"
            };

            var rateType2 = new RateType
            {
                Id = 2,
                DisplayName = RateTypes.OvertimeStandard,
                Type = "OVT"
            };

            var rateType3 = new RateType
            {
                Id = 3,
                DisplayName = RateTypes.OvertimeNight,
                Type = "OVN"
            };

            var rateType4 = new RateType
            {
                Id = 4,
                DisplayName = RateTypes.Holiday,
                Type = "OVN"
            };

            return new List<RateType> {rateType1, rateType2, rateType3, rateType4};
        }

        private IEnumerable<UserRateAmount> CreateMockRateAmountsForRateTypes(IEnumerable<RateType> rateTypes)
        {
            return rateTypes.Select(rateType => new UserRateAmount() {RateTypeId = rateType.Id, RateType = rateType, RateAmount = 200}).ToList();
        }
    }
}
