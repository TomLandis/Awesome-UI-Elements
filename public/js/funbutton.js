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