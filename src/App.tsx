import React from 'react';
import './App.css';
import Confirm from './components/Confirm';

interface IState {
  confirmOpen: boolean;
  confirmMessage: string,
  confirmVisible: boolean;
  countDown: number;
}

class App extends React.Component<{}, IState> {

  /**
   * Call when some state variable change
   * @param props
   * @param state 
   */
  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }

  private timer: number = 0;
  private renderCount = 0;

  constructor(props: {}) {
    super(props);
    this.state = {
      confirmOpen: false,
      confirmMessage: "Please hit the confirm button",
      confirmVisible: true,
      countDown: 10
    }
  }

  private handleCancelClick = () => {
    this.setState({
      confirmOpen: false
    });
    clearInterval(this.timer);
  }

  private handleOkClick = () => {
    this.setState({
      confirmOpen: false
    });
    clearInterval(this.timer);
  }

  private handleConfirmClick = () => {
    this.setState({
      confirmOpen: true
    });
    clearInterval(this.timer);
  }

  private handleTimeTick = () => {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${
          this.state.countDown
        } secs to go`, countDown: this.state.countDown - 1
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState(
            {
              confirmMessage: "Too late to confirm!",
              confirmVisible: false
            }
          )
        }
      }
    );
    
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimeTick(), 1000);
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1;
    console.log("getSnapshotBeforeUpdate", prevProps, prevState, {
      renderCount: this.renderCount
    });
    return this.renderCount;
  }
  
  public componentDidUpdate(prevProps: {}, prevState: IState, snapshot: number) {
    console.log("componentDidUpdate", prevProps, prevState, 
    snapshot, {
      renderCount: this.renderCount
    });
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  /**
   * To prevent unnecessary render cicles
   * @param nextProps 
   * @param nextState 
   */
  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }

  public render = () => {
    return (
      <div>
        <div className="App">
          <Confirm
            open={this.state.confirmOpen}
            title="Título da caixa"
            content="Conteúdo da pergunta"
            onOkClick={this.handleOkClick}
            onCancelClick={this.handleCancelClick}
            />
        </div>
        <div className="container">
          <p>{this.state.confirmMessage}</p>
          {this.state.confirmVisible && 
            (<button onClick={this.handleConfirmClick}>Confirm</button>)
          }
        </div>
      </div>
    );
  }
}

export default App;
