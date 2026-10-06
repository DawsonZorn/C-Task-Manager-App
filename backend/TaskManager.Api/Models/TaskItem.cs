using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models;

public class TaskItem
{
  public int Id { get; set; }
  [Required]
  public string Title { get; set; } = string.Empty;
  public bool IsCompleted { get; set; }
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  public DateTime? DueDate { get; set; }
  public string? Description { get; set; }

}