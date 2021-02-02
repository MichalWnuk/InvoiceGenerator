using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGeneratorAPI.Migrations
{
    public partial class AddedTimesheetIdToRow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FK_Row_Timesheet_TimesheetId",
                table: "Rows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimesheetId",
                table: "Rows",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rows_FK_Row_Timesheet_TimesheetId",
                table: "Rows",
                column: "FK_Row_Timesheet_TimesheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_Timesheets_FK_Row_Timesheet_TimesheetId",
                table: "Rows",
                column: "FK_Row_Timesheet_TimesheetId",
                principalTable: "Timesheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rows_Timesheets_FK_Row_Timesheet_TimesheetId",
                table: "Rows");

            migrationBuilder.DropIndex(
                name: "IX_Rows_FK_Row_Timesheet_TimesheetId",
                table: "Rows");

            migrationBuilder.DropColumn(
                name: "FK_Row_Timesheet_TimesheetId",
                table: "Rows");

            migrationBuilder.DropColumn(
                name: "TimesheetId",
                table: "Rows");
        }
    }
}
