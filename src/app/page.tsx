import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.helloText}>
          <h1>
              Добро пожаловать на dnl.hk!
          </h1>
          <text>
              Революционный имиджборд, который
              ничем не отличается от остальных,
              а в некоторых аспектах даже хуже.
          </text>
      </div>
    </main>
  )
}
