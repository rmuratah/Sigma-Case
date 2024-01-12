import Header from "../../components/header/header";
import { Outlet } from 'react-router-dom';

function App() {

  document.title = 'Sigma Case';

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;

