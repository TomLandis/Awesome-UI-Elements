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


  


   const snakeBody1 = document.getElementById("snakeBody1");
  const btnSnake1 = document.getElementById("snakeBtn1");
  const mouse1 = document.getElementById("mouse1");

  let runningSnake1 = false;
  let progressSnake1 = 0;
  let frameSnake1;
  const snakeLength1 = 12; // number of segments

  // build snake
  const segments1 = [];
  for (let i = 0; i < snakeLength1; i++) {
    const seg = document.createElement("div");
    seg.classList.add("snake-segment-1");
    if (i === 0) seg.classList.add("head");
    if (i === snakeLength1 - 1) seg.classList.add("tail");
    snakeBody1.appendChild(seg);
    segments1.push(seg);
  }

  function animateSnake1() {
    progressSnake1 += 2; // forward speed
    const trackWidth = 400 - 40; // container width minus approx snake head
    const wiggleAmp = 5;
    const wiggleSpeed = 0.15;

    segments1.forEach((seg, index) => {
      const offsetX = progressSnake1 - index * 16;
      if (offsetX < 0) {
        seg.style.opacity = 0;
      } else {
        seg.style.opacity = 1;
        const y = Math.sin((progressSnake1/10) - index * wiggleSpeed) * wiggleAmp;
        seg.style.transform = `translate(${offsetX}px, ${y}px)`;
      }
    });

    if (progressSnake1 < trackWidth) {
      frameSnake1 = requestAnimationFrame(animateSnake1);
    } else {
      // snake reached mouse
      mouse1.style.opacity = 0;
      btnSnake1.textContent = "Restart";
      runningSnake1 = false;
    }
  }

  btnSnake1.addEventListener("click", () => {
    if (!runningSnake1) {
      btnSnake1.textContent = "Stop";
      runningSnake1 = true;
      if (progressSnake1 >= 360) {
        // reset
        progressSnake1 = 0;
        mouse1.style.opacity = 1;
      }
      frameSnake1 = requestAnimationFrame(animateSnake1);
    } else {
      cancelAnimationFrame(frameSnake1);
      btnSnake1.textContent = "Start";
      runningSnake1 = false;
    }
  });

  (function () {
    // Unique names suffixed with 2
    const snakeContainer2 = document.getElementById('snakeContainer2');
    const snakeTrack2 = document.getElementById('snakeTrack2');
    const btnSnake2 = document.getElementById('snakeBtn2');
    const mouse2 = document.getElementById('mouse2');
    const pct2 = document.getElementById('snakePct2');

    // Config - tweak these to change look/speed/length
    const SEG_COUNT2 = 18;         // segments including head & tail
    const SEG_BASE_W2 = 28;        // visual width for a body segment
    const HEAD_W2 = 36;            // head width
    const TAIL_W2 = 22;            // tail width
    const SEG_SPACING2 = 12;       // spacing between successive centers (overlaps)
    const SLITHER_AMP2 = 8;        // vertical amplitude of slither
    const SLITHER_SPEED2 = 6.5;    // how 'fast' the wave travels (higher = faster wave)
    const DESIRED_SECONDS2 = 12;   // how many seconds from start -> mouse (approx)

    // runtime state
    const segments2 = [];
    let runningSnake2 = false;
    let progressSnake2 = -SEG_COUNT2 * SEG_SPACING2; // start off-left so snake enters naturally
    let animFrame2 = null;
    let lastTimestamp2 = null;
    let finishedSnake2 = false;
    let trackWidth2 = 0;
    let speedPxPerSec2 = 100; // will be calculated once track width available

    // build segments: index 0 = head, last = tail
    for (let i = 0; i < SEG_COUNT2; i++) {
      const seg = document.createElement('div');

      // head
      if (i === 0) {
        seg.className = 'snake-seg-2 snake-head-2';
        // add a simple eye element to the head for character
        const eye = document.createElement('div');
        eye.style.position = 'absolute';
        eye.style.width = '6px';
        eye.style.height = '6px';
        eye.style.borderRadius = '50%';
        eye.style.background = '#fff';
        eye.style.left = '24%';
        eye.style.top = '34%';
        eye.style.boxShadow = '6px 0 0 #111, 2px 0 0 rgba(0,0,0,0.08)';
        eye.style.transform = 'translate(-50%,-50%)';
        seg.appendChild(eye);
      }
      // tail
      else if (i === SEG_COUNT2 - 1) {
        seg.className = 'snake-seg-2 snake-tail-2';
      } else {
        seg.className = 'snake-seg-2';
      }

      // ensure each segment is absolutely positioned in the container
      seg.style.left = '0px';
      seg.style.top = '50%';
      seg.style.transform = 'translateY(-50%)';
      snakeContainer2.appendChild(seg);
      segments2.push(seg);
    }

    // recompute sizes when layout known
    function recalcSizes2() {
      trackWidth2 = snakeTrack2.clientWidth;
      // desired distance head needs to travel: from starting negative to just before mouse
      const mouseRect = mouse2.getBoundingClientRect();
      const trackRect = snakeTrack2.getBoundingClientRect();
      const mouseRightPadding = 10; // same as CSS
      const mouseW = mouseRect.width || 28;
      const endX = trackRect.width - mouseW - mouseRightPadding - (HEAD_W2 / 2);
      const startX = -SEG_COUNT2 * SEG_SPACING2;
      const travelDistance = endX - startX;
      speedPxPerSec2 = travelDistance / DESIRED_SECONDS2;
    }

    // main animation
    function tick2(ts) {
      if (!lastTimestamp2) lastTimestamp2 = ts;
      const dt = (ts - lastTimestamp2) / 1000;
      lastTimestamp2 = ts;

      // advance head
      progressSnake2 += speedPxPerSec2 * dt;
      const headX = progressSnake2;

      // compute end thresholds
      const trackRect = snakeTrack2.getBoundingClientRect();
      const mouseRect = mouse2.getBoundingClientRect();
      const mouseRightPadding = 10;
      const mouseW = mouseRect.width || 28;
      const endX = trackRect.width - mouseW - mouseRightPadding - (HEAD_W2 / 2);

      // update ARIA
      const pct = Math.max(0, Math.min(100, Math.round((headX / endX) * 100)));
      snakeTrack2.setAttribute('aria-valuenow', pct);
      pct2.textContent = `${pct}%`;

      // update each segment
      for (let i = 0; i < segments2.length; i++) {
        const seg = segments2[i];

        // spacing gives overlap
        const segCenterX = headX - (i * SEG_SPACING2);

        // hide if completely left or right of track
        if (segCenterX < -60 || segCenterX > trackRect.width + 60) {
          seg.style.opacity = '0';
          continue;
        } else {
          seg.style.opacity = '1';
        }

        // vertical slither offset (phase shift gives wave along body)
        const y = Math.sin((headX * 0.08 * SLITHER_SPEED2) - (i * 0.5)) * SLITHER_AMP2;

        // smaller/smoother rotation for head to look better
        if (i === 0) {
          // small tilt in direction of motion
          const tilt = Math.max(-22, Math.min(22, (Math.atan2(
            (Math.sin((headX+2) * 0.08 * SLITHER_SPEED2) - Math.sin((headX) * 0.08 * SLITHER_SPEED2)),
            6
          ) * 180) / Math.PI));
          seg.style.transform = `translate3d(${segCenterX}px, calc(-50% + ${y}px), 0) rotate(${tilt}deg)`;
        } else {
          seg.style.transform = `translate3d(${segCenterX}px, calc(-50% + ${y}px), 0)`;
        }

        // layering order: head above body above tail
        seg.style.zIndex = (segments2.length - i) + 1;
      }

      // finished?
      if (headX >= endX) {
        // eaten!
        mouse2.style.opacity = '0';
        finishedSnake2 = true;
        runningSnake2 = false;
        btnSnake2.textContent = 'Restart';
        cancelAnimationFrame(animFrame2);
        animFrame2 = null;
        lastTimestamp2 = null;
        return;
      }

      // keep animating
      animFrame2 = requestAnimationFrame(tick2);
    }

    // start/stop button handler
    btnSnake2.addEventListener('click', () => {
      // recalc sizes so desired time holds even if layout changed
      recalcSizes2();

      if (!runningSnake2) {
        // start or restart
        if (finishedSnake2) {
          // reset for a new run
          progressSnake2 = -SEG_COUNT2 * SEG_SPACING2;
          finishedSnake2 = false;
          mouse2.style.opacity = '1';
        }
        runningSnake2 = true;
        btnSnake2.textContent = 'Stop';
        lastTimestamp2 = null;
        animFrame2 = requestAnimationFrame(tick2);
      } else {
        // stop / pause
        runningSnake2 = false;
        btnSnake2.textContent = 'Start';
        if (animFrame2) {
          cancelAnimationFrame(animFrame2);
          animFrame2 = null;
        }
        lastTimestamp2 = null;
      }
    });

    // ensure sizes correct on load & resize
    window.addEventListener('load', recalcSizes2);
    window.addEventListener('resize', () => {
      recalcSizes2();
      // keep the visual if paused or finished
      if (!animFrame2 && runningSnake2) {
        animFrame2 = requestAnimationFrame(tick2);
      }
    });

    // initial calc
    recalcSizes2();
  })();