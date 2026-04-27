// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
  const [characters, setCharacters] = useState([]);

  return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
);

function removeOneCharacter(person) {
  deleteUser(person.id)
    .then((response) => {
      if (response.status === 204) {
        setCharacters(characters.filter((character) => character._id !== person._id));
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

function updateList(person) {
  postUser(person)
    .then((response) => {
      if (response.status === 201) {
        return response.json(); 
      }
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteUser(id) {
  const promise = fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  });
  return promise;
}


}

export default MyApp;
