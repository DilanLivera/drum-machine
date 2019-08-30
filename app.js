const Drumpad = (props) => {
  return (
    <div>
      <audio className="clip" id={ props.text }>
        <source src={ `./sounds/${ props.sound }.mp3` } type="audio/mp3"></source>
      </audio>
      <button onClick={ props.onClick } value={ props.text }>{ props.text }</button>
    </div>
  )
}

class App extends React.Component {
  static defaultProps = {
    drumpad_Keys: [ 
      { key: "Q", sound: "bubbles" }, 
      { key: "W", sound: "clay" }, 
      { key: "E", sound: "confetti" }, 
      { key: "A", sound: "corona" }, 
      { key: "S", sound: "dotted-spiral" }, 
      { key: "D", sound: "glimmer" }, 
      { key: "Z", sound: "moon" }, 
      { key: "X", sound: "pinwheel" }, 
      { key: "C", sound: "splits" }]
  }


  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    let sound = document.querySelector(`#${evt.target.value}`);
    sound.play()
  }

  render() {
    let drumpadList = this.props.drumpad_Keys.map( ({ key, sound }) => <Drumpad className="drum-pad" key={ key } text={ key } sound={ sound } onClick={ this.handleClick } /> )
    return (
      <div id="display">
        { drumpadList }
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("drum-machine"));