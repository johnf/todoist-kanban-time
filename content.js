let targets;

let oldPathname;

const updateTime = () => {
  // Referesh targets
  targets = document.querySelectorAll('section.board_section, p.board_section__task_count');

  document.querySelectorAll('section.board_section').forEach((section) => {
    let count = 0;
    const header = section.querySelector('header.board_section__header div.board_section__section_info');

    section.querySelectorAll('div.board_section__task_list div.board_task div.board_task__details div.board_task__details__content div.markdown_content').forEach((task) => {
      const md = task.innerText.match(/\[([0-9]+)m\]/);
      if (md) {
        count += parseInt(md[1], 10);
      }
    });

    const title = header.querySelectorAll('p.inodes_time')[0] || document.createElement('p');
    title.className = 'board_section__task_count inodes_time';
    title.style = 'margin-left: 5px;';
    title.innerHTML = `(${count}m)`;

    header.appendChild(title);
  });
};

const setup = () => {
  targets = document.querySelectorAll('section.board_section, p.board_section__task_count');
  if (targets.length === 0) {
    setTimeout(setup, 1000);
    return;
  }

  // Setup initial board
  updateTime();

  // configuration of the observer:
  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  };

  const observer = new MutationObserver(() => {
    observer.disconnect();
    updateTime();
    targets.forEach((target) => observer.observe(target, config));
  });

  // pass in the target node, as well as the observer options
  targets.forEach((target) => observer.observe(target, config));
};

setup();

const locationCheck = () => {
  if (window.location.pathname === oldPathname) {
    return;
  }

  targets = document.querySelectorAll('section.board_section, p.board_section__task_count');

  oldPathname = window.location.pathname;
  updateTime();
};
setInterval(locationCheck, 100);
