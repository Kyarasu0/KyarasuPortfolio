import styles from './WelcomeHeader.module.css'
import Hi_Kyarasu from '../../assets/Hi_Kyarasu.png'

function WelcomeHeader() {
  return (
    <div>
      <header className={styles.StartProfile}><h1 className={styles.pop}>Welcome!</h1></header>
      <div className={styles.Plate}>
        <img className={styles.image} src={Hi_Kyarasu} alt="Hi_Kyarasu" />
        <div className={styles.NamePlate}>
          <div className={styles.title}>
            <h3 className={styles.title_h3}>Nickname: </h3>
            <h1 className={styles.title_h1}>Kyarasu</h1>
          </div>
          <div className={styles.title}>
            <h3 className={styles.title_h3}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name:</h3>
            <div>
              <h3>カワノコウキ</h3>
              <h1 className={styles.title_h1}>川野光喜</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeHeader
