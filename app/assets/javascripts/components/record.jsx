
class Record extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      edit: false
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  
  handleToggle(e){
    e.preventDefault();
    this.setState({ edit: !this.state.edit })
  }
  
  handleEdit(e){
    var that = this;
    e.preventDefault();
    var data = {
      title:that.refs.title.value,
      date: that.refs.date.value,
      amount: that.refs.amount.value,
    }
    $.ajax({
      method:'PUT',
      url:'/records/'+ that.props.record.id,
      dataType:'JSON',
      data: {record: data},
      success: (data)=>{
        that.setState({edit: false})
        that.props.handleEditRecord(that.props.record, data)
      }
    })
  }
  
  handleDelete(e){
    var that = this;
    
    e.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "/records/"+that.props.record.id,
      dataType:"JSON",
      success:() => {
          that.props.handleDeleteRecord(that.props.record);
          console.log('code run this line delete');
      }
    })
  }
  
  recordForm(){
    return (
      <tr>
        <td>
          {this.props.record.id}
        </td>
        <td>
          <input 
            className='form-control' 
            type='date'
            defaultValue={this.props.record.date}
            ref='date'/>
        </td>
        <td>
          <input 
            className='form-control' 
            type='text'
            defaultValue={this.props.record.title}
            ref='title'/>
        </td>
        <td>
          <input 
            className='form-control' 
            type='number'
            defaultValue={this.props.record.amount}
            ref='amount'/>
        </td>
        <td>
          <a className='btn btn-default' onClick={this.handleEdit}>Update</a>
          <a className='btn btn-danger' onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>  
    )
  }
  
  recordRow(){
    return (
      <tr>
        <td>{this.props.record.id}</td>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className='btn btn-default' onClick={this.handleToggle}>Edit</a>
          <a className='btn btn-danger' onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  }
  
  render(){
    if(this.state.edit){
      return(
        this.recordForm()
      )
    }else{
      return(
        this.recordRow()
      )      
    }
    
  }
}