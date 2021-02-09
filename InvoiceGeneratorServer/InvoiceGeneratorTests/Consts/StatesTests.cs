using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace InvoiceGeneratorTests.Consts
{
    [TestClass]
    public class StatesTests
    {
        [TestMethod]
        public void StateOpen_Should_BeOpen()
        {
            const string sut = InvoiceGeneratorAPI.Const.States.Open;

            Assert.AreEqual(sut, "Open");
        }

        [TestMethod]
        public void StateClosed_Should_BeClosed()
        {
            const string sut = InvoiceGeneratorAPI.Const.States.Closed;

            Assert.AreEqual(sut, "Closed");
        }

        [TestMethod]
        public void GetStatesValues_Should_ReturnStates()
        {
            List<string> sut = InvoiceGeneratorAPI.Const.States.GetStatesValues();

            Assert.AreEqual(sut.Count, 2);
            Assert.AreEqual(sut[0], "Open");
            Assert.AreEqual(sut[1], "Closed");
        }
    }
}