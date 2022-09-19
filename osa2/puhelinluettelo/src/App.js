import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    };

    if (
      !persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      setPersons(persons.concat(nameObject));
      setNewName("");
    } else {
      window.alert(`${newName} is already added to the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.id}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
