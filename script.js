const PASSWORD = "dushman";

const pages = [...document.querySelectorAll(".page")];
const counter = document.getElementById("counter");
let currentPage = 0;
let finalStarted = false;

function showPage(id) {
  pages.forEach(page => page.classList.remove("active"));
  const next = document.getElementById(id);
  next.classList.add("active");

  currentPage = pages.indexOf(next);

  counter.textContent = `${currentPage + 1} / ${pages.length}`;

  counter.style.display = id === "final" ? "none" : "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (id === "final" && !finalStarted) {
    finalStarted = true;
    createStars();
    runFinal();
  }
}

function unlock() {
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");

  if (input.value.trim().toLowerCase() === PASSWORD) {
    error.textContent = "";
    showPage("intro");
  } else {
    error.textContent = "wrong password, chaman.";

    input.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" }
      ],
      {
        duration: 320
      }
    );
  }
}

document
  .getElementById("unlockBtn")
  .addEventListener("click", unlock);

document
  .getElementById("passwordInput")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      unlock();
    }
  });

document.querySelectorAll(".next").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.next);
  });
});

/* ===========================
   ENVELOPES
=========================== */

const envelopes = [
  ...document.querySelectorAll(".envelope")
];

const envelopesNext =
  document.getElementById("envelopesNext");

const openedEnvelopes = new Set();

envelopes.forEach((envelope, index) => {

  const button =
    envelope.querySelector("button");

  const letter =
    envelope.querySelector(".letter");

  button.addEventListener("click", () => {

    if (envelope.classList.contains("open")) {
      envelope.classList.remove("open");
      return;
    }

    envelope.classList.add("open");

    letter.textContent =
      envelope.dataset.message;

    openedEnvelopes.add(index);

    if (
      openedEnvelopes.size ===
      envelopes.length
    ) {
      setTimeout(() => {
        envelopesNext.classList.remove(
          "hidden"
        );
      }, 300);
    }
  });
});

/* ===========================
   HOPE PAGE
=========================== */

const hopeButtons = [
  ...document.querySelectorAll(".hope")
];

const openedHope = new Set();

const hopeNote =
  document.getElementById("hopeNote");

const hopeFinal =
  document.getElementById("hopeFinal");

const hopeNext =
  document.getElementById("hopeNext");

hopeButtons.forEach((button, index) => {

  button.addEventListener("click", () => {

    button.classList.add("revealed");

    button.textContent =
      button.dataset.icon;

    hopeNote.innerHTML = `
      <span class="tape small-tape"></span>
      <p>${button.dataset.text}</p>
    `;

    openedHope.add(index);

    if (
      openedHope.size ===
      hopeButtons.length
    ) {

      setTimeout(() => {

        hopeFinal.classList.remove(
          "hidden"
        );

        hopeNext.classList.remove(
          "hidden"
        );

      }, 250);

    }

  });

});
/* ===========================
   GAME TABS
=========================== */

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => {
      item.classList.remove("active");
    });

    document.querySelectorAll(".game").forEach((game) => {
      game.classList.remove("active");
    });

    tab.classList.add("active");

    document
      .getElementById(tab.dataset.game)
      .classList.add("active");
  });
});

/* ===========================
   GAME COMPLETION
=========================== */

const wins = {
  f1: false,
  football: false,
  cricket: false
};

const allWins =
  document.getElementById("allWins");

const gamesNext =
  document.getElementById("gamesNext");

function checkAllWins() {
  if (
    wins.f1 &&
    wins.football &&
    wins.cricket
  ) {
    allWins.classList.remove("hidden");
    gamesNext.classList.remove("hidden");

    allWins.animate(
      [
        {
          transform: "scale(0.8) rotate(-3deg)",
          opacity: 0
        },
        {
          transform: "scale(1.08) rotate(2deg)",
          opacity: 1
        },
        {
          transform: "scale(1) rotate(0)",
          opacity: 1
        }
      ],
      {
        duration: 650,
        easing: "ease-out"
      }
    );
  }
}

/* ===========================
   F1 GAME
=========================== */

const f1Car =
  document.getElementById("f1Car");

const lapCount =
  document.getElementById("lapCount");

