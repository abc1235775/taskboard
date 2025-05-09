'use client';

import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";

export default function TaskDetailPage({params}) 
{
    const router = useRouter();
    const { id } = params; // 取得路由參數id
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSave =()=>{
        const saveTasks =JSON.parse(localStorage.getItem('tasks'))||[];// 取得任務列表
        const updateTasks =saveTasks.map((task)=>
            task.id === Number(id) ? {...task, title, description} : task
        // 更新任務列表
        // 如果任務的id與當前id相同，則更新任務的標題和描述否則返回原任務
        // 使用map方法遍歷任務列表，返回新的任務列表
        // 使用箭頭函數簡化語法
        // 使用展開運算符(...)創建新對象，保留原有屬性
        // 並更新title和description屬性
        // 使用Number()將id轉換為數字類型，因為路由參數是字符串類型
        // 使用JSON.parse()將字符串轉換為JavaScript對象
        // 使用localStorage.getItem()從本地存儲中獲取字符串
        );
        localStorage.setItem('tasks', JSON.stringify(updateTasks));
        router.push('/'); // 導向首頁
    }
    useEffect(() => {
        const saveTasks = JSON.parse(localStorage.getItem('tasks')) || []; // 取得任務列表
        const task = saveTasks.find((t) => t.id === Number(id)); // 根據id查找任務
        if (task) {
            setTitle(task.title); // 設置標題
            setDescription(task.description); // 設置描述
        }
    }, [id]); // 當id改變時重新執行
    return (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
            <input 
                className="border p-2 w-full mb-2" vlaue={title} 
                onChange={(e)=>setTitle(e.target.vlaue)}
                placeholder="Title"
            />
            <texrarea 
                className="border p-2 w-full mb-4" value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Description"
                row={4}
            />
            <button 
                className="bg-green-500 text-white px-4 py-2"
                onclick={handleSave}
            >
                Save
            </button>
        </main>    
    );
}