function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const tracks = [
    { name: "Campus Spring", src: "audio/bgm1.mp3" },
    { name: "Cherry Blossom Road", src: "audio/bgm2.mp3" }
  ];

  let currentTrack = 0;
  let isPlaying = false;

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("playBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const trackName = document.getElementById("trackName");
  const volumeSlider = document.getElementById("volumeSlider");
  const introScreen = document.getElementById("introScreen");
  const enterBtn = document.getElementById("enterBtn");

  function loadTrack(index) {
    audio.src = tracks[index].src;
    trackName.textContent = `${tracks[index].name} (${index + 1}/${tracks.length})`;
    audio.load();
  }

  function playMusic() {
    audio.play()
      .then(() => {
        isPlaying = true;
        playBtn.textContent = "⏸";
      })
      .catch(() => {
        isPlaying = false;
        playBtn.textContent = "▶";
      });
  }

  function pauseMusic() {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
  }

  loadTrack(currentTrack);
  audio.volume = volumeSlider.value / 100;

  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      introScreen.style.opacity = "0";

      setTimeout(() => {
        introScreen.style.display = "none";
      }, 500);

      playMusic();
    });
  }

  playBtn.addEventListener("click", () => {
    if (isPlaying) pauseMusic();
    else playMusic();
  });

  nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playMusic();
  });

  prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    playMusic();
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100;
  });

  audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playMusic();
  });

  const students = [
    ["A","김도윤","M","국어국문학과","ISTJ","성실함, 과묵함, 책임감"],
    ["B","박지환","M","국어국문학과","ESTP","유쾌함, 낙천적, 눈치빠름"],
    ["C","한서윤","F","국어국문학과","ISFJ","다정함, 섬세함, 배려심"],
    ["D","최하린","F","국어국문학과","ENFP","장난기, 호기심, 감수성"],

    ["E","강민준","M","영어영문학과","ENTJ","자신감, 적극성, 사교성"],
    ["F","윤태성","M","영어영문학과","INTJ","냉정함, 독립적, 현실적"],
    ["G","이서아","F","영어영문학과","ENFJ","당당함, 활동적, 외향적"],
    ["H","정유진","F","영어영문학과","INFJ","지적임, 신중함, 완벽주의"],

    ["I","서지훈","M","사학과","INTP","진중함, 탐구심, 끈기"],
    ["J","오현우","M","사학과","ESFP","유머감각, 친화력, 즉흥적"],
    ["K","김채린","F","사학과","ISTP","조용함, 관찰력, 신중함"],
    ["L","윤아영","F","사학과","ENTP","도전적, 독립적, 솔직함"],

    ["M","최도현","M","철학과","INTJ","분석적, 냉철함, 비판적"],
    ["N","이민규","M","철학과","INFP","온화함, 신중함, 공감능력"],
    ["O","박하은","F","철학과","INTP","지적임, 차분함, 호기심"],
    ["P","강유리","F","철학과","ENTJ","독립적, 당당함, 고집있음"],

    ["Q","정시우","M","심리학과","INFJ","공감능력, 다정함, 성실함"],
    ["R","한지호","M","심리학과","ENTP","사교성, 유쾌함, 적응력"],
    ["S","김서연","F","심리학과","ISFJ","친절함, 온화함, 배려심"],
    ["T","유나경","F","심리학과","ESTJ","적극적, 밝음, 경쟁심"]
  ];

  const studentGrid = document.getElementById("studentGrid");
  const modal = document.getElementById("studentModal");
  const modalClose = document.getElementById("modalClose");

  function renderStudents(filter = "전체") {
    if (!studentGrid) return;

    studentGrid.innerHTML = "";

    students
      .filter(s => filter === "전체" || s[3] === filter)
      .forEach(s => {
        const card = document.createElement("div");
        card.className = "profile-card";
        card.innerHTML = `
          <img src="images/students/${s[0]}1.png" alt="${s[1]}">
          <div>
            <strong>${s[1]}</strong>
            <span>${s[3]}</span>
          </div>
        `;
        card.addEventListener("click", () => openModal(s));
        studentGrid.appendChild(card);
      });
  }

  function openModal(s) {
    document.getElementById("modalImg").src = `images/students/${s[0]}1.png`;
    document.getElementById("modalName").textContent = s[1];
    document.getElementById("modalDept").textContent = `${s[3]} · ${s[2]} · ${s[4]}`;
    document.getElementById("modalDesc").textContent = s[5];

    const thumbs = document.getElementById("modalThumbs");
    thumbs.innerHTML = "";

    [2, 3, 4].forEach(n => {
      const img = document.createElement("img");
      img.src = `images/students/${s[0]}${n}.png`;
      img.alt = `${s[1]} 이미지 ${n}`;
      img.addEventListener("click", () => {
        document.getElementById("modalImg").src = img.src;
      });
      thumbs.appendChild(img);
    });

    modal.classList.add("active");
  }

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  document.querySelectorAll(".student-tabs button").forEach(btn => {
    btn.addEventListener("click", () => {
      renderStudents(btn.dataset.filter);
    });
  });

  renderStudents();
});
