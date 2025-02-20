import Header from './Header';
import MainComponent from './MainComponent';

function App() {
  return (
    <div className="app">
      <Header />

      <MainComponent>
        <p>1/15</p>
        <p>Question?</p>
      </MainComponent>
    </div>
  );
}

export default App;
