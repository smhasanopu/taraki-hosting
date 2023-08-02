const student_create_form = document.getElementById("student_create_form");
const msg = document.querySelector(".msg");
const all_student_list = document.querySelector(".all-student-list");


// Submit Student Create Form 

student_create_form.onsubmit = (e) => {
    // DATA Load OFF
    e.preventDefault();

    // Form DATA Cash
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

    // Data Valiadtion & Alert Massage
    if ( !data.name || !data.roll || !data.reg ) {
        msg.innerHTML = createAlert(" All Fields Are Requierd ");
    } else if (!isNumber(data.roll)) {
        msg.innerHTML = createAlert(" Invalid Roll Number ");
    } else if (!isNumber(data.reg)) {
        msg.innerHTML = createAlert(" Invalid Reg Number ");
    } else {
        const oldStudentsData = getDataLS("students");
        oldStudentsData.push({
            ...data,                                         // তিনটা ডট কেন নিয়েছি ?
            result: null,
            createdAt : Date.now(),
        });
        sendDataLS("students", oldStudentsData);

        // DATA Reset 
        e.target.reset();

        msg.innerHTML = createAlert(
            `<strong> ${data.student_name} </strong>  Create successfull `, "success"
        );

        getStudents();
    }
};



// Show All Students
const getStudents = () => {
    const students = getDataLS("students");

    console.log(students);

    let content = "";
    if (students.length > 0) {
        students.map((student, index) => {
            content +=`
            <tr class="align-middle">
                <td>${index + 1}</td>
                <td><img
                    style="
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius:50px;
                    border:5px solid white;
                    "
                    src="${student.photo}" 
                    alt="${student.name}"></td>
                <td>${student.name}</td>
                <td> ${student.roll} </td>
                <td> ${student.reg}</td>
                <td> ${timeAgo(student.createdAt)}</td>
                <td>  
                    <button class="btn btn-sm btn-success"> 
                        Add result
                    </button>
                <td> 
                    <button class="btn btn-sm btn-info" data-bs-toggle="modal" 
                    data-bs-target="#show_single_stident_modal" onclick="showSingleStudent(${ student.roll }')"> 
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning"> 
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent('${ student.roll }')">  
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;});
    } else {
        content = `
            <tr>
                <td colspan="8" class="text-center"> No Data Found </td>
            </tr>
        `
    }
    all_student_list.innerHTML = content;
};
getStudents();


// delete student
const deleteStudent = (roll) => {
    const confirmAlert = confirm("Are you sure");
  
    if (confirmAlert) {
      const oldStudent = getDataLS("students");
      const updatedData = oldStudent.filter((data) => data.roll !== roll);
      sendDataLS("students", updatedData);
      getStudents();
    } else {
      alert("your data safe");
    }
};

// Show student
const showSingleStudent = (roll) => {
    alert(roll);
};