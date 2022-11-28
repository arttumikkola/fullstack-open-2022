import { useState, useEffect } from "react";
import nameService from "./services/names";
import "./App.css";

const FilterForm = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      filter shown with
      <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addPerson,
}) => {
  return (
    <form onSubmit={(e) => addPerson(e)}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ deleteName, persons, newFilter }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        .map((person) => (
          <div key={person.id}>
            <Person person={person} />
            <button onClick={() => deleteName(person.id, person.name)}>
              delete
            </button>
          </div>
        ))}
    </div>
  );
};

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }
  if (messageType === "success") {
    return <div className="success">{message}</div>;
  } else if (messageType === "error") {
    return <div className="error">{message}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const getPersons = async () => {
      await nameService.getAll().then((initialPersons) => {
        setPersons(initialPersons.db);
      });
    };
    getPersons();
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const nameObject = {
      name: getTitleCase(newName),
      number: newNumber,
    };

    const found = persons.find(
      (person) => person.name === getTitleCase(newName)
    );

    if (!found && (newNumber != null || newNumber != undefined)) {
      nameService.create(nameObject).then((returnedName) => {
        setPersons(persons.concat(returnedName));
        setNewName("");
        setNewNumber("");
        setMessageType("success");
        setMessage(`Added ${getTitleCase(newName)}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
    } else {
      try {
        if (
          window.confirm(
            `${newName} is already in your phonebook, do you want to replace the old number?`
          )
        ) {
          setPersons(updatePersons(nameObject));
          setNewName("");
          setNewNumber("");
          setMessageType("success");
          setMessage(`Updated ${getTitleCase(newName)}'s number`);
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        }
      } catch (err) {
        setMessageType("error");
        setMessage(err.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    }
  };

  const updatePersons = (obj, found) => {
    try {
      nameService.update(found.id, obj);
      const index = persons.findIndex((person) => {
        return person.id === found.id;
      });
      const persons2 = [...persons];
      persons2[index] = {
        id: found.id,
        name: obj.name,
        number: obj.number,
      };
      return persons2;
    } catch (err) {
      setMessageType("error");
      setMessage(
        `${getTitleCase(obj.name)} has already been deleted from the server.`
      );
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      setPersons(persons.filter((person) => person.id != found.id));
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${getTitleCase(name)} ?`)) {
      try {
        nameService.remove(id);
        setPersons(
          persons.filter((person) => {
            return person.id !== id;
          })
        );
        setMessageType("success");
        setMessage(`Deleted ${name}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } catch (err) {
        setMessageType("error");
        setMessage(err.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    }
  };

  function getTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    return titleCase;
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType} />
      <FilterForm filter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new name</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        newFilter={newFilter}
        persons={persons}
        deleteName={deletePerson}
      />
    </div>
  );
};

export default App;
