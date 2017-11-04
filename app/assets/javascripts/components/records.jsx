
class Records extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      records: this.props.data
    }
    this.addRecord = this.addRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.updateRecord = this.updateRecord.bind(this)
    this.debits = this.debits.bind(this)
    this.credits = this.credits.bind(this)
    this.balance = this.balance.bind(this)
  }
  addRecord(record){
    // var records = this.state.records.slice()
    // records.push(record)
    // this.setState({records: records})
    var records = React.addons.update(this.state.records,{$push:[record]});
    this.setState({records:records})
  }
  
  updateRecord(record,data){
    var index = this.state.records.indexOf(record);
    var records = React.addons.update(this.state.records, {$splice: [[index, 1, data]]});
    this.setState({records: records})
  }
  
  deleteRecord(record){
     var records = this.state.records.slice();
     var index = records.indexOf(record);
    records = React.addons.update(this.state.records,{$splice: [[index,1]]})
    // records.splice(index,1)
    this.setState({ records: records })
  }
  
  credits(){
    var  credits = this.state.records.filter(val => val.amount >= 0)
    return credits.reduce((prev,curr) => prev + parseFloat(curr.amount),0)
  }
  
  debits(){
    var debits = this.state.records.filter(val => val.amount < 0)
    return debits.reduce((prev,curr) => prev + parseFloat(curr.amount),0)
  }
  
  balance(){
    return this.credits() + this.debits()
  }
  
  render(){
    return (
      <div className='records container'>
        <h2 className='title'>Records</h2>  
        <div className='row'>
          <AmountBox type='success' amount={this.credits()} text='Credit' />
          <AmountBox type='danger' amount={this.debits()} text='debits' />
          <AmountBox type='info' amount={this.balance()} text='balance' />
        </div>
        <RecordForm handleNewRecord = {this.addRecord} />
        <hr/>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.records.map((record) => {
                return (
                  <Record key={record.id} record={record} 
                    handleDeleteRecord={this.deleteRecord} 
                    handleEditRecord = {this.updateRecord}
                  />
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}