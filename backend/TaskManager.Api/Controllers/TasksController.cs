using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Models;


namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
  private readonly AppDbContext _db;
  public TasksController(AppDbContext db) => _db = db;

  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var tasks = await _db.Tasks.ToListAsync();
    return Ok(tasks);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetById(int id)
  {
    var task = await _db.Tasks.FindAsync(id);
    if (task is null) return NotFound();
    return Ok(task);
  }

  [HttpPost]
  public async Task<IActionResult> Create(TaskItem task)
  {
    _db.Tasks.Add(task);
    await _db.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, TaskItem task)
  {
    if (id != task.Id) return BadRequest();
    if (!await _db.Tasks.AnyAsync(t => t.Id == id)) return NotFound();
    _db.Entry(task).State = EntityState.Modified;
    await _db.SaveChangesAsync();
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var task = await _db.Tasks.FindAsync(id);
    if (task is null) return NotFound();
    _db.Tasks.Remove(task);
    await _db.SaveChangesAsync();
    return NoContent();
  }
}