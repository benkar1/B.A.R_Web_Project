

document.addEventListener("DOMContentLoaded", () => {
  
  const nav_link = document.querySelector('.dropbtn');
  nav_link.classList.add('active');

  document.getElementById("home_button").addEventListener("click", function() {
    window.location.href = "/MainPage";
  });

});


const table = document.getElementById("practices-table");
const filters = document.querySelector(".filter");

// filters.forEach(function(filter) {
//   filter.addEventListener("input", function() {
//     const column = filter.dataset.column;
//     const filterValue = filter.value.toLowerCase();
//     const rows = table.querySelectorAll("tbody tr");

//     rows.forEach(function(row) {
//       const cellValue = row.querySelector(`td:nth-child(${column + 1})`).innerHTML;

//       if (cellValue.includes(filterValue)) {
//         row.style.display = "block";
//       } else {
//         row.style.display = "none";
//       }
//     });
//   });
// });


const columns = table.querySelectorAll("thead th");
const data = [];


//insert data to filters
table.querySelectorAll("tbody tr").forEach(row => {
  const rowData = [];

  row.querySelectorAll("td").forEach((cell, index) => {
    rowData.push(cell.textContent);
    if (!data[index]) {
      data[index] = [];
    }
    data[index].push(cell.textContent);
  });

  data.push(rowData);
});

//add filter for each column
columns.forEach((column, index) => {  
  const select = document.createElement("select");
  const options = [...new Set(data[index])].sort();
  const optionElement = document.createElement("option");
  optionElement.value = "";
  optionElement.textContent = "";
  select.appendChild(optionElement);

  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });

  filters.appendChild(select);
});


//filter the table (not working)
// filters.addEventListener("change", function(event) {
//   const target = event.target;

//   data.forEach((rowData, rowIndex) => {
//     console.log(rowData);
//     console.log(rowIndex);
//     const row = table.querySelectorAll("tbody tr");
//     console.log(row);
//     let show = true;

//     filters.querySelectorAll("select").forEach((select, selectIndex) => {
//       console.log(select);
//       console.log(selectIndex);
//       if (target.value !== "" && target.value !== rowData[selectIndex]) {
//         show = false;
//       }
//     });

//     if (show) {
//       row.classList.remove('hide');
//     } else {
//       row.classList.add('hide');
//     }
//   });
// });

