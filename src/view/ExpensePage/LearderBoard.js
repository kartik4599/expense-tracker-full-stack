import axios from "axios";
import React, { useEffect, useState } from "react";
import "./leaderboder.css";

const LearderBoard = () => {
  const [data, setData] = useState([]);
  const [see, setSee] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/premium/leaderboard");
      console.log(res.data);
      setData(res.data);
    };
    getData();
  }, []);

  return (
    <>
      {data.length === 0 && <div className="card">No leader Board Data</div>}
      {data.length > 0 && (
        <div className="card">
          <div
            className="titleSection"
            onClick={() => {
              setSee(!see);
            }}>
            <h3>Leader Board</h3>
            {!see && <h2>&darr;</h2>}
            {see && <h2>&uarr;</h2>}
          </div>

          {see &&
            data.map((e) => {
              return (
                <div key={e.name} className="list-section">
                  <div>
                    <h3>Name - {e.name}</h3>
                  </div>
                  <div>
                    <h4>Total Expense</h4>
                    <h4>$ {e.expense}</h4>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default LearderBoard;
