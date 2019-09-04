class Drumpad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleClick(evt) {
    evt.preventDefault();
    let sound = evt.target.querySelector("audio");
    sound.play();
  }

  async handleKeyPress(evt) {
    evt.preventDefault();
    if(evt.key.toUpperCase() == this.props.text) {
      let pad = ReactDOM.findDOMNode(this);
      pad.classList.add("highlight");
      let sound = pad.querySelector("audio");
      sound.play();
      await setTimeout(() => pad.classList.remove("highlight"), 100);
    }
  }

  render() {
    return (
      <div className="Drumpad" onClick={ this.handleClick } value={ this.props.text }>
        <audio className="clip" id={ this.props.text }>
          <source src={ `./sounds/${ this.props.sound }.mp3` } type="audio/mp3"></source>
        </audio>
        { this.props.text }
      </div>
    )
  }
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
  }

  render() {
    let drumpadList = this.props.drumpad_Keys.map( ({ key, sound }) => <Drumpad className="drum-pad" 
                                                                                key={ key } 
                                                                                text={ key } 
                                                                                sound={ sound }  /> )
    return (
      <div id="display">
        <div className="drumpads">
          { drumpadList }
        </div>
        <div className="controls">
          {/* power button */}
          <div className="powerButton">
            <p>Power</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>

          <label className="infoLabel">Open HH</label>
          {/* value="50"*/}
          <input type="range" min="1" max="100" className="volume-slider" />

          {/* Bank button */}
          <div className="bankButton">
            <p>Bank</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("drum-machine"));