import React, { useState } from "react";
import "./App.css";

const initList = [1, 2, 3, 4, 5, 6];
function App() {
  const [list, setList] = useState(initList);
  // 當我們開始drag，就要記住該drag的state
  const [draggedItem, setDraggedItem] = useState(null);

  function onDragStartHandle(e, index) {
    setDraggedItem(list[index]);
    // 讓移動更順
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }

  function onDragOverHandle(index) {
    const draggedOverItem = list[index];
    if (draggedOverItem === draggedItem) {
      return;
    }
    // 將移動的元素從items的array裡面去除
    const items = list.filter(item => item !== draggedItem);

    // 將移動的元素加入移入的位置splice(要移入/刪除的位置,要刪除的數量,要添加的新東西)
    items.splice(index, 0, draggedItem)
    // 更新items
    setList(items)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3>Drag and Drop Project</h3>
        <ul>
          {
            list.map((item, idx) => {
              return (
                <li key={idx} onDragOver={() => onDragOverHandle(idx)} className="item-style">
                  <div draggable onDragStart={(e) => onDragStartHandle(e, idx)}>{item}</div>
                </li>
              )
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
