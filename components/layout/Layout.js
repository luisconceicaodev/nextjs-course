import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

// props.children takes what's between opening and closing layout tags and wrap this component around that content
function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
