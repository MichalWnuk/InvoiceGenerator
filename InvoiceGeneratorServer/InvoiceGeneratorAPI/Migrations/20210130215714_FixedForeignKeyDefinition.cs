using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGeneratorAPI.Migrations
{
    public partial class FixedForeignKeyDefinition : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rows_Timesheets_FK_Timesheets_Rows_RowId",
                table: "Rows");

            migrationBuilder.DropIndex(
                name: "IX_Rows_FK_Timesheets_Rows_RowId",
                table: "Rows");

            migrationBuilder.DropColumn(
                name: "FK_Timesheets_Rows_RowId",
                table: "Rows");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FK_Timesheets_Rows_RowId",
                table: "Rows",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rows_FK_Timesheets_Rows_RowId",
                table: "Rows",
                column: "FK_Timesheets_Rows_RowId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_Timesheets_FK_Timesheets_Rows_RowId",
                table: "Rows",
                column: "FK_Timesheets_Rows_RowId",
                principalTable: "Timesheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
