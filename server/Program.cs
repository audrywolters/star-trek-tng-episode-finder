using Dapper;
using StarTrekTNGApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// DI for your DB factory
builder.Services.AddSingleton<DbConnectionFactory>();

// IMPORTANT: Dapper mapping fix
Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

// Swagger (optional but helpful)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();