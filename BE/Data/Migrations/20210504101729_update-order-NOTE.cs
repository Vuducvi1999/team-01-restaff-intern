using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class updateorderNOTE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);

           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        
            migrationBuilder.DropColumn(
                name: "Note",
                table: "Order");

        }
    }
}
