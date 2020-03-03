import React from "react";
import "./home.css";

export default function Home() {
  const goTo = link => {
    window.location.href = "./" + link;
  };

  return (
    <div className="container" id="Home">
      <header>
        <h1>Hello, Where would you like to go?</h1>
      </header>
      <div id="functionalties">
        <section id="journalTile" onClick={goTo.bind(this, "journal")}>
          <h2>Journal</h2>
        </section>
        <section id="todoTile" onClick={goTo.bind(this, "todo")}>
          <h2>Todo</h2>
        </section>
        <section id="moreTile" onClick={goTo.bind(this, "")}>
          <h2>More...</h2>
        </section>
      </div>
    </div>
  );
}
