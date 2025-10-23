// Password: Remembering Martha - interactions
(() => {
  const scenes = Array.from(document.querySelectorAll('.scene'));
  const passwordButtons = Array.from(document.querySelectorAll('.pw'));
  const audios = {};
  let used = new Set();
  const totalPasswords = 3;

  // Map scene id to element
  //
  const sceneById = scenes.reduce((acc, s) => { acc[s.dataset.scene] = s; return acc }, {});

  // Load audio elements
  for (let i=1;i<=6;i++){
    const a = document.getElementById('audio'+i);
    if(a) audios[i]=a;
  }

  // IntersectionObserver to toggle active scene
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const scene = entry.target;
      if(entry.isIntersecting){
        scene.classList.remove('inactive');
        scene.classList.add('active');
        playAudioForScene(scene.dataset.scene);
      } else {
        scene.classList.remove('active');
        scene.classList.add('inactive');
        stopAudioForScene(scene.dataset.scene);
      }
    })
  },{threshold:0.45});

  scenes.forEach(s=>{s.classList.add('inactive'); obs.observe(s)});

  // Parallax on scroll
  window.addEventListener('scroll', ()=>{
    scenes.forEach(s=>{
      const rect = s.getBoundingClientRect();
      const depth = 0.12; // subtle
      const y = rect.top * depth;
      const bg = s.querySelector('.scene-bg');
      if(bg) bg.style.transform = `translateY(${y}px) scale(1.02)`;
    })
  },{passive:true});

  // Audio helpers - respect autoplay restrictions: try to play, if blocked, wait for user gesture
  function playAudioForScene(id){
    const a = audios[id];
    if(!a) return;
    a.volume = 0.12; // gentle
    a.play().catch(()=>{
      // will play on next user interaction
    });
  }
  function stopAudioForScene(id){
    const a = audios[id];
    if(!a) return;
    try{a.pause(); a.currentTime = 0}catch(e){}
  }

  // Click handlers for passwords
  passwordButtons.forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const target = btn.dataset.target;
      if(!target) return;
      if(btn.disabled) return;

      // Smoothly scroll to target scene and apply a gentle fade in
      const targetEl = document.getElementById('scene'+target);
      if(targetEl){
        targetEl.scrollIntoView({behavior:'smooth'});
        // mark used and disable
        used.add(btn.id);
        btn.disabled = true;
        btn.classList.add('used');
        btn.setAttribute('aria-pressed','true');

        // Play target audio explicitly if possible
        playAudioForScene(target);
        // After a short viewing time, return to scene1 (password selection) unless all used
        setTimeout(()=>{
          // If all passwords have been used, reveal scene5 (new) which will auto-transition later
          if(used.size >= passwordButtons.length){
            revealIntermediateThenFinal();
          } else {
            const intro = document.getElementById('scene1');
            if(intro) intro.scrollIntoView({behavior:'smooth'});
          }
  },10000); // 10 seconds
      }
    })
  });

  function revealIntermediateThenFinal(){
    // Scroll to new scene5 (intermediate) then after it fades out, move to scene6
    const inter = document.getElementById('scene5');
    if(inter){
      inter.scrollIntoView({behavior:'smooth'});
      playAudioForScene('5');
      // After a delay allow scene5 to be read and then transition to final scene6
      setTimeout(()=>{
        const final = document.getElementById('scene6');
        if(final){
          final.scrollIntoView({behavior:'smooth'});
          playAudioForScene('6');
        }
  },10000); // 10 seconds
    }
  }

  // If user interacts (gesture) try to resume any blocked audio
  ['click','keydown','touchstart'].forEach(evt=>{
    window.addEventListener(evt, ()=>{
      // try playing currently active scene audio
      const active = document.querySelector('.scene.active');
      if(active) playAudioForScene(active.dataset.scene);
    },{once:true})
  });

  // Small polish: keyboard navigation for passwords
  document.addEventListener('keydown', (e)=>{
    if(e.key === '1') document.getElementById('pw-martha')?.click();
    if(e.key === '2') document.getElementById('pw-blue')?.click();
    if(e.key === '3') document.getElementById('pw-daisy')?.click();
  });

})();
