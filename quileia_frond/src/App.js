import Navbar from "./component/_header/Navbar";
function App() {

    return (
      <div className="App">
        <Navbar/>
               </div>
    );
/*     }

    peticionPost = async () => {

      let nivelCongestion = this.state.form.via.nivel_congestion

      if (nivelCongestion >= 30) {
          await axios.post(baseUrl + "save", this.state.form).then(response => {
              alert("Guardado Correctamente !!!")
              this.peticionGet();

          }).catch(error => {
              console.log(error.message);
          })

      } else {
          alert("La via es considerada de baja congestion !!!")
      }
 */
  }
export default App;

