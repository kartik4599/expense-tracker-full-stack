import React from "react";

const ExpenseTable = ({ data, updateHandler, deleteHandler }) => {
  return (
    <div className="expenseCardBG">
      <h3>Expense List</h3>
      {data.length !== 0 &&
        data.map((e, i) => {
          const date = new Date(e.updatedAt);
          return (
            <div key={e.id} className="listContainer">
              <div className="expenseCard">
                <div className="list">
                  <div>
                    <h3>
                      {i + 1}. {e.description}
                    </h3>
                    <h4>${e.amount} </h4>
                  </div>
                  <div>
                    <h4>{e.category}</h4>
                    <p>
                      last updated on{" "}
                      {`${date.getDate()}-${
                        date.getMonth() + 1
                      }-${date.getFullYear()}`}
                    </p>
                  </div>
                  <span>
                    <button onClick={updateHandler.bind(null, e.id)}>
                      Update
                    </button>
                    <button onClick={deleteHandler.bind(null, e.id)}>
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ExpenseTable;
