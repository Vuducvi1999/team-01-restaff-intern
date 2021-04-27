using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddDataSeedColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DataSeedWebsites",
                keyColumn: "Id",
                keyValue: new Guid("019da936-83a7-46af-8b81-2ac83805b791"));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateByDate",
                table: "DataSeedWebsites",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "CreatedBy",
                table: "DataSeedWebsites",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedByName",
                table: "DataSeedWebsites",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeleteByDate",
                table: "DataSeedWebsites",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "DataSeedWebsites",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "DeletedByName",
                table: "DataSeedWebsites",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "DataSeedWebsites",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DataSeedWebsites",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateByDate",
                table: "DataSeedWebsites",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "DataSeedWebsites",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedByName",
                table: "DataSeedWebsites",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "DataSeedWebsites",
                columns: new[] { "Id", "Address", "CreateByDate", "CreatedBy", "CreatedByName", "DeleteByDate", "DeletedBy", "DeletedByName", "Email", "Fax", "IsActive", "IsDeleted", "Logo", "Phone", "UpdateByDate", "UpdatedBy", "UpdatedByName" },
                values: new object[] { new Guid("adec146d-800b-4180-9ec3-97c356cf8258"), "Fashion 62 Tran Huy Lieu, Ward 12, Phu Nhuan, Ho Chi Minh, Viet Nam", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("00000000-0000-0000-0000-000000000000"), null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("00000000-0000-0000-0000-000000000000"), null, "fashion62@gmail.com", "62626262626262", false, false, "Logo", "6262626262", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("00000000-0000-0000-0000-000000000000"), null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DataSeedWebsites",
                keyColumn: "Id",
                keyValue: new Guid("adec146d-800b-4180-9ec3-97c356cf8258"));

            migrationBuilder.DropColumn(
                name: "CreateByDate",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "CreatedByName",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "DeleteByDate",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "DeletedByName",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "UpdateByDate",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "DataSeedWebsites");

            migrationBuilder.DropColumn(
                name: "UpdatedByName",
                table: "DataSeedWebsites");

            migrationBuilder.InsertData(
                table: "DataSeedWebsites",
                columns: new[] { "Id", "Address", "Email", "Fax", "Logo", "Phone" },
                values: new object[] { new Guid("019da936-83a7-46af-8b81-2ac83805b791"), "Fashion 62 Tran Huy Lieu, Ward 12, Phu Nhuan, Ho Chi Minh, Viet Nam", "fashion62@gmail.com", "62626262626262", "Logo", "6262626262" });
        }
    }
}
