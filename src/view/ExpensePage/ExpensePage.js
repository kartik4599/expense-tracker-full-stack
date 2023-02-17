import { useEffect, useRef, useState } from "react";
import "./expense.css";
import axios from "axios";
import LearderBoard from "./LearderBoard";
import ExpenseTable from "./ExpenseTable";

const ExpensePage = ({ isPremium, totalCount }) => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentPage, setcurrentPage] = useState(0);
  const [pageNo, setpageNo] = useState(0);
  const [currentSize, setcurrentSize] = useState(
    localStorage.getItem("size") ? parseInt(localStorage.getItem("size")) : 5
  );

  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `/getExpense/${currentPage}/${currentSize}`,
          {
            headers: { auth: localStorage.getItem("login") },
          }
        );
        console.log(res.data);
        setData(res.data);
        console.log(totalCount, currentSize);
        const number = Math.ceil(totalCount / currentSize);
        setpageNo(number);
        console.log(number);
      } catch (e) {}
    };
    getData();
  }, [currentPage, currentSize, totalCount]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const sendData = {
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      };
      setData([sendData, ...data]);
      const res = await axios.post("/addExpense", sendData, {
        headers: { auth: localStorage.getItem("login") },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHandler = async (id) => {
    const newData = data.filter((e) => e.id !== id);
    setData(newData);
    const res = await axios.delete(`/delete/${id}`, {
      headers: { auth: localStorage.getItem("login") },
    });
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
    const res = await axios.patch(`/update/${update}`, sendData, {
      headers: { auth: localStorage.getItem("login") },
    });
    console.log(res.data);
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

  const sizeHandler = (value) => {
    setcurrentSize(value);
    localStorage.setItem("size", value);
  };

  return (
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
        {data.length > 0 && (
          <>
            <ExpenseTable
              data={data}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              sizeHandler={sizeHandler}
              currentSize={currentSize}
            />
            <div className="pageCount">
              {1 < currentPage && (
                <>
                  <button
                    className="elseButton"
                    onClick={() => {
                      setcurrentPage(0);
                    }}>
                    1
                  </button>
                  <span>......</span>
                </>
              )}
              {Array.apply(null, Array(pageNo)).map((e, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setcurrentPage(i);
                    }}
                    className={
                      currentPage === i
                        ? "pagebutton"
                        : currentPage - 1 === i || currentPage + 1 === i
                        ? "elseButton"
                        : "hideButton"
                    }>
                    {i + 1}
                  </button>
                );
              })}
              {pageNo > currentPage + 2 && (
                <>
                  <span>......</span>
                  <button
                    className="elseButton"
                    onClick={() => {
                      setcurrentPage(pageNo - 1);
                    }}>
                    {pageNo}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      {isPremium && <LearderBoard />}
      <div className="blob"></div>
    </div>
  );
};

export default ExpensePage;
