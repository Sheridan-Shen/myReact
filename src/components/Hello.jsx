import HeartLogo from '../assets/react.svg'
import styles from './Hello.module.css'

function Hello({name}) {

  return (
    <div>
      <img src={HeartLogo} className={styles['heart-logo']} alt="Heart logo" />
      <h1>Hello World! {name}</h1>
    </div>
  )
}

export default Hello
