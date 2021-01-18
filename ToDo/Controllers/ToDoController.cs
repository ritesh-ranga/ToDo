using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using ToDo.Model;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : Controller
    {
        private readonly TodoContext _context;

        public ToDoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<TodoItem> Get()
        {
            return _context.TodoItems.ToList();
        }

        [HttpPost]
        public List<TodoItem> CreateTask(TodoItem TodoItemToBeCreated)
        {
            int maxID = 0;

            if (_context.TodoItems.Count() > 0)
                maxID = _context.TodoItems.ToList().Max(todo => todo.ID) + 1;
            else
                maxID = 1;

            _context.TodoItems.Add(new TodoItem 
                                    { 
                                        ID = maxID, 
                                        Name = TodoItemToBeCreated.Name, 
                                        DueDate = TodoItemToBeCreated.DueDate, 
                                        IsComplete = false 
                                    });

            _context.SaveChanges();

            return _context.TodoItems.ToList();
        }

        [HttpDelete("{ToDoID}")]
        public List<TodoItem> DeleteTodoItem(int ToDoID)
        {
            TodoItem todoItem = _context.TodoItems.Find(ToDoID);

            if (todoItem != null)
            {
                _context.TodoItems.Remove(todoItem);
                _context.SaveChanges();
            }

            return _context.TodoItems.ToList();
        }

        [HttpPut("{ToDoID}")]
        public List<TodoItem> UpdateTodoItem(int ToDoID)
        {
            TodoItem todoItem = _context.TodoItems.Find(ToDoID);

            if (todoItem != null)
            {
                todoItem.IsComplete = true;
                _context.SaveChanges();
            }

            return _context.TodoItems.ToList();
        }
    }
}
