var inputInfo = document.getElementById('inputInfo');
var btn = document.getElementById('btn');
var tasksBoard = document.getElementById('tasksBoard');
var deleteBtns = document.getElementsByClassName('deleteBtn');
var clear = document.getElementById('clear');
var ul = document.getElementsByTagName('ul');
var li = document.getElementsByTagName('li');
var check = document.getElementsByClassName('check');

function add(obj){
    if(obj.value !=""){
        var li = document.createElement('li');
        var ul = document.createElement('ul');
        var del = document.createElement('div');
        var check = document.createElement('input');
        tasksBoard.insertBefore(ul,clear);
        del.innerHTML = "x";
        del.setAttribute('class', "deleteBtn");
        li.innerHTML = obj.value;
        check.setAttribute('type',"checkbox");
        check.setAttribute('class', "check");
        ul.appendChild(li);
        li.appendChild(del);
        li.appendChild(check);
    }
}
function dele(obj){
     obj.parentNode.parentNode.remove();

}
function add_dele_check(){
    add(inputInfo);
    tasksBoard.style.display = 'block';
    for(var i of ul){
        i.style.display = 'block';
    }
    for(var i of li){
        i.style.display = 'block';
    }
    for(var i=0; i<deleteBtns.length; i++){
        deleteBtns[i].onclick = function(){ 
            dele(this);
        }
    }
    for(var i=0; i<check.length; i++){
        check[i].onclick = function(){
            if(this.checked){
                this.parentNode.style["text-decoration"] = "line-through";
            }
            else{
                this.parentNode.style["text-decoration"] = "none";
            }
        }

    }
}
inputInfo.onkeydown = function(Ent){
    if(Ent.keyCode == 13){
        add_dele_check();
    }
}
btn.onclick = function(){
    add_dele_check();
}

clear.onclick = function(){ 
    for(var i = ul.length - 1; i >= 0; i--) { 
        tasksBoard.removeChild(ul[i]); 
    }
}