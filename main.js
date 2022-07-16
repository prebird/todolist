// 유저가 값을 입력한다
// +클릭시 할일이 추가된다
// delete 클릭시 할일이 삭제된다
// check클릭시 밑줄이 간다
// 탭을 누르면 언더바가 이동하면서 해당 할일만 보여준다

let taskInput = document.getElementById("task-input");
//console.log(taskInput)
let add = document.getElementById("add");
let tabs = document.querySelectorAll(".task-tabs div"); // 조건에 만족하는 모든걸다 가져옴
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all"; //초기값은 all로 해줘야 됨
let filterList = [];
add.addEventListener("click", addTask); //이벤트, 함수
console.log(tabs);
console.log(underLine);

// 탭 이벤트 먹이기
for(let i=1; i<tabs.length; i++){
    // 클릭 이벤트
    // 이벤트 넘겨받아서 함수 파라메터로 넘겨준다 - 무슨탭을 선택했는지 알기위해
    tabs[i].addEventListener("click", function(event){tabClickedEvent(event)});
    //tabs[i].addEventListener("click", (e) => horizontalIndicator(e));
}

function addTask(){
    //console.log("clicked"); 
    // 객체
    let task ={
        id : ID(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    console.log(taskList); 
    filterList = taskList;
    render();
    taskInput.value = "";
}

function deleteTask(id){

    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);// 시작위치, 몇개 삭제
            break;
        }
    }
    for(let i=0; i<filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i,1);// 시작위치, 몇개 삭제
            break;
        }
    }
    render();
}

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

//그리기
function render(){
    let list = filterList;

    let resultHtml = '';
    for(let i = 0; i<list.length;i++){
        if(list[i].isComplete == true){
            // ' 말고 백틱 ` 사용하기
            resultHtml += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            resultHtml += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
        }

        
        
    }
    // 붙혀넣기
    let taskBoard = document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id){
    //console.log(id);
    for(let i=0;i<taskList.length;ifilterList){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function tabClickedEvent(event){
    filter(event);
    horizontalIndicator(event);
    render();
}

function filter(event){
    // console.log("클릭된", event.target); //event.target -> 해당 태그
    mode = event.target.id;
    filterList = []
    if (mode == "all"){
        filterList = taskList;
    }
    else if(mode == "notDone"){
        for(let i=0; i< taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
    }
    else if(mode == "done"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
    }
}

// 탭 아래 바 움직이기
function horizontalIndicator(event){
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top 
    = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
}