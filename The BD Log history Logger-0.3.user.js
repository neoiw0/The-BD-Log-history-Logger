// ==UserScript==
// @name         The BD Log history Logger
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://www.neopets.com/dome/arena.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==


//How 2 Use:

//0)BD log history
//1)Above the battle log,in the black bar, you will see how many times your multi-healers healed.(Make it easier for oneself to follow the DDL(~yotoive)/EEL(~EELRules)/OPT(~Airistole) rules)
//2)If there is a difference on MaxHp of 2 pets, this script helps note the number.The pet with higher health could immediately surrender when their health drops to or below this value, to make it a little more fair.
//3) Hide names in your battle log

var displayPVPInfo=true;//do you want to display MaxHP difference and how many times your multi-healers healed?
var maxTurns=30;//max turns of hitory bd log to save
var logBackgroundColor = "rgba(255, 0, 0, 0)"; // log Background Color
var recordInterval=2;//how many seconds between each (log)recording action
//
var hideYourName=true;//if you just want the log, not like names in it
var yourName2Disply="You"
var hideYourOpponentName=true;//if you just want the log, not like names in it
var opponentName2Disply="Your Opponent"

























///////////////////////////////////////////////////////////usually you dont have to change anything below/////////////////////////////////////////////////////////////////////

////////////////////////////////////////////multi-healers pic link/////////////////////more multi-healers will be supported in the future////////////////////////////////////////////
var tmt='url("https://images.neopets.com/items/wea_magical_tablet.gif")';
var istaff='url("https://images.neopets.com/items/earth_staff.gif")';
var wodf='url("https://images.neopets.com/items/darkfaerie_wand.gif")';
var blaze='url("https://images.neopets.com/items/wea_tge_scimitar.gif")';
var rodn='url("https://images.neopets.com/items/rod_darknova.gif")';
////////////////////////////////////////////multi-healers string to display/////////////////////////////////////////////////////////////////
var tmtstr="TMT";
var istaffstr='Istaff';
var wodfstr='WODF';
var blazestr='Blaze';
var rodnstr='RODN';



var onlyonce=0;
var slot1=document.querySelector("#p1e1m > div");
var slot2=document.querySelector("#p1e2m > div");

////////////////////////////// you dont have to change anything below//////////////////
var originalOpponentName;
 // 选择到指定的元素
const element =document.querySelector("#container__2020 > div.battledome-container");

// 创建一个新的 <p> 元素
const newParagraph = document.createElement("p");
//只要不是第一輪,就改變文字
var intervalText=setInterval(function(){if(displayPVPInfo&&document.querySelector("#flround")&&!(document.querySelector("#flround").textContent=="1")){
    ////////////////////

if(localStorage.ABCMaxHP!=null&&localStorage.ABCMaxHP!=""&&localStorage.ABCMaxHP!="0"){
// 设置 <p> 元素的文本内容
newParagraph.textContent = "MaxHP Difference="+localStorage.ABCMaxHP;
}
// 设置 <p> 元素的文本颜色为红色
newParagraph.style.color = "red";

// 将新的 <p> 元素添加到选择的元素下面
element.appendChild(newParagraph);
///////////////////////////////////////////////////////
for (let i = 1; i <= maxTurns; i++) {
    AddMoreLog(i);
}

    //////////////////////////
    document.querySelector("#statusmsg > h4").textContent=localStorage.getItem('ABCLogger');}},3500);//改变文字
var interva2Text=setInterval(function(){
  if(hideYourName) ChangeYourName();//
if(hideYourOpponentName)ChangeOpponentName();//Change your OpponentName

    ///////history logger
        if(document.querySelector("#flround")&&document.querySelector("#flround").textContent!=1){
        SetLog(document.querySelector("#flround").textContent);}

},recordInterval*1000);//history logger



var intervalId0=setInterval(function(){
 // 1. 获取按钮元素（假设按钮的id为"myButton"）
    var button = document.querySelector("#fight");

    // 2. 检查按钮是否存在
    if (button) {
            // 移除可能存在的旧事件监听器
          // 元素已经加载，清除定时器
      clearInterval(intervalId0);
       // button.removeEventListener('click', handleClick);
        // 3. 绑定点击事件监听器
        button.addEventListener('click', handleClick);

        ///////history logger
        if(document.querySelector("#flround")&&document.querySelector("#flround").textContent!=1){
        SetLog(document.querySelector("#flround").textContent);}

        ///////
    }

    // 自定义点击事件处理函数
    function handleClick() {
        if(onlyonce!=document.querySelector("#flround").textContent){
            onlyonce=document.querySelector("#flround").textContent;
        myCustomMethod();}
    }

    // 自定义方法
    function myCustomMethod() {
         console.log(document.querySelector("#flround").textContent);
        if(document.querySelector("#flround").textContent=="1"){
         ///////////
for (let i = 1; i <= maxTurns; i++) {
    ClearLog(i);
}

            /////////
            localStorage.ABCMaxHP=document.querySelector("#p1hp").textContent-document.querySelector("#p2hp").textContent;//储存最大血量数据
localStorage.setItem('ABCLogger', "Log:");

}
        
        TestWeapon(slot1,tmt,tmtstr,1200,2);
         TestWeapon(slot1,istaff,istaffstr,1200,0.2);
        TestWeapon(slot1,wodf,wodfstr,1200,0.25);
        TestWeapon(slot1,blaze,blazestr,1200,0.2);
        TestWeapon(slot1,rodn,rodnstr,1200,2);

                        
        //
           
         TestWeapon(slot2,tmt,tmtstr, 2200,2);
         TestWeapon(slot2,istaff,istaffstr, 2200,0.2);
        TestWeapon(slot2,wodf,wodfstr,2200,0.25);
        TestWeapon(slot2,blaze,blazestr,2200,0.2);
        TestWeapon(slot2,rodn,rodnstr,2200,2);
                        
        // 这里可以写你想要触发的任何自定义代码
    }


},3500);


