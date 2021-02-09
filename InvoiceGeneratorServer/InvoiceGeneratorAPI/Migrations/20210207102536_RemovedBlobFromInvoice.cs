using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGeneratorAPI.Migrations
{
    public partial class RemovedBlobFromInvoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Blob",
                table: "Invoices");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Blob",
                table: "Invoices",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
