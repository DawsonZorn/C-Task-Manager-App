using Microsoft.AspNetCore.OpenApi;
using TaskManager.Api.Data;
using Microsoft.EntityFrameworkCore; //to allow for sqlite connection

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers(); //registers controllers like TasksController
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "TaskManager API");
    });
}

app.UseHttpsRedirection();

app.MapControllers(); //maps [Route] attributes, e.g. /api/tasks

app.Run();
