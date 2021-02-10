using System;
using System.Collections.Generic;
using System.Linq;
using InvoiceGeneratorAPI.Const;
using InvoiceGeneratorAPI.DTO;
using InvoiceGeneratorAPI.Utils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace InvoiceGeneratorTests.Utils
{
    [TestClass]
    public class DtoToModelTests
    {
        private readonly string _sampleUserId;
        private readonly DateTime _sampleDate;

        public DtoToModelTests()
        {
            _sampleUserId = Guid.NewGuid().ToString();
            _sampleDate = new DateTime(2020, 5, 15);
        }

        [TestMethod]
        public void DtoToTimesheet_Should_ReturnValidTimesheetObject()
        {
            var timesheetDto = CreateMockTimesheetDTO();

            var sut = DtoToModel.DtoToTimesheet(timesheetDto);

            Assert.AreEqual(1, sut.Id);
            Assert.AreEqual(_sampleDate, sut.Date);
            Assert.AreEqual(_sampleUserId, sut.UserId);
            Assert.AreEqual(States.Open, sut.State);
            Assert.AreEqual(1, sut.Rows.ElementAt(0).Id);
            Assert.AreEqual(1, sut.Rows.ElementAt(0).RateTypeId);
            Assert.AreEqual(1, sut.Rows.ElementAt(0).TimesheetId);
            Assert.AreEqual(1, sut.Rows.ElementAt(1).Id);
            Assert.AreEqual(2, sut.Rows.ElementAt(1).RateTypeId);
            Assert.AreEqual(1, sut.Rows.ElementAt(1).TimesheetId);
            Assert.AreEqual(sut.Rows.ElementAt(0).Days, "[{\"Date\":\"2020-05-15T00:00:00\",\"ReportedHours\":8},{\"Date\":\"2020-05-15T00:00:00\",\"ReportedHours\":7}]");
        }

        [TestMethod]
        public void DtoToInvoice_Should_ReturnValidInvoiceObject()
        {
            var invoiceDto = CreateMockInvoiceDTO();

            var sut = DtoToModel.DtoToInvoice(invoiceDto);

            Assert.AreEqual(0, sut.Id);
            Assert.AreEqual(1, sut.TimesheetId);
            Assert.AreEqual(DateTime.Today, sut.GeneratedDate);
            Assert.AreEqual(Array.Empty<byte>(), sut.FileArray);
        }

        private TimesheetDTO CreateMockTimesheetDTO()
        {
            var dto = new TimesheetDTO
            {
                Id = 1,
                State = States.Open,
                UserId = _sampleUserId,
                Date = _sampleDate,
                Rows = CreateMockRowDtos()
            };

            return dto;
        }

        private ICollection<RowDTO> CreateMockRowDtos()
        {
            var row1 = new RowDTO()
            {
                Id = 1,
                TimesheetId = 1,
                RateTypeId = 1,
                Days = CreateMockDayDtos()
            };

            var row2 = new RowDTO()
            {
                Id = 1,
                TimesheetId = 1,
                RateTypeId = 2,
                Days = CreateMockDayDtos()
            };

            return new List<RowDTO> {row1, row2};
        }

        private ICollection<DayDTO> CreateMockDayDtos()
        {
            var day1 = new DayDTO()
            {
                Date = _sampleDate,
                ReportedHours = 8
            };

            var day2 = new DayDTO()
            {
                Date = _sampleDate,
                ReportedHours = 7
            };

            return new List<DayDTO> {day1, day2};
        }

        private InvoiceDTO CreateMockInvoiceDTO()
        {
            var invoiceDto = new InvoiceDTO()
            {
                GeneratedDate = _sampleDate,
                Id = 1,
                TimesheetId = 1,
                InvoiceForMonth = "2",
                InvoiceForYear = "2020",
                InvoiceNumber = "20/01/2020"
            };

            return invoiceDto;
        }
    }
}