const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disabled/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "e614ba096f8a41329f811f24625a7786",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // Text-to-speech
    tellMe(joke);

    // Disable button
    toggleButton();
  } catch (error) {
    console.error("fetch failed: ", error);
  }
}

// Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
