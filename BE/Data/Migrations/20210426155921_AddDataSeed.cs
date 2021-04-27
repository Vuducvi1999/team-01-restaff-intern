using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddDataSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DataSeedWebsites",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fax = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSeedWebsites", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "DataSeedWebsites",
                columns: new[] { "Id", "Address", "Email", "Fax", "Logo", "Phone" },
                values: new object[] { new Guid("019da936-83a7-46af-8b81-2ac83805b791"), "Fashion 62 Tran Huy Lieu, Ward 12, Phu Nhuan, Ho Chi Minh, Viet Nam", "fashion62@gmail.com", "62626262626262", "Logo", "6262626262" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataSeedWebsites");
        }
    }
}
