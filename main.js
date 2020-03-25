/* Todo List */

window.onload = function () { 

    //variables 

    let form = document.getElementById("form");

    let input = document.getElementById("input");

    let btn = document.getElementById("btn");

    let list = document.getElementById("list");

    let btnClr = document.getElementById("btnClr");

    let id = 1;

    // listItem = {item: "todo item", checked: false}

    let liItem = "";

    let todoList = [];

    //button event listener

    btn.addEventListener("click", addTodoItem);

    

    //list event listener

    list.addEventListener("click", boxChecked);

    

    //event listener for clear list

    btnClr.addEventListener("click", clearList);



    // input.addEventListener("keydown", addTodoItem);

    



    

    if (localStorage.length < 0) {

    btnClr.style.display = "none"; //hide clear btn	

        console.log("button");

        }

    

        //checking localStorage has data

        if(localStorage.length <= 0) {

            btnClr.style.display = "none"; //hide clear btn	



        }

    

        //add todo item to list

	function addTodoItem() {

		if(input.value === "") {

			alert("You must enter some value!");

		}

		else {

			if(list.style.borderTop === "") {

				console.log("here!")

				list.style.borderTop = "2px solid white";

				btnClr.style.display = "inline";

			}

			let text = input.value;	

			let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;				

			list.insertAdjacentHTML('beforeend', item);	

			liItem = {item: text, checked: false};

			todoList.push(liItem);		

			id++;

			addToLocalStorage();

			form.reset();

		}

	}    

        //adding string through style to list item

        function boxChecked(event) {

            const element = event.target;

            if (element.type === "checkbox") {

                element.parentNode.style.textDecoration = "line-through";

                todoList = JSON.parse(localStorage.getItem("todoList"));

                todoList[element.id.split('-')[1] - 1].checked = element.checked.toString();

                localStorage.setItem("todoList", JSON.stringify(todoList));

            }

        }



        //adding data to local storage

        function addToLocalStorage() {

            if (typeof (Storage) !== "undefined") {

                localStorage.setItem("todoList", JSON.stringify(todoList));

            } else {

                alert("browser doesn't support local storage!");

            }

        }

    

        //display all todo list

        function displayList() {

            list.style.borderTop = "2px solid white";

            todoList = JSON.parse(localStorage.getItem("todoList"));

            todoList.forEach(function (element) {

                console.log(element.item)

                let text = element.item;

                let item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;

                list.insertAdjacentHTML("beforeend", item);

                

                //if there is a checked box, then style

                if (element.checked) {

                    let li = document.getElementById("li-" + id);

                    li.style.textDecoration = "line-through";

                    li.childNodes[1].checked = element.checked;

                }

                id++;

            });

        }

    

        //clear list event listener

        function clearList() {

            todoList = [];

            localStorage.clear();

            list.innerHTML = "";

            btnClr.style.display = "none";

            list.style.borderTop = "";

        }

    }