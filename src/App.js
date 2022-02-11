import { useEffect, useState } from "react";
import "./styles.css";
import Lottie from "react-lottie";
import * as animationData from "./animation.json";

const AUTH_TOKEN = "YOUR_AUTH_TOKEN";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AUTH_TOKEN
      }
    })
      .then((response) => {
        console.error("status code", response.status);
        if (response.status === 200) {
          response.json().then((res) => {
            setData(res);
          });
        }
        if (response.status === 204) {
          return <h5>Not vibing</h5>;
        }
      })
      .catch((error) => {
        setData(null);
        console.error("nw Error:", error);
      });
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  if (data == null) {
    return <h5>Error - {error}</h5>;
  } else {
    return (
      <div className="App">
        <h2>
          I'm Currently Vibing to{" "}
          <span aria-label="music" role="img">
            🎶
          </span>
        </h2>
        <div className="container">
          <a
            rel="noreferrer"
            target="_blank"
            href={data.item.external_urls.spotify}
          >
            <img
              className="cover"
              alt="Album Cover"
              src={data.item.album.images[0].url}
            />
          </a>
          <Lottie className="lottie" options={defaultOptions} height={200} />
        </div>
        <div className="details">
          <h3 style={{ margin: "10px" }}>
            {data.item.name} - {data.item.artists[0].name}
          </h3>
        </div>
      </div>
    );
  }
}
