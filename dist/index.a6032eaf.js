const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
// 拿到localStorage存的值
const x = localStorage.getItem("x");
// 将得到的字符串x变成对象
const xObject = JSON.parse(x);
// 初始为预设。hashMap储存信息，解决退出界面后添加网站消失的问题
// const hashMap = xObject || [
//     {logo:"./images/github-logo.png",  logoType:'image', url:"https://www.github.com"},
//     {logo:"./images/css-tricks-logo.jpeg", logoType:'image', url:"https://www.css-tricks.com"},
//     {logo:"./images/mdn-logo.png", logoType:'image', url:"https://developer.mozilla.org"},
// ]
let hashMap = xObject || [
    {
        logo: "G",
        logoType: "image",
        url: "https://www.github.com"
    },
    {
        logo: "C",
        logoType: "image",
        url: "https://www.css-tricks.com"
    },
    {
        logo: "M",
        logoType: "image",
        url: "https://developer.mozilla.org"
    }
];
const simplifyUrl = (url)=>{
    return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //正则表达式删除/开头的内容
};
// 遍历预存内容并插入lastLi之前
const render = ()=>{
    // 除新增按钮，remove其他数据（防止两遍）,重写DOM树
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">
                    ${node.logo}
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-closefill"></use>
                    </svg>
                </div>
            </div> 
        </li>`).insertBefore($lastLi);
        // 用click事件监听点击url,替代了a标签
        $li.on("click", ()=>{
            window.open(node.url);
        });
        // 阻止点击close时冒泡，防止把close当做触发点击a标签
        $li.on("click", ".close", (e)=>{
            e.stopPropagation();
            // 删除对应元素
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$(".addButton").on("click", ()=>{
    let url = window.prompt("请问要添加什么网址？");
    if (url.indexOf("https") !== 0) url = "https://" + url;
    // 将添加的新对象存入hashMap
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: "text",
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    console.log("页面关闭");
    // local storage只能存字符串
    const string = JSON.stringify(hashMap);
    // localStrorage在本地设置一个值，并把string传给他
    localStorage.setItem("x", string);
};
$(document).on("keypress", (e)=>{
    // 同下const key = e.key
    const { key } = e;
    for(let i = 0; i < hashMap.length; i++){
        console.log(hashMap[i].logo.toLowerCase());
        if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
    }
});

//# sourceMappingURL=index.a6032eaf.js.map
