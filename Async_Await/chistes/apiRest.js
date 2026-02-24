// function conectaAPI(){
//   fetch("https://api.chucknorris.io/jokes/random")
//       .then(res => {
//           if (!res.ok) {
//               throw new Error(`Error HTTP ${res.status}`);
//           }
//           return res.json();
//       })
//       .then(json => {
//           muestraChiste(json.value);
//       })
//       .catch(error => {
//           console.error("Error:", error);
//       });
// }

//-----------------------------------------------------------------
//Versión moderna con async/await
async function conectaAPI() {
   try {
       const res = await fetch("https://api.chucknorris.io/jokes/random");
       if (!res.ok) {
           throw new Error(`Error HTTP ${res.status}`);
       }
       const json = await res.json();
       muestraChiste(json.value);
   } catch (error) {
       console.error("Error:", error);
   }
}

function muestraChiste(val){
	let chistes = document.getElementById("chistes");
	chistes.textContent = val;
}
