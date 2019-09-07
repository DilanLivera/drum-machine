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

  async handleClick(evt) {
    evt.preventDefault();
    if(!this.props.disabled) {
      evt.target.querySelector("audio").play();
      let infoLabel = document.querySelector(".infoLabel")
      infoLabel.innerText = this.props.label;
      setTimeout(() => infoLabel.innerText = "", 400);
    }
  }

  handleKeyPress(evt) {
    evt.preventDefault();
    if(!this.props.disabled && evt.key.toUpperCase() == this.props.text) {
      let pad = ReactDOM.findDOMNode(this);
      pad.classList.add("highlight");
      pad.querySelector("audio").play();
      let infoLabel = document.querySelector(".infoLabel")
      infoLabel.innerText = this.props.label;
      setTimeout(() => infoLabel.innerText = "", 400);
      setTimeout(() => pad.classList.remove("highlight"), 400);
    }
  }

  render() {
    return (
      <div className="drum-pad" id={ this.props.text } onClick={ this.handleClick } value={ this.props.text }>
        <audio className="clip" src={ this.props.sound } id={ this.props.text } type="audio/mp3">
        </audio>
        { this.props.text }
      </div>
    )
  }
}

class App extends React.Component {
  static defaultProps = {
    drumpad_Keys: [[
      { key: "Q", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", label: "Heater-1" }, 
      { key: "W", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", label: "Heater-2" }, 
      { key: "E", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", label: "Heater-3" }, 
      { key: "A", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", label: "Heater-4" }, 
      { key: "S", sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", label: "Clap" }, 
      { key: "D", sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", label: "Open-HH" }, 
      { key: "Z", sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", label: "Kick-n'-Hat" }, 
      { key: "X", sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", label: "Kick" }, 
      { key: "C", sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", label: "Closed-HH" }
    ], [
      { key: "Q", sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", label: "Chord-1" }, 
      { key: "W", sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", label: "Chord-2" }, 
      { key: "E", sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", label: "Chord-3" }, 
      { key: "A", sound: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", label: "Shaker" }, 
      { key: "S", sound: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", label: "Open-HH" }, 
      { key: "D", sound: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", label: "Closed-HH" }, 
      { key: "Z", sound: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", label: "Punchy-Kick" }, 
      { key: "X", sound: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", label: "Side-Stick" }, 
      { key: "C", sound: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", label: "Snare" }
    ]]
  }

  constructor(props){
    super(props);
    this.state = {
      disabled: true,
      bank: 1
    }
    this.handlePowerClick = this.handlePowerClick.bind(this);
    this.handleBankClick = this.handleBankClick.bind(this);
    this.onVolumeClick = this.onVolumeClick.bind(this);
  }

  handlePowerClick(evt) {
    const disabled = !this.state.disabled;
    this.setState( { ...this.state, disabled });
  }

  handleBankClick(evt) {
    let { bank } = this.state;
    if( bank > 0) --bank;
    else ++bank;
    this.setState( { ...this.state, bank });
  }

  onVolumeClick(evt) {
    if(!this.state.disabled) {
      const volume = evt.target.value;
      let clips = document.querySelectorAll(".clip");
      let infoLabel = document.querySelector(".infoLabel")
      infoLabel.innerText = ` Volume: ${volume}`;
      setTimeout(() => infoLabel.innerText = "", 400);
      clips.forEach( clip => clip.volume = volume/100 );
    }
  }

  render() {
    const { disabled, bank } = this.state;
    const pads = this.props.drumpad_Keys[bank];
    let drumpadList = pads.map( ({ key, sound, label }) => <Drumpad className="drum-pad" 
                                                                                key={ key } 
                                                                                text={ key } 
                                                                                sound={ sound }
                                                                                label={ label }  
                                                                                disabled={ disabled } /> )
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
              <span className="slider" onClick={ this.handlePowerClick } ></span>
            </label>
          </div>

          <label className="infoLabel"></label>
          {/* value="50"*/}
          <input type="range" min="1" max="100" className="volume-slider" onClick={ this.onVolumeClick } />

          {/* Bank button */}
          <div className="bankButton">
            <p>Bank</p>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider" onClick={ this.handleBankClick }></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("drum-machine"));