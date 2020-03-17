import React from 'react';
import '../App.css';
class TodoList extends React.Component {
    constructor(){
        super();
        this.state = {
            list: [
                {id: 1, text: '做一个待办事项的Demo', done: false},
                {id: 2, text: '学习es6', done: true},
                {id: 3, text: '找工作', done: false}
            ],
            todoText: '',
            numDid:3,//总
            numWill:2 //将要完成
        }
    }
    handleChange = (e)=>{
        this.setState({todoText: e.target.value});
    }
    save = ()=>{
        // console.log(this.state.todoText);
        let arr=this.state.list
        arr.push({text:this.state.todoText,done: false})
        this.setState({list:arr})
        this.setState({numDid:this.state.numDid+1})
        this.setState({numWill:this.state.numWill+1})
        this.setState({todoText:''})//保存完清空
        // console.log(this.state.list)
    }
     del(index,event) {
        let config=this.state.list[index].done
        let arrDel=this.state.list
        arrDel.splice(index,1)
        this.setState({list:arrDel},()=>{
            !config&&this.setState({numWill:this.state.numWill-1})
        })
        this.setState({numDid:this.state.numDid-1})
        // !(this.state.list[index].done)&&this.setState({numWill:this.state.numWill-1})
        // if(!this.state.list[index].done){
        //     this.setState({numWill:this.state.numWill-1})
        // }
    }
    checkB(index,event){
        let arrCheck=this.state.list
        arrCheck[index].done=!(arrCheck[index].done)
        this.setState({list:arrCheck},()=>{
            arrCheck[index].done?this.setState({numWill:this.state.numWill-1}):this.setState({numWill:this.state.numWill+1})
        })
        // this.setState({numWill:this.state.numWill-1})
        // console.log(this.state.list)
    }
    render() {
        return (<div className="div">
            <p className="p1">TodoList</p>
           <ul>
               {this.state.list.map((item,index) => (<li key={index}>
                   <dt>
                    <input checked={item.done} type="checkbox" onClick={(event) => { this.checkB(index, event) }}/>
                    <span className={item.done?'span':'span1'}>{item.text}</span>
                    </dt>
                    <button onClick={(event) => { this.del(index, event) }}>删除</button>
                   </li>)
               )}
           </ul>
            <p className="p2">共有<span>{this.state.numDid}</span>计划,还有<span>{this.state.numWill}</span>件待完成</p>
           <input className="input" type="text" placeholder="吃饭睡觉打豆豆" value={this.state.todoText} onChange={this.handleChange}/>
           <button className="button" onClick={this.save}>保存</button>
        </div>)
    }
}

export default TodoList;