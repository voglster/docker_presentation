import './App.css';
import {useState} from "react";

function App() {
    const [messages, setMessages] = useState([]);
    const loadData = () => {
        fetch('http://localhost:8005/get')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch((e) => {alert("Failed to get data")})
    }
    const handleDataChange = () => {
        loadData()
    }

    const clear = () => {
        fetch('http://localhost:8005/clear').then(loadData)
    }


    return (
        <div className="App">
            <header className="App-header">
                <MessageForm onSubmit={handleDataChange}/>
                <br/>
                <button onClick={loadData}>Reload</button>
                <button onClick={clear}>Clear</button>
                <MessageList messages={messages}/>
            </header>
        </div>
    );
}


const MessageForm = ({onSubmit}) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault()
        fetch('http://localhost:8005/save?msg=' + message).then(onSubmit)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
            </label>
            <input type="submit" value="Save Message"/>
        </form>
    );
}

const MessageList = ({messages}) => {
    return <ul>
        {messages.map(msg => <li key={msg.id}>{msg.msg}</li>)}
    </ul>
}

export default App;
