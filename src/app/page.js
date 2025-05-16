// ===== Next.js 客戶端組件聲明 =====
'use client';
/* 
  'use client' 指令告訴Next.js這是一個客戶端組件
  這允許我們使用React的互動特性，如：
  - useState, useEffect 等 Hooks
  - onClick 等事件處理器
  - 瀏覽器API
*/

// ===== 模組導入 =====

import Link from "next/link";

// React的useState Hook用於狀態管理
import { useEffect,useState } from "react";

// 導入自定義組件，使用@表示從根目錄開始的絕對路徑
// @ 是Next.js的路徑別名，指向src目錄
import TaskList from "@/components/TaskList";

// ===== 組件定義 =====
// Next.js中，app/page.js是默認路由頁面，對應網站的根路徑'/'
export default function Home() {
  // ===== React Hooks使用 =====
  // useState Hook的基本語法：const [狀態, 設定狀態的函數] = useState(初始值)
  
  // 任務列表狀態管理
  // 示例：tasks = ['學習React', '學習Next.js']
  const [tasks,setTasks] = useState([]);
  
  // 新任務輸入框狀態管理
  // 示例：newTask = '完成作業'
  const [newTask,setNewTask] = useState('');

  const [nextId,setNextId]=useState(1);
  // ===== 事件處理函數 =====
  useEffect(() => {
    const saveTasks=JSON.parse(localStorage.getItem('tasks'))||[];
    setTasks(saveTasks);
    const maxId=saveTasks.reduce((max,task)=>Math.max(max,task.id),0);
    setNextId(maxId+1);
  },[]);
  const handleDelete=(taskId)=>{
    const index = tasks.findIndex(task => task.id === taskId);
    const updateTasks =tasks.filter((_,i)=>i!==index);
    setTasks(updateTasks);
    console.log("After:",updateTasks);
    localStorage.setItem('tasks',JSON.stringify(updateTasks));
  }
  
  const addTask=()=>{
    // 開發時的狀態追踪在console中輸出
    console.log("Before:",tasks);
    console.log("NewTask:",newTask);
    const newTaskObj={// 創建新任務對象
      // 使用nextId作為任務ID
      // 這樣可以確保每個任務都有唯一的ID
      // ID是數字類型，從1開始遞增
      id:nextId,
      title:newTask,
      description:''
    };
    // 使用展開運算符(...)創建新數組
    // 示例：如果 tasks = ['任務1'] 且 newTask = '任務2'
    // 則 updateTasks = ['任務1', '任務2']
    const updateTasks=[...tasks,newTaskObj];
    
    // 更新狀態，React會重新渲染組件
    setTasks(updateTasks);
    console.log("After:",updateTasks);
    
    // 重置輸入框
    setNewTask('');
    setNextId(nextId+1);// 更新下一個任務ID
    localStorage.setItem('tasks',JSON.stringify(updateTasks));
    // 將任務列表存儲到本地存儲
  }

  // ===== JSX 模板渲染 =====
  return (
    // Tailwind CSS類名使用示例：
    // p-4: padding: 1rem
    <main className="p-4 max-w-md mx-auto">
      {/* 標題區塊 */}
      <h1 className="text-4xl font-blod">Task Board</h1>

      {/* 輸入區塊：使用flex布局 */}
      <div className="flex gap-2 mb-4">
        {/* 
          受控輸入組件：
          - value綁定到state
          - onChange事件更新state
          示例：輸入"Hello"會觸發setNewTask("Hello")
        */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
         
          onChange={(e)=>setNewTask(e.target.value)}
        />

        {/* 
          按鈕事件處理：
          onClick={函數名} 或 onClick={() => 函數()}
        */}
        <button 
          className="bg-blue-500 text-while px-4"
          onClick={addTask}
        >
          Add task
        </button>
      </div>

      {/* 
        組件Props傳遞：
        - 父組件向子組件傳遞數據
        - 語法：<組件名 屬性名={值}>
        示例：如果tasks=['任務1', '任務2']
        則TaskList組件會收到這個數組作為props.task
      */}
      <TaskList tasks={tasks} onDelete={handleDelete}/>
    </main>
  );
}
