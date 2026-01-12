import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";
import Counter from "./Counter";

type Priority = 'Basse' | 'Moyenne' | 'Urgente';

type Todo = {
  id: number
  text: string
  priority: Priority
}


function App() {

  const [input, setInput] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('Moyenne');

  const savedTodos = localStorage.getItem('todos');
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [filter, setFilter] = useState<'Tous' | Priority>('Tous');

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  const urgentCount = todos.filter(todo => todo.priority === 'Urgente').length;
  const mediumCount = todos.filter(todo => todo.priority === 'Moyenne').length;
  const lowCount = todos.filter(todo => todo.priority === 'Basse').length;
  const totalCount = todos.length;


  let filteredTodos: Todo[] = [];

  if(filter === 'Tous'){
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    // vérifier que l'input n'est pas vide
    if(input.trim()== ""){
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInput('');
    setPriority('Moyenne');

    console.log(newTodos);
  }

  function deleteTodo(id: number) {
    alert("Voulez-vous vraiment supprimer cette tâche ?");
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setSelectedTodos(new Set());
  }

  function toggleSelectTodo(id: number) {
    const newSelectedTodos = new Set(selectedTodos);
    if(newSelectedTodos.has(id)){
      newSelectedTodos.delete(id);
    } else {
      newSelectedTodos.add(id);
    }
    setSelectedTodos(newSelectedTodos);
  }

  function finishSelected(){
    const newTodos = todos.filter((todo)=> !selectedTodos.has(todo.id));
    setTodos(newTodos);
    setSelectedTodos(new Set());
  }


  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Tâche à accomplir" 
            className="input input-bordered w-full" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select 
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button 
            className="btn btn-primary"
            onClick={addTodo}
          >
            Ajouter
          </button>
        </div>
        <div className="space-y-2 flex-1 h-fit">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <button 
                className={`btn btn-soft ${filter === 'Tous' ? 'btn-primary' : ''}`}
                onClick={() => setFilter('Tous')}
              >
                Tous ({totalCount})
              </button>
              <button 
                className={`btn btn-soft ${filter === 'Urgente' ? 'btn-primary' : ''}`}
                onClick={() => setFilter('Urgente')}
              >
                Urgente ({urgentCount})
              </button>
              <button 
                className={`btn btn-soft ${filter === 'Moyenne' ? 'btn-primary' : ''}`}
                onClick={() => setFilter('Moyenne')}
              >
                Moyenne ({mediumCount})
              </button>
              <button 
                className={`btn btn-soft ${filter === 'Basse' ? 'btn-primary' : ''}`}
                onClick={() => setFilter('Basse')}
              >
                Basse ({lowCount})
              </button>

            </div>
          
            <button 
              onClick={finishSelected}
              className="btn btn-primary"
              disabled={selectedTodos.size === 0}
            >
              Finir la sélection ({selectedTodos.size})
            </button>
          </div>
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem 
                    todo={todo}  
                    onDelete={()=>deleteTodo(todo.id)} 
                    isSelected={selectedTodos.has(todo.id)} 
                    onToggleSelect={() => toggleSelectTodo(todo.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div 
              className="flex justify-center items-center flex-col p-5"
            >
              <div>
                <Construction strokeWidth={1} className="w-40 h-40 text-primary"/>
              </div>
              <p className="text-sm">Aucune tâche pour ce filtre</p>
            </div>
          )}
        </div>

        <Counter />
      </div>
      
    </div>
  )
}

export default App
