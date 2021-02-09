using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGeneratorAPI.Migrations
{
    public partial class AddedUserInvoiceSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserInvoiceSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SellerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SellerAddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SellerAddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SellerTaxId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SellerEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SellerBankName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SellerAccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuyerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuyerAddressLine1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuyerAddressLine2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BuyerPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BuyerTaxId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IssuedBy = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInvoiceSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserInvoiceSettings_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserInvoiceSettings_UserId",
                table: "UserInvoiceSettings",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserInvoiceSettings");
        }
    }
}
