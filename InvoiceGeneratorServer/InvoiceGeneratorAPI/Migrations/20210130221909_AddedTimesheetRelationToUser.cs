using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGeneratorAPI.Migrations
{
    public partial class AddedTimesheetRelationToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Timesheets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets",
                column: "FK_Timesheet_IdentityUser_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Timesheets_AspNetUsers_FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets",
                column: "FK_Timesheet_IdentityUser_UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Timesheets_AspNetUsers_FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets");

            migrationBuilder.DropIndex(
                name: "IX_Timesheets_FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets");

            migrationBuilder.DropColumn(
                name: "FK_Timesheet_IdentityUser_UserId",
                table: "Timesheets");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Timesheets");
        }
    }
}
