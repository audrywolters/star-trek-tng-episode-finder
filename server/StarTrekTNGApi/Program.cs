using StarTrekTNGApi.Data;
using System.Text.Json.Serialization;
using StarTrekTNGApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

//
// 🔌 SERVICES
//

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter());
    });

// Swagger (API testing UI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//
// 🌐 CORS (IMPORTANT for React -> API calls)
//
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173") // Vite React dev server
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

//
// 🧱 DATABASE FACTORY
//
builder.Services.AddSingleton<DbConnectionFactory>();

//
// 📦 REPOSITORIES
//
builder.Services.AddScoped<IFilterRepository, FilterRepository>();
builder.Services.AddScoped<IEpisodeRepository, EpisodeRepository>();

var app = builder.Build();

//
// 🧪 DEV TOOLS
//
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//
// 🚨 MIDDLEWARE PIPELINE
//

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Urls.Add("http://localhost:5000");

app.Run();

Console.WriteLine(builder.Configuration.GetConnectionString("DefaultConnection"));