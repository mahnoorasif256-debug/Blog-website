import { db } from "./firebase.confiq.js";
import { collection, getDocs, onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";



 //////////////////// get real time update

       let getUser = async () => {
    try {
     
        let userRef = collection(db, "users")

        onSnapshot(userRef, (querySnapshot) => {
            const _users = [];
            querySnapshot.forEach((doc) => {
                _users.push({ ...doc.data(), id: doc.id });
            });

            users = _users
            filteredUsers = [...users]
            renderTable();
        });
    } catch (error) {
        console.log(error.message);

    }
}






/////////////////////////// Update Status start/////////////////////////////

let updateStatus = async (uid, currentStatus) => {
    try {
        let status = currentStatus === 'true' || currentStatus === true

        await updateDoc(doc(db, "users", uid), {
            isActive: !status
        });


    } catch (error) {
        console.log(error.message);

    }
}


/////////////////////////// Update Status end/////////////////////////////


let currentPage = 1;
const rowsPerPage = 1;
let users = [];
let filteredUsers = [...users];

const tableBody = document.getElementById("userTableBody");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");


/////////////////////////////  Event Delegation

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('status-btn')) {
        let id = e.target.getAttribute('data-id');
        let currentStatus = e.target.getAttribute('currentStatus');
        updateStatus(id, currentStatus);
    }
})



function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = filteredUsers.slice(start, end);

    if (paginatedUsers.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No users found</td></tr>`;
        return;
    }

    paginatedUsers.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
         
  <td><span class="status ${user.isActive ? 'active' : 'blocked'}"> ${user.isActive ? 'Active' : 'Blocked'}</span></td>
 <td><button id="sBtn" data-id="${user.id}" currentStatus="${user.isActive}" class=" status-btn   status ${user?.status?.toLowerCase()}">update status</button></td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination();
}




function updatePagination() {
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Search Filter Event
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderTable();
});

// Pagination Events
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    } 
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});



// Initial Render

renderTable();


getUser()







////////////////////////////      noori   start  ///////////////////////////////
// let user = [];
// Filter = [...users]
// let currentpage = 1;
// let rowperpage = 1;


// let getuser  = async  () =>{

// try{

// const userref = query(collection(db, "users"));
// const query = onSnapshot(userref, (querySnapshot) => {
//   const _users = [];
//   querySnapshot.forEach((doc) => {
//       _users.push({...doc.data() , id: doc.id});
//   });

// user = _users;
// Filter = [...users];
// renderTable()


// });
// }catch(error){
// console.log(error.message);

// }
// }




// let renderTable = async ()=>{
//     userTableBody.innerHTML = '';

// let start = (currentpage - 1) * rowperpage;
// let end =  start + rowperpage;
// let paginateduser = Filter.slice(start , end);


// if(paginateduser.length === 0){
//      userTableBody.innerHTML = ` <tr><td colspan="5" style="align-items: center;">user not found</td></tr>`
// return;
// }


// paginateduser.forEach(user =>{
// let row = createElement('tr');

// row.innerHTML = `
// <td>${user.email}</td>
// <td>${user.name}</td>
// <td>${user.id}</td>
// <td>${user.role}</td>
//  <tr><span class="status ${user?.status?.toLowerCase()}" >${user.isactive ? 'active' : 'blocked'}</span></tr>
// <td><button id="sBtn" data-id="${user.id}"   cuurentstatus="${user.isactive}"    class=" status-btn status ${user?.status?.toLowerCase()}">update status</button></td>
// `

//  userTableBody.appendChild = row;

// updatedpagination();

// })
// }


// function updatedpagination(){
//     let total = Math.ceil(Filter.length / rowperpage) || 1;
// pageIndicator.textContent = `page ${currentpage} of ${total}`

// prevBtn.disabled = currentPage === 1;
// nextBtn.disabled = currentPage === rowperpage || rowperpage === 0;

// }


// searchInput.addEventListener('click' , (e)=>{
// let  input = e.target.value.toLowerCase();
// Filter = users.filter(user =>
// user.name.toLowerCase().includes(input),
// user.email.toLowerCase().includes(input)
// )
// })



// prevBtn.addEventListener('click' , (e)=>{
// if(currentpage > 1){
// currentpage--;
//  renderTable()
// }
// })


// nextBtn.addEventListener('click' , (e)=>{
// const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
// if(currentpage  < totalPages){
// currentpage++;
//  renderTable()
// }
// })



// let updatestatus = async (id , curree)=>{

// try{

// let status = curree === 'true' || curree === true ;

// await setDoc(doc(db, "users", id), {
// isActive : !true,
// });

// }catch(error){
// console.log(error.message);

// }

// }



// userTableBody.addEventListener('click' , (e) => {
// if(e.target.classList.contains('btn-status')){
// let id = e.target.getAttribute('data-id');
// let curree = e.target.getAttribute('status');
// updatestatus(id , curree)
// }
// })


// ////////////////////////////      noori  end   ///////////////////////////////
