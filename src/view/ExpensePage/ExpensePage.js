import { useEffect, useRef, useState } from "react";
import "./expense.css";
import axios from "axios";

const ExpensePage = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/getExpense");
        console.log(res.data);
        setData(res.data);
      } catch (e) {}
    };
    getData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      };
      setData([sendData, ...data]);
      const res = await axios.post("/addExpense", sendData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = async (id) => {
    const newData = data.filter((e) => e.id !== id);
    setData(newData);
    const res = await axios.delete(`/delete/${id}`);
    console.log(res);
  };

  const updateHandler = (id) => {
    console.log(id);
    const item = data.filter((e) => e.id === id);
    amountRef.current.value = item[0].amount;
    descriptionRef.current.value = item[0].description;
    categoryRef.current.value = item[0].category;
    setUpdate(id);
  };

  const updatePush = async (e) => {
    e.preventDefault();
    console.log("patch");
    const sendData = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    const res = await axios.patch(`/update/${update}`, sendData);
    const newData = data.map((e) => {
      if (e.id === update) {
        return {
          ...e,
          amount: amountRef.current.value,
          description: descriptionRef.current.value,
          category: categoryRef.current.value,
        };
      }
      return e;
    });
    setData(newData);
    setUpdate(false);
  };

  console.log("update=>", update);

  return (
    <>
      <div className="container">
        <div className="card">
          <h1 className="title">Add Expenses </h1>
          <form
            onSubmit={update ? updatePush : submitHandler}
            className="expenseForm">
            <label htmlFor="amount">Amount</label>
            <input
              ref={amountRef}
              type="number"
              placeholder="enter expense amount "
              id="amount"
              required
            />
            <label htmlFor="description">Description</label>
            <input
              ref={descriptionRef}
              type="text"
              placeholder="enter expense description "
              id="username"
              required
            />
            <label htmlFor="category">Category</label>
            <input
              placeholder="select category "
              ref={categoryRef}
              list="category"
              id="Category"
              required
            />
            <datalist id="category">
              <option value="Home"></option>
              <option value="Electricity"></option>
              <option value="Food"></option>
              <option value="Petrol"></option>
              <option value="Entertainment"></option>
            </datalist>
            <button type="submit" className="btn">
              {update ? "Update" : "Add Expense"}
            </button>
            {update && (
              <button
                onClick={() => {
                  setUpdate(false);
                }}
                type=""
                className="btn">
                Add New Expense
              </button>
            )}
          </form>
        </div>
        <div className="expenseList">
          {data.length === 0 && <div className="card">No Expenses Added</div>}
          {data.length !== 0 &&
            data.map((e, i) => {
              const date = new Date(e.updatedAt);
              return (
                <div key={e.id} className="listContainer">
                  <div className="card">
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
        <div className="blob"></div>
      </div>
    </>
  );
};

export default ExpensePage;
