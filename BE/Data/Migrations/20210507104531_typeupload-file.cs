using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class typeuploadfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TypeUpload",
                table: "Files",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TypeUpload",
                table: "Files");
        }
    }
}
