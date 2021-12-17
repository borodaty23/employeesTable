const eddUserCar = (data) => {
  const inputName = document.querySelector("#inputName");
  const inputUserBorn = document.querySelector("#inputUserBorn");
  const inputDate = document.querySelector("#inputDate");
  const inputWage = document.querySelector("#inputWage");

  data.userCard.push({
    checkBoxId: Date.now(),
    name: inputName.value,
    userBorn: inputUserBorn.value,
    dateOfHiring: inputDate.value,
    wage: inputWage.value,
  });
  form.reset();
};

const drawCard = (data) => {
  const tableBody = document.querySelector("#tableBody");

  tableBody.innerHTML = "";
  data.userCard.forEach((el, i) => {
    tableBody.innerHTML += `
    <tr id = "cardUser">
    <td><input class="inputCheckBox" id="${el.checkBoxId}" type="checkbox"></td>
  <td>${el.name}</td>
  <td>${el.userBorn}</td>
  <td>${el.dateOfHiring}</td>
  <td>${el.wage}</td>
  </tr>
  `;
  });
};

const deleteCheckedCards = (data) => {
  let massAllInputCheckBocks = [...document.querySelectorAll(".inputCheckBox")];

  for (let i = 0; i < massAllInputCheckBocks.length; i++) {
    data.userCard.forEach((el, j) => {
      if (
        massAllInputCheckBocks[i].checked === true &&
        +massAllInputCheckBocks[i].id === el.checkBoxId
      ) {
        data.userCard.splice(j, 1);
      } else {
        console.log("c");
      }
    });
  }
};

const sumOfCheckedCards = (data) => {
  const sum = document.querySelector("#sum");
  let massAllInputCheckBocks = [...document.querySelectorAll(".inputCheckBox")];
  let countSum = 0;

  for (let i = 0; i < massAllInputCheckBocks.length; i++) {
    data.userCard.forEach((el, j) => {
      if (
        massAllInputCheckBocks[i].checked === true &&
        +massAllInputCheckBocks[i].id === el.checkBoxId
      ) {
        countSum += +el.wage;
      } else {
        console.log("c");
      }
    });
  }
  sum.innerHTML = `Sum $: ${countSum}`;
};

const sortCardsByYearOfBorn = (data, yearOfBornSortIcon) => {
  yearOfBornSortIcon.classList.toggle("true");

  if (yearOfBornSortIcon.classList.contains("true")) {
    data.userCard.sort(
      (a, b) => parseFloat(a.userBorn) - parseFloat(b.userBorn)
    );
  } else {
    data.userCard.sort(
      (a, b) => parseFloat(b.userBorn) - parseFloat(a.userBorn)
    );
  }
};

const sortCardsByEmploymentDate = (data, employmentDateSortIcon) => {
  employmentDateSortIcon.classList.toggle("true");

  if (employmentDateSortIcon.classList.contains("true")) {
    data.userCard.sort((a, b) => {
      let dateA = new Date(a.dateOfHiring),
        dateB = new Date(b.dateOfHiring);
      return dateA - dateB;
    });
  } else {
    data.userCard.sort((a, b) => {
      let dateA = new Date(a.dateOfHiring),
        dateB = new Date(b.dateOfHiring);
      return dateB - dateA;
    });
  }
};

//===================================================================INIT

const init = () => {
  const addUserButton = document.querySelector("#addUserButton");

  const deletedButton = document.querySelector("#deleted");
  const sumButton = document.querySelector("#sumButton");
  const yearOfBornSortIcon = document.querySelector("#yearOfBornSortIcon");

  const employmentDateSortIcon = document.querySelector(
    "#employmentDateSortIcon"
  );

  const data = {
    userCard: [],
  };

  addUserButton.addEventListener("click", (event) => {
    event.preventDefault();
    eddUserCar(data);
    drawCard(data);
    count.innerHTML = `number of employees: ${data.userCard.length}`;
  });

  deletedButton.addEventListener("click", (event) => {
    deleteCheckedCards(data);
    console.log(data.userCard);

    drawCard(data);
    count.innerHTML = `number of employees: ${data.userCard.length}`;

    // if (a[0].checked === true) {
    //   alert("a");
    // } else {
    //   alert("b");
    // }

    // console.log(typeof a[0].id);
  });

  sumButton.addEventListener("click", (event) => {
    sumOfCheckedCards(data);
  });

  yearOfBornSortIcon.addEventListener("click", (event) => {
    sortCardsByYearOfBorn(data, yearOfBornSortIcon);
    console.log(data.userCard);
    drawCard(data);
  });

  employmentDateSortIcon.addEventListener("click", (event) => {
    sortCardsByEmploymentDate(data, employmentDateSortIcon);

    drawCard(data);

    // data.userCard.sort((a, b) => a.dateOfHiring - b.dateOfHiring);
    console.log(data.userCard);
  });
};

init();
