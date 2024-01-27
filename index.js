const url = `https://crudcrud.com/api/5d4870212bc1474180cdd89672e68c94/busBooking`;

function handleChange(event) {
  event.preventDefault();

  axios
    .post(url, {
      name: event.target.name.value,
      email: event.target.email.value,
      number: event.target.pNumber.value,
      busNumber: event.target.busNumber.value,
    })
    .then((res) => {
      showUser(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const filter = document.getElementById("filter")
filter.addEventListener("change",function(){
    const filterValue = filter.value;
    console.log(filterValue);
})

window.addEventListener("DOMContentLoaded", function () {
  axios
    .get(url)
    .then((res) => {
      const allUser = res.data;
      for (let i = 0; i < allUser.length; i++) {
        showUser(allUser[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function deleteUser(event) {
  const parent = event.target.parentNode;
  const id = parent.getElementsByTagName("li")[0].innerText;

  axios
    .delete(`${url}/${id}`)
    .then((res) => {
      console.log("deleted");
    })
    .catch((error) => {
      console.log(error);
    });
  parent.remove();
}

function editUser(event) {
  const parent = event.target.parentNode;
  console.log(parent);
  const name=parent.querySelector(".name").innerText;
  const email=parent.querySelector(".email").innerText;
  const pNumber=parent.querySelector(".number").innerText;
  const busNumber=parent.querySelector(".busNumber").innerText;
  console.log(name,email,pNumber,busNumber);


  const form = document.querySelector("form");
  const inputCount = form.getElementsByTagName("input");
    inputCount[0].value = name;
    inputCount[1].value = email;
    inputCount[2].value = pNumber;
  form.getElementsByTagName("select").value=busNumber;

  deleteUser(event);

}

function showUser(userData) {
  const userEntries = Object.entries(userData);
  const newUl = document.createElement("ul");
  for (let i = 0; i < userEntries.length; i++) {
    const [key, value] = userEntries[i];
    const newLi = document.createElement("li");
    newLi.innerText = value;
    newLi.setAttribute("class", key);
    newUl.append(newLi);
  }
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("onclick", "deleteUser(event)");
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.setAttribute("onclick", "editUser(event)");
  newUl.append(deleteBtn);
  newUl.append(editBtn);
  const form = document.querySelector("form");
  form.after(newUl);
  const inputCount = form.getElementsByTagName("input");
  for (let i = 0; i < inputCount.length; i++) {
    inputCount[i].value = "";
  }
}
