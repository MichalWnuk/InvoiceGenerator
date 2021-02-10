using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace InvoiceGeneratorTests.Consts
{
    [TestClass]
    public class RateTypesTests
    {
        [TestMethod]
        public void RateTypeStandard_Should_BeSTD()
        {
            const string sut = InvoiceGeneratorAPI.Const.RateTypes.Standard;

            Assert.AreEqual(sut, "STD");
        }

        [TestMethod]
        public void RateTypeOvertimeStandard_Should_BeOVT()
        {
            const string sut = InvoiceGeneratorAPI.Const.RateTypes.OvertimeStandard;

            Assert.AreEqual(sut, "OVT");
        }

        [TestMethod]
        public void RateTypeOvertimeNight_Should_BeOVN()
        {
            const string sut = InvoiceGeneratorAPI.Const.RateTypes.OvertimeNight;

            Assert.AreEqual(sut, "OVN");
        }

        [TestMethod]
        public void RateTypeHoliday_Should_BeHLD()
        {
            const string sut = InvoiceGeneratorAPI.Const.RateTypes.Holiday;

            Assert.AreEqual(sut, "HLD");
        }
    }
}
