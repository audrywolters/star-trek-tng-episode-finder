using StarTrekTNGApi.Data;

var builder = WebApplication.CreateBuilder(args);

//
// 🔌 SERVICES
//

// Controllers (enables [ApiController])
builder.Services.AddControllers();

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

app.Run();