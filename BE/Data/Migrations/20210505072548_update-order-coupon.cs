using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class updateordercoupon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CouponCode",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CouponName",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CouponPercent",
                table: "Order",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CouponValue",
                table: "Order",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CouponCode",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "CouponName",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "CouponPercent",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "CouponValue",
                table: "Order");
      
        }
    }
}
