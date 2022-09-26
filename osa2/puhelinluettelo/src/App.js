import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 0 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 1 },
    { name: "Dan Abramov", number: "12-43-234345", id: 2 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 3 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (
      !persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    } else {
      window.alert(`${newName} is already added to the phonebook`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addNote}
        nameInputValue={newName}
        onNameChange={handleNameChange}
        numberInputValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person person={person} />
      ))}
    </div>
  );
};

const FilterForm = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name:{" "}
        <input value={props.nameInputValue} onChange={props.onNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.numberInputValue} onChange={props.onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = (props) => {
  return (
    <p key={props.person.id}>
      {props.person.name} {props.person.number}
    </p>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => (
        <Person person={props.person} />
      ))}
    </div>
  );
};

export default App;
