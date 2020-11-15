import classes from "./Navbar.module.css"

export const Navbar = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <b className={classes.title}>Система ведения заявок</b>
      </nav>
    </header>
  )
}
