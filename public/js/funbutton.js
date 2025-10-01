const btn = document.getElementById("cypher-btn");

    function scrambleText(element, newText) {
      const chars = "!<>-_\\/[]{}—=+*^?#________"; // pool of random glyphs
      const oldText = element.innerText;
      const length = Math.max(oldText.length, newText.length);
      let frame = 0;
      const queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ from, to, start, end, char: null });
      }

      function update() {
        let output = "";
        let complete = 0;
        for (let i = 0; i < queue.length; i++) {
          let { from, to, start, end, char } = queue[i];
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)];
              queue[i].char = char;
            }
            output += `<span class="cypher-random">${char}</span>`;
          } else {
            output += from;
          }
        }

        element.innerHTML = output;

        if (complete === queue.length) {
          return; // finished
        }
        frame++;
        requestAnimationFrame(update);
      }

      update();
    }

    btn.addEventListener("click", () => {
      scrambleText(btn, "Fetching Data Now, Please wait");
    });

     const btn2 = document.getElementById("loadButton2");

  btn2.addEventListener("click", () => {
    const finalText = "Fetching Data Now, Please wait";
    let displayText = "";
    let i = 0;
    const chars = "!@#$%^&*()_+{}[]<>?|~";
    
    const interval = setInterval(() => {
      if (i < finalText.length) {
        // Random symbols appear before resolving to correct char
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        displayText = finalText.substring(0, i) + randomChar;
        btn2.textContent = displayText;

        setTimeout(() => {
          btn2.textContent = finalText.substring(0, i + 1);
        }, 120);

        i++;
      }
    }, 250); // slower animation speed

    // Replace with final message after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      btn2.textContent = "Data Loaded";
    }, 10000);
  });

  const freshBtn = document.getElementById("freshDataBtn");

  freshBtn.addEventListener("click", () => {
    const finalText = "Fresh Data Loaded";
    const chars = "!@#$%^&*()_+{}[]<>?|~";
    let i = 0;
    let progress = 0;

    // Interval for text flicker & progressive reveal
    const interval = setInterval(() => {
      if (progress < finalText.length) {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        freshBtn.textContent = finalText.substring(0, progress) + randomChar;
        setTimeout(() => {
          freshBtn.textContent = finalText.substring(0, progress + 1);
        }, 150);
        progress++;
      }
      // cycle background color gradually
      const hue = (i * 12) % 360;
      freshBtn.style.background = `linear-gradient(135deg, hsl(${hue},70%,40%), hsl(${(hue+60)%360},70%,50%))`;
      i++;
    }, 400); // 0.4s * ~38 steps ≈ 15s

    // After 15 seconds replace button with a div
    setTimeout(() => {
      clearInterval(interval);

      const finishedDiv = document.createElement("div");
      finishedDiv.className = "cool-btn-3-finished";
      finishedDiv.textContent = finalText;

      // copy size + styling by replacing button node
      freshBtn.replaceWith(finishedDiv);
    }, 15000);
  });

   const freshBtnV4 = document.getElementById("freshDataBtnV4");

  freshBtnV4.addEventListener("click", () => {
    const finalText = "Fresh Data Loaded";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]<>?|~";
    const colors = ["#ff5252","#ffb74d","#4dd0e1","#81c784","#ba68c8","#f06292","#ffd54f","#64b5f6"];
    let progress = 0;
    let step = 0;

    const interval = setInterval(() => {
      let display = "";
      for (let j = 0; j < progress; j++) {
        display += finalText[j];
      }
      if (progress < finalText.length) {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        display += `<span class="char" style="color:${randomColor}">${randomChar}</span>`;
      }
      freshBtnV4.innerHTML = display;

      // Smooth background hue shift
      const hue = (step * 6) % 360;
      freshBtnV4.style.background = `linear-gradient(135deg, hsl(${hue},70%,45%), hsl(${(hue+60)%360},70%,50%))`;

      step++;
      if (progress < finalText.length) progress++;
    }, 400); // ~38 steps = ~15s

    setTimeout(() => {
      clearInterval(interval);

      // Final steady background
      freshBtnV4.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";

      // Replace with non-clickable div
      const finishedDiv = document.createElement("div");
      finishedDiv.className = "cool-btn-4-finished";
      finishedDiv.textContent = finalText;
      finishedDiv.style.width = freshBtnV4.offsetWidth + "px";
      finishedDiv.style.height = freshBtnV4.offsetHeight + "px";
      freshBtnV4.replaceWith(finishedDiv);
    }, 15000);
  });