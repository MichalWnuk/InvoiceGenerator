using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGeneratorAPI.Migrations
{
    public partial class AddedUserRateAmounts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserRateAmounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RateTypeId = table.Column<int>(type: "int", nullable: false),
                    RateAmount = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRateAmounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRateAmounts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRateAmounts_RateTypes_RateTypeId",
                        column: x => x.RateTypeId,
                        principalTable: "RateTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserRateAmounts_RateTypeId",
                table: "UserRateAmounts",
                column: "RateTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRateAmounts_UserId",
                table: "UserRateAmounts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRateAmounts");
        }
    }
}