function TestWeapon(item,identity,str,delayy,percent){

var hpjudge=parseInt(document.getElementById('p1hgreen').style.top, 10)<-456*(1-percent);
//console.log(item,identity,str,hpjudge);//打印送进来的变量
    if(hpjudge&&item&&item.style.backgroundImage==identity)
    {//判断包裹

         setTimeout(function() {
// 获取存储的字符串
let storedString = localStorage.getItem('ABCLogger');

// 如果存储的字符串不存在（即首次使用），可以设置为一个空字符串
if (storedString === null) {
    storedString = '';
}

// 要添加的内容
let newContent = "|"+str;

// 将新内容拼接到原有内容后面
storedString += newContent; // 或者 storedString = storedString + newContent;

// 将更新后的字符串存回 localStorage
localStorage.setItem('ABCLogger', storedString);
   }, delayy);
         }//判断结束

}
//////////////////


function AddMoreLog(number){
if(document.querySelector("#flround")&&document.querySelector("#flround").textContent!=number&&document.getElementById("storage-container"+number)==null&&localStorage.getItem("logContent"+number)!=null&&localStorage.getItem("logContent"+number)!="null"){

  var targetElement = document.querySelector("#logcont");

  // 创建一个新的 div 元素
  var newElement = document.createElement("div");

  // 设置新元素的属性
  newElement.id = "storage-container"+number; // 你可以根据需要修改ID
  newElement.classList.add("storage"); // 你可以添加自定义的CSS类名

  // 设置新元素的内容
  newElement.innerHTML = localStorage.getItem("logContent"+number);

// 设置新元素的样式，确保内容不溢出
 // newElement.style.padding = "20px";
  //newElement.style.marginTop = "20px"; // 可选，控制与上方元素的间距
  newElement.style.backgroundColor = logBackgroundColor; // 可选，背景颜色
  //newElement.style.border = "1px solid #ccc"; // 可选，添加边框
  //newElement.style.maxWidth = "100%"; // 限制最大宽度
  //newElement.style.boxSizing = "border-box"; // 确保 padding 和 border 不影响总宽度

  // 防止内容溢出
  //newElement.style.overflow = "hidden";

  // 将新元素插入到目标元素之后
  targetElement.insertAdjacentElement("afterend", newElement);
}}

function ClearLog(number){
localStorage.setItem(("logContent"+number),null);
}
//document.querySelector("#logcont")
function SetLog(number){

// 1. 获取 #logcont 元素
const logCont = document.querySelector("#logcont");

// 2. 克隆 #logcont 元素，确保原页面不被修改
const clonedLogCont = logCont.cloneNode(true); // true 表示深度克隆（包括所有子节点）

// 3. 删除克隆元素中的 #flcollapse 元素
const flcollapse = clonedLogCont.querySelector("#flcollapse");
if (flcollapse) {
    flcollapse.remove();
}

// 4. 修改克隆元素中的 #logcont > div > p 的 textContent 为 "HP:"
const pElement = clonedLogCont.querySelector("div > p");
if (pElement) {
    pElement.textContent = "HP:"+document.querySelector("#p1hp").textContent+"/"+document.querySelector("#p2hp").textContent;
     // 设置文本颜色为深红色
    pElement.style.color = "darkred";
}

// 5. 获取修改后的克隆元素的 outerHTML
const logContHTML = clonedLogCont.outerHTML;



// 将 #logcont 元素包裹在一个新的 div 中，应用平移样式
let modifiedHTML = `<div style="transform: translateX(0px);">${logContHTML}</div>`;

localStorage.setItem(("logContent"+number), modifiedHTML);

}

///////////////////////////




function ChangeOpponentName() {
    // 获取 #log 元素
var logElement = document.querySelector("#logcont");
    // 如果元素存在，执行替换操作
    if (logElement && document.querySelector("#p2name") ) {
        var opponetname = document.querySelector("#p2name").textContent;
        if(opponetname !== opponentName2Disply)originalOpponentName=opponetname;
        //&& document.querySelector("#p2name").textContent !== opponentName2Disply

        // 将 logElement 内的指定字符串全部替换为 "Your Opponent"
        logElement.innerHTML = logElement.innerHTML.replace(new RegExp(originalOpponentName, 'g'), opponentName2Disply);
        document.querySelector("#p2name").textContent = opponentName2Disply;
    }
}
function ChangeYourName() {
    // 如果元素存在，执行替换操作
    if (document.querySelector("#p1name") && document.querySelector("#p1name").textContent !== yourName2Disply) {

        document.querySelector("#p1name").textContent = yourName2Disply;
    }
}