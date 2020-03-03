import React, { useState, useEffect } from "react";
import "./journal.css";
import axios from "axios";

import Modal from "react-modal";
import { baseUrl } from "../constants/Constants";

export default function Journal() {
  const [journalEntries, setJournalEntries] = useState({});
  const [active, setActive] = useState(0);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [shouldRefresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get(baseUrl + "journal/all").then(res => {
      setJournalEntries(res.data.journalEntries);
    });
  }, [shouldRefresh]);

  const addNewEntry = refresh => {
    const journalEntry = document.getElementById("addEntry").value;
    axios
      .post(baseUrl + "journal", { journalEntry })
      .then(res => {
        if (res.data.ok === 1) {
          setRefresh(shouldRefresh + 1);
          setAddModalIsOpen(false);
          if (refresh) {
            window.location.reload();
          }
        }
      })
      .catch(err => console.log(err));
  };

  const updateJournalEntry = () => {
    const journalEntry = document.getElementById("editEntry").value;
    axios
      .patch(baseUrl + "journal/" + journalEntries[active]._id, {
        journalEntry
      })
      .then(res => {
        if (res.data.ok === 1) {
          setRefresh(shouldRefresh + 1);
          setEditModalIsOpen(false);
        }
      })
      .catch(err => console.log(err));
  };

  const deleteJournalEntry = () => {
    axios
      .delete(baseUrl + "journal/" + journalEntries[active]._id)
      .then(res => {
        if (res.data.ok === 1) {
          setRefresh(shouldRefresh + 1);
          if (active === journalEntries.length - 1) {
            setActive(active - 1);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const goToPrev = () => {
    if (active !== 0) {
      setActive(active - 1);
    }
  };

  const goToNext = () => {
    if (active !== journalEntries.length - 1) {
      setActive(active + 1);
    }
  };

  if (journalEntries[active] !== undefined) {
    return (
      <div className="container" id="journal">
        <div>
          <button onClick={() => setAddModalIsOpen(true)}>
            Add a new journal entry
          </button>
        </div>
        <header>
          <button className="Btn" id="PrevBtn" onClick={goToPrev}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div>
            <h1>Dated: {journalEntries[active].dateOfCreation.slice(0, 10)}</h1>
          </div>
          <button className="Btn" id="NextBtn" onClick={goToNext}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </header>
        <section>
          <textarea value={journalEntries[active].journalEntry} disabled />
        </section>
        <footer>
          <span>
            Last Modified: {journalEntries[active].dateModified.slice(0, 10)}
          </span>
          <button disabled className="journalBtns">
            Archive
          </button>
          <button
            className="deleteBtn journalBtns"
            onClick={deleteJournalEntry}
          >
            Delete
          </button>
          <button
            className="editBtn journalBtns"
            onClick={() => setEditModalIsOpen(true)}
          >
            Edit
          </button>
          <button disabled className="journalBtns">
            Jump to entry
          </button>
        </footer>
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          ariaHideApp={false}
        >
          <header id="editTitle">
            <h1>{journalEntries[active].dateOfCreation.slice(0, 10)}</h1>
          </header>
          <textarea
            id="editEntry"
            defaultValue={journalEntries[active].journalEntry}
          />
          <footer id="editFooter">
            <button onClick={updateJournalEntry}>Update</button>
          </footer>
        </Modal>
        <Modal
          isOpen={addModalIsOpen}
          onRequestClose={closeAddModal}
          ariaHideApp={false}
        >
          <textarea id="addEntry" />
          <footer style={{ display: "flex", justifyContent: "flex-end" }}>
            <button id="addEntryButton" onClick={addNewEntry.bind(this, false)}>
              Add
            </button>
          </footer>
        </Modal>
      </div>
    );
  } else if (journalEntries.length === 0) {
    return (
      <div className="container" id="emptyJournal">
        <header>
          <h1>You have a clean slate. Let's write something</h1>
        </header>
        <div>
          <button onClick={() => setAddModalIsOpen(true)}>Add</button>
        </div>
        <Modal
          isOpen={addModalIsOpen}
          onRequestClose={closeAddModal}
          ariaHideApp={false}
        >
          <textarea
            id="addEntry"
            placeholder="This is your first journal entry. Get started with writing"
          />
          <footer
            id="addFooter"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button id="addEntryButton" onClick={addNewEntry.bind(this, true)}>
              Start
            </button>
          </footer>
        </Modal>
      </div>
    );
  } else {
    return <div></div>;
  }
}
