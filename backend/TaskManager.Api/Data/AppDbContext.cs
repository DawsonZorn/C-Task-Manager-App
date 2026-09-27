using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Models;

namespace TaskManager.Api.Data;

public class AppDbContext : DbContext //appdbcontext class inherits from dbcontext : means inherit allowing to connect to a db
{
  //create a constructor that takes in DbContextOptions and passes it to the base class constructor
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
  {
  }

  //tells efcore to turn model into task table
  public DbSet<TaskItem> Tasks { get; set; }
}
