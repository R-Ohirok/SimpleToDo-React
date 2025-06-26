import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/todos';
import type { ToDoType } from '../types';

// type useTodosType = {
//   todos: ToDoType[];
//   setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
//   isLoading: boolean;
// };

const useTodos = () => {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<ToDoType[]>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  return {
    todos: data,
    isLoading,
    isError,
    refetch,
  };
};

export default useTodos;

// const useTodos = (): useTodosType => {
//   const [todos, setNewTodos] = useState<ToDoType[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await getTodos();

//         setNewTodos(data as ToDoType[]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   const setTodos = useCallback((value: React.SetStateAction<ToDoType[]>) => {
//     setNewTodos(value);
//   }, []);

//   return { todos, setTodos, isLoading };
// };

// export default useTodos;
