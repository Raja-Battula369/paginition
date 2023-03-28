import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [pageSkip, setPageSkip] = useState(1);
  // const [pageLimit, setPageLimit] = useState(10);
  const btns = Array(10)
    .fill()
    .map((v, i) => i + 1);
  // console.log(pageSkip);

  const FetchHandler = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${pageSkip}`
    );
    const data = await res.json();
    setProducts(data.products);
  };
  useEffect(() => {
    FetchHandler();
  }, [pageSkip]);

  return (
    <div className="App">
      <span>products</span>
      <div className="main">
        {products.length > 0 &&
          products.map((prod, inx) => (
            <div key={inx}>
              <div className="product__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title} </span>
              </div>
            </div>
          ))}
      </div>
      {products.length > 0 && (
        <>
          <button onClick={() => pageSkip > 1 && setPageSkip(pageSkip - 1)}>
            {" "}
            ⏮️
          </button>
          {btns.map((ele, i) => (
            <button
              className={ele * 1 === pageSkip ? "addSel" : ""}
              key={i}
              onClick={() => setPageSkip(ele)}
            >
              {ele}{" "}
            </button>
          ))}
          <button onClick={() => pageSkip < 10 && setPageSkip(pageSkip + 1)}>
            ⏭️
          </button>
        </>
      )}
    </div>
  );
}
