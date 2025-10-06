import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onEvent }) {
  return (
    <button className="button" onClick={onEvent}>{children}</button>
  )
}

function App() {
  const [friends, setFriend] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  // const [showSplitBill, setShowSplitBill] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);



  function handelShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  // function handelShowSplitBill() {
  //   setShowSplitBill(!showSplitBill);
  // }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    console.log(selectedFriend)
    setShowAddFriend(false);
  }


  function handelAddFriend(friend) {
    setFriend((friends) => [...friends, friend])
    setShowAddFriend(false);
  }

  function handleSplitBill(amount) {
    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + amount } : friend
      )
    );
    setSelectedFriend(null);
  }



  return (
    <div className="app">
      <div className='sidebar'>
        <FriendList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handelAddFriend} />}
        <Button item={showAddFriend} onEvent={handelShowAddFriend} >{showAddFriend ? "Close" : "Add friend"}</Button>
      </div>
      {selectedFriend && <FormSplitBill onSplitBill={handleSplitBill} selectedFriend={selectedFriend} key={selectedFriend.id} />}
    </div>
  );
}

export default App;

function FriendList({ friends, onSelection, selectedFriend }) {

  return (
    <ul>
      {
        friends.map((friend, i) => <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />)
      }
    </ul>
  )
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  // console.log(isSelected, selectedFriend)

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="img" />
      <h3>{friend.name}</h3>
      {friend.balance > 0 ? (<p className="green">{friend.name} owes you  {Math.abs(friend.balance)}💲</p>) : friend.balance < 0 ? (<p className="red">you owe {friend.name} {Math.abs(friend.balance)}💲</p>) : (<p> You and {friend.name} are even </p>)}
      <Button onEvent={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  )
}



function FormAddFriend({ onAddFriend }) {
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  const [name, setName] = useState('');


  function handelSubmit(e) {
    e.preventDefault()

    if (!name || !image) return
    const id = crypto.randomUUID();

    const friend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(friend)
    setImage('https://i.pravatar.cc/48')
    setName('')
  }

  return (
    <form className="form-add-friend" onSubmit={handelSubmit}>
      <label>👫 Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>📸 Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({ onSplitBill, selectedFriend }) {
  const [myExpense, setMyExpense] = useState('');
  const [whoPay, setWhoPay] = useState('user');
  const [bill, setBill] = useState('');

  function handelSubmitSplit(e) {
    e.preventDefault();

    if (!bill || !myExpense) return;
    let balance = - ((bill / 2) - myExpense);
    // whoPay === 'user' ? balance =  - ((bill / 2) - myExpense) : balance = -myExpense;
    onSplitBill(balance)

    setMyExpense(0)
    setBill(0)
    setWhoPay('')
  }
  return (
    <form className="form-split-bill" onSubmit={handelSubmitSplit}>
      <h2>split a bill with sarah</h2>
      <label>💰Bill value</label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
      <label>🧍‍♀️ Your expense</label>
      <input type="text" value={myExpense} onChange={(e) => setMyExpense(Number(e.target.value))} />
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)} >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  )
}