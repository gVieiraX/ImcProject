import { useState } from "react";
import { isTemplateExpression } from "typescript";
import styles from "./App.module.css";
import poweredImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/griditem";



const App =()=> {
  const[hightField,setHight] = useState<number>(0)
  const[weightField,setWeight] = useState<number>(0)
  const[toShow,setToShow] = useState<Level|null>(null)

const hCB = ()=>{
  if(hightField && weightField) {
      setToShow(calculateImc(hightField, weightField))
  } else {
    alert('Todos os campos devem estar preenchidos')
  }
}


const hBB = () =>{

    setToShow(null);
    setHight(0);
    setWeight(0);
  
}

  return (
    <div className={styles.main} >
        <header>
            <div className={styles.headerContainer}>
              <img src={poweredImage} alt="" width={150} />
            </div>
        </header>
        <div className={styles.container}>
            <div className={styles.leftside}>
                <h1>Calcule seu IMC.</h1>
                <p>"O Índice de Massa Corporal (IMC) é um parâmetro bastante utilizado para classificar o indivíduo de acordo com seu peso e altura. Seu uso é disseminado principalmente entre profissionais que trabalham com o corpo, como médicos, fisioterapeutas e profissionais de Educação Física. É importante ressaltar que a Organização Mundial da Saúde (OMS) utiliza esse índice como indicador do nível de obesidade nos diferentes países."</p>


            <input 
            type="number"  
            placeholder="Digite a sua altura em METROS."
            value={hightField > 0 ? hightField:''}
            onChange={e=> setHight(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
            />

            <input 
            type="number"  
            placeholder="Digite o seu peso em KG."
            value={weightField > 0 ? weightField:''}
            onChange={e=> setWeight(parseFloat(e.target.value))}
            disabled={toShow ? true : false}

            />

      <button onClick={hCB}disabled={toShow ? true : false} > Calcular</button>

            </div>
            <div className={styles.rightside}>
              {!toShow &&
             
                <div className={styles.grid}>
                  {levels.map((item,key)=>(
                    < GridItem key={key} item={item} />
                  ))}
                </div>
                 }
                 {toShow &&
                    <div className={styles.rightBig}>
                        <div className={styles.rightArrow} onClick={hBB}>
                          <img src={leftArrowImage} alt="" width={25} />
                        </div>
                        <GridItem item={toShow}/> 

                    </div>
                 }
            </div>
        </div>
    </div>
  );
}

export default App;
