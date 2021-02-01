using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGeneratorAPI.Migrations
{
    public partial class RemovedUnnecessaryFKColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rows_RateTypes_FK_Row_RateType_RateTypeId",
                table: "Rows");

            migrationBuilder.DropForeignKey(
                name: "FK_Rows_Timesheets_FK_Row_Timesheet_TimesheetId",
                table: "Rows");

            migrationBuilder.DropForeignKey(
                name: "FK_Timesheets_AspNetUsers_FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets");

            migrationBuilder.DropIndex(
                name: "IX_Rows_FK_Row_RateType_RateTypeId",
                table: "Rows");

            migrationBuilder.DropIndex(
                name: "IX_Rows_FK_Row_Timesheet_TimesheetId",
                table: "Rows");

            migrationBuilder.DropColumn(
                name: "FK_Row_RateType_RateTypeId",
                table: "Rows");

            migrationBuilder.DropColumn(
                name: "FK_Row_Timesheet_TimesheetId",
                table: "Rows");

            migrationBuilder.RenameColumn(
                name: "FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets",
                newName: "UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Timesheets_FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets",
                newName: "IX_Timesheets_UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Rows_RateTypeId",
                table: "Rows",
                column: "RateTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Rows_TimesheetId",
                table: "Rows",
                column: "TimesheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_RateTypes_RateTypeId",
                table: "Rows",
                column: "RateTypeId",
                principalTable: "RateTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_Timesheets_TimesheetId",
                table: "Rows",
                column: "TimesheetId",
                principalTable: "Timesheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Timesheets_AspNetUsers_UserId1",
                table: "Timesheets",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rows_RateTypes_RateTypeId",
                table: "Rows");

            migrationBuilder.DropForeignKey(
                name: "FK_Rows_Timesheets_TimesheetId",
                table: "Rows");

            migrationBuilder.DropForeignKey(
                name: "FK_Timesheets_AspNetUsers_UserId1",
                table: "Timesheets");

            migrationBuilder.DropIndex(
                name: "IX_Rows_RateTypeId",
                table: "Rows");

            migrationBuilder.DropIndex(
                name: "IX_Rows_TimesheetId",
                table: "Rows");

            migrationBuilder.RenameColumn(
                name: "UserId1",
                table: "Timesheets",
                newName: "FK_Timesheet_IdentityUser_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Timesheets_UserId1",
                table: "Timesheets",
                newName: "IX_Timesheets_FK_Timesheet_IdentityUser_UserId");

            migrationBuilder.AddColumn<int>(
                name: "FK_Row_RateType_RateTypeId",
                table: "Rows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FK_Row_Timesheet_TimesheetId",
                table: "Rows",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rows_FK_Row_RateType_RateTypeId",
                table: "Rows",
                column: "FK_Row_RateType_RateTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Rows_FK_Row_Timesheet_TimesheetId",
                table: "Rows",
                column: "FK_Row_Timesheet_TimesheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_RateTypes_FK_Row_RateType_RateTypeId",
                table: "Rows",
                column: "FK_Row_RateType_RateTypeId",
                principalTable: "RateTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_Timesheets_FK_Row_Timesheet_TimesheetId",
                table: "Rows",
                column: "FK_Row_Timesheet_TimesheetId",
                principalTable: "Timesheets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Timesheets_AspNetUsers_FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets",
                column: "FK_Timesheet_IdentityUser_UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
