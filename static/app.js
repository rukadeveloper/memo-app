async function delMemo(e) {
  const ids = e.target.dataset.id;
  const res = await fetch(`/memo/${ids}`, {
    method: "DELETE",
  });
  readMemo();
}

async function editMemo(e) {
  const id = e.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요:");
  const res = await fetch(`/memo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("ul.lists");

  const li = document.createElement("li");
  li.innerText = `id:${memo.id}, contents:${memo.content}`;

  const editbtn = document.createElement("button");
  editbtn.innerText = "수정하기";
  editbtn.addEventListener("click", editMemo);
  editbtn.dataset.id = memo.id;

  const delbtn = document.createElement("button");
  delbtn.innerText = "삭제하기";
  delbtn.addEventListener("click", delMemo);
  delbtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editbtn);
  li.appendChild(delbtn);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonres = await res.json();
  const ul = document.querySelector("ul.lists");
  ul.innerHTML = "";
  jsonres.forEach(displayMemo);
}

async function createMemo(para) {
  console.log(para);
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: String(new Date().getTime()),
      content: para,
    }),
  });
  readMemo();
}

function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");

form.addEventListener("submit", handleSubmit);

readMemo();
