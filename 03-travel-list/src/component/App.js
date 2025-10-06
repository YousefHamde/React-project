import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item])
    }

    function handleDeleteItem(id) {
        setItems(items => items.filter(item => item.id !== id))
    }

    function handlePackedItem(id) {
        setItems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
    }

    function handleClearList() {
        const confirm = window.confirm("Are you sure you want to delete all items?")

        if (confirm) setItems([])
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItems} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} onPackedItem={handlePackedItem} onClearList={handleClearList} />
            <Stats items={items} />
        </div>
    )
}
