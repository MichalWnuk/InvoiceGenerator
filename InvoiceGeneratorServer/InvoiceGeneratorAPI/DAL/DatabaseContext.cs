using InvoiceGeneratorAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace InvoiceGeneratorAPI.DAL
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        public DbSet<RateType> RateTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RateType>().ToTable("RateTypes");
            modelBuilder.Entity<Row>().ToTable("Rows");
            modelBuilder.Entity<Timesheet>().ToTable("Timesheets");
            SeedInitialData(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }

        private void SeedInitialData(ModelBuilder modelBuilder)
        {
            var rateTypes = new RateType[]
            {
                new() { Id = 1, DisplayName = "Standard", Type = Const.RateTypes.Standard },
                new() { Id = 2, DisplayName = "Overtime Standard", Type = Const.RateTypes.OvertimeStandard },
                new() { Id = 3, DisplayName = "Overtime Night", Type = Const.RateTypes.OvertimeNight },
                new() { Id = 4, DisplayName = "Holiday", Type = Const.RateTypes.Holiday }
            };

            modelBuilder.Entity<RateType>().HasData(rateTypes);
        }

        public DbSet<Timesheet> Timesheet { get; set; }
        public DbSet<Row> Row { get; set; }
        public DbSet<RateType> RateType { get; set; }
    }
}