const f1Result =
  document.getElementById("f1Result");

let laps = 0;

f1Car.addEventListener("click", () => {
  if (wins.f1) {
    return;
  }

  laps += 1;

  lapCount.textContent =
    `${laps} / 3 laps`;

  const positions = [
    "33%",
    "60%",
    "81%"
  ];

  const messages = [
    "lap one: still alive.",
    "lap two: somehow no disaster.",
    "podium. max would approve."
  ];

  f1Car.style.left =
    positions[laps - 1];

  f1Result.textContent =
    messages[laps - 1];

  f1Result.animate(
    [
      {
        opacity: 0,
        transform: "translateY(8px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ],
    {
      duration: 420,
      easing: "ease-out"
    }
  );

  if (laps === 3) {
    wins.f1 = true;

    f1Car.animate(
      [
        {
          transform:
            "translateY(-50%) scaleX(-1) rotate(0)"
        },
        {
          transform:
            "translateY(-68%) scaleX(-1) rotate(-8deg)"
        },
        {
          transform:
            "translateY(-50%) scaleX(-1) rotate(0)"
        }
      ],
      {
        duration: 600,
        easing: "ease-out"
      }
    );

    createConfetti(
      f1Car,
      ["🏁", "✨", "🏆"]
    );

    checkAllWins();
  }
});

/* ===========================
   FOOTBALL GAME
=========================== */

const footballBall =
  document.getElementById("footballBall");

const goalCount =
  document.getElementById("goalCount");

const crowdText =
  document.getElementById("crowdText");

const footballResult =
  document.getElementById(
    "footballResult"
  );

let goalTaps = 0;

footballBall.addEventListener(
  "click",
  () => {
    if (wins.football) {
      return;
    }

    goalTaps += 1;

    goalCount.textContent =
      `${goalTaps} / 2 taps`;

    if (goalTaps === 1) {
      footballBall.style.left = "45%";
      footballBall.style.bottom = "95px";
      footballBall.style.transform =
        "rotate(360deg)";

      crowdText.textContent =
        "one more tap";

      crowdText.animate(
        [
          {
            transform:
              "translateX(-50%) scale(0.8)",
            opacity: 0
          },
          {
            transform:
              "translateX(-50%) scale(1.1)",
            opacity: 1
          },
          {
            transform:
              "translateX(-50%) scale(1)",
            opacity: 1
          }
        ],
        {
          duration: 450
        }
      );
    } else {
      footballBall.style.left = "78%";
      footballBall.style.bottom = "92px";
      footballBall.style.transform =
        "rotate(760deg) scale(.78)";

      crowdText.textContent =
        "GOOOOOAL";

      footballResult.textContent =
        "madrid survived. everybody breathe.";

      wins.football = true;

      createConfetti(
        footballBall,
        ["⚽", "🤍", "✨"]
      );

      checkAllWins();
    }
  }
); 
/* ===========================
   CRICKET GAME
=========================== */

const cricketBall =
  document.getElementById("cricketBall");

const shotCount =
  document.getElementById("shotCount");

const cricketResult =
  document.getElementById("cricketResult");

const stumps =
  document.querySelector(".ground .stumps");

let shotTaps = 0;

cricketBall.addEventListener("click", () => {

  if (wins.cricket) {
    return;
  }

  shotTaps++;

  shotCount.textContent =
    `${shotTaps} / 2 taps`;

  if (shotTaps === 1) {

    cricketBall.style.left = "48%";
    cricketBall.style.bottom = "104px";

    cricketResult.textContent =
      "timing...";

    cricketBall.animate(
      [
        {
          transform: "scale(1)"
        },
        {
          transform: "scale(1.35)"
        },
        {
          transform: "scale(1)"
        }
      ],
      {
        duration: 350
      }
    );

  } else {

    cricketBall.style.left = "86%";
    cricketBall.style.bottom = "170px";
    cricketBall.style.transform =
      "scale(.75)";

    stumps.style.transform =
      "rotate(16deg)";

    cricketResult.textContent =
      "SIX. virat behaviour.";

    wins.cricket = true;

    createConfetti(
      cricketBall,
      ["🏏", "✨", "💥"]
    );

    checkAllWins();

  }

});

/* ===========================
   CUTE CONFETTI
=========================== */

function createConfetti(element, emojis) {

  const rect =
    element.getBoundingClientRect();

  for (let i = 0; i < 18; i++) {

    const piece =
      document.createElement("span");

    piece.textContent =
      emojis[
        Math.floor(
          Math.random() *
          emojis.length
        )
      ];

    piece.style.position = "fixed";

    piece.style.left =
      rect.left + rect.width / 2 + "px";

    piece.style.top =
      rect.top + rect.height / 2 + "px";

    piece.style.fontSize =
      18 + Math.random() * 14 + "px";

    piece.style.pointerEvents =
      "none";

    piece.style.zIndex = 9999;

    document.body.appendChild(piece);

    const x =
      (Math.random() - 0.5) * 260;

    const y =
      -100 - Math.random() * 120;

    piece.animate(
      [
        {
          transform:
            "translate(0,0) rotate(0deg)",
          opacity: 1
        },
        {
          transform:
            `translate(${x}px,${y}px) rotate(${Math.random()*720}deg)`,
          opacity: 1
        },
        {
          transform:
            `translate(${x}px,${y+150}px) rotate(${Math.random()*1080}deg)`,
          opacity: 0
        }
      ],
      {
        duration: 1800,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      piece.remove();
    }, 1800);

  }

}

/* ===========================
   STICKERS
=========================== */

document
.querySelectorAll(
".doodle, .float, .badge"
)
.forEach((item) => {

  item.addEventListener(
    "click",
    () => {

      item.animate(
        [
          {
            transform:
              "scale(1)"
          },
          {
            transform:
              "scale(1.35) rotate(-10deg)"
          },
          {
            transform:
              "scale(.95) rotate(8deg)"
          },
          {
            transform:
              "scale(1)"
          }
        ],
        {
          duration: 520
        }
      );

    }
  );

});
/* ===========================
   FINAL PAGE HELPERS
=========================== */

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function createStars() {
  const starsContainer =
    document.getElementById("stars");

  if (!starsContainer) {
    return;
  }

  if (starsContainer.children.length > 0) {
    return;
  }

  const numberOfStars =
    window.innerWidth < 700
      ? 70
      : 130;

  for (
    let i = 0;
    i < numberOfStars;
    i++
  ) {
    const star =
      document.createElement("span");

    star.className = "star";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;

    star.style.animationDelay =
      `${Math.random() * 2.5}s`;

    star.style.animationDuration =
      `${1.6 + Math.random() * 2.5}s`;

    const size =
      1 + Math.random() * 2.2;

    star.style.width =
      `${size}px`;

    star.style.height =
      `${size}px`;

    starsContainer.appendChild(star);
  }
}

/* ===========================
   FINAL GOODBYE SEQUENCE
=========================== */

async function runFinal() {
  const firstLines = [
    ...document.querySelectorAll(
      ".final-lines p"
    )
  ];

  const phaseTwo =
    document.querySelector(
      ".phase-two"
    );

  const goodbye =
    document.querySelector(
      ".goodbye"
    );

  const shootingStar =
    document.querySelector(
      ".shooting-star"
    );

  const signature =
    document.querySelector(
      ".signature"
    );

  await wait(700);

  for (const line of firstLines) {
    line.classList.add("show");

    await wait(1250);
  }

  await wait(1700);

  firstLines.forEach((line) => {
    line.style.transition =
      "opacity 1.1s ease";

    line.style.opacity = "0";
  });

  await wait(1250);

  phaseTwo.classList.add("show");

  const phaseTwoLines =
    phaseTwo.querySelectorAll("p");

  phaseTwoLines.forEach(
    (line, index) => {
      line.style.animationDelay =
        `${index * 1.4}s`;
    }
  );

  await wait(4300);

  phaseTwoLines.forEach((line) => {
    line.style.transition =
      "opacity 1.1s ease";

    line.style.opacity = "0";
  });

  await wait(1300);

  goodbye.classList.add("show");

  await wait(2600);

  shootingStar.classList.add("go");

  await wait(2200);

  signature.classList.add("show");
}
