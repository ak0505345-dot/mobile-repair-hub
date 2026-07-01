const favoriteList = document.getElementById("favoriteList");
const searchFavorite = document.getElementById("searchFavorite");

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

function showFavorites(list){

favoriteList.innerHTML="";

if(list.length===0){

favoriteList.innerHTML="<h3>No Favorite Guides</h3>";
return;

}

list.forEach((guide,index)=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<h3>${guide.title}</h3>

<p>📱 ${guide.brand} - ${guide.model}</p>

<button class="openBtn">
📖 Open
</button>

<button class="removeBtn">
🗑 Remove
</button>

`;

card.querySelector(".openBtn").onclick=()=>{

location.href=
"guide.html?brand="+
encodeURIComponent(guide.brand)+
"&model="+
encodeURIComponent(guide.model);

};

card.querySelector(".removeBtn").onclick=()=>{

favorites.splice(index,1);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

showFavorites(favorites);

};

favoriteList.appendChild(card);

favoriteList.appendChild(document.createElement("br"));

});

}

searchFavorite.addEventListener("input",()=>{

const text=searchFavorite.value.toLowerCase();

showFavorites(

favorites.filter(g=>

g.title.toLowerCase().includes(text) ||

g.brand.toLowerCase().includes(text) ||

g.model.toLowerCase().includes(text)

)

);

});

showFavorites(favorites);