
class RecordForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title : '',
      date  : '',
      amount : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.valid = this.valid.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e){
    var name = e.target.name;
    switch(name){
      case 'title' : this.setState({title: e.target.value}); break;
      case 'date' : this.setState({date: e.target.value}); break;
      case 'amount': this.setState({amount: e.target.value}); break;
    }

  }
  valid(){
    return !!(this.state.date&&this.state.title&&this.state.amount)
  }
  handleSubmit(e){
    var _that = this;
    e.preventDefault();
    $.post('',{record:this.state},(data)=>{
      console.log('code run this')
      this.props.handleNewRecord(data);
      this.setState({
      title : '',
      date  : '',
      amount : ''
      });
    }, 'JSON')
  }
  render(){
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
      
        <div className='form-group margin-right-10'>
          <input 
            className='form-control' type='date' 
            placeholder='Date' 
            name='date' 
            value={this.state.date}
            onChange = {this.handleChange} />
        </div>
          <div className='form-group margin-right-10'>
            <input
              type='text'
              className='form-control'
              placeholder='Title'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}/>
          </div>
          <div className='form-group margin-right-10'>
            <input
              type='number'
              className='form-control'
              placeholder='Amount'
              name='amount'
              value={this.state.amount}
              onChange={this.handleChange}/>
          </div>
          <button type='submit'
            className='btn btn-primary'
            disabled = {!this.valid()}
            >
            Create Record
          </button>
        
      </form>
    )
  }
}