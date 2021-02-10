using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace InvoiceGeneratorTests.Consts
{
    [TestClass]
    public class RolesTests
    {
        [TestMethod]
        public void RoleAdmin_Should_BeAdmin()
        {
            const string sut = InvoiceGeneratorAPI.Const.Roles.Admin;

            Assert.AreEqual(sut, "Admin");
        }

        [TestMethod]
        public void RoleUser_Should_BeUser()
        {
            const string sut = InvoiceGeneratorAPI.Const.Roles.User;

            Assert.AreEqual(sut, "User");
        }
    }
}