import React from 'react';
import AdminLayout from 'components/admin/AdminLayout';
import {apiUrls} from './_data';
import { reset, SubmissionError } from 'redux-form';
import md5 from 'blueimp-md5';
import 'whatwg-fetch';
import Tools from 'utils/helpers/Tools';
import { labels } from './_data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from 'app/actions/actionCreators';
import isEmpty from 'lodash/isEmpty';
import store from 'app/store';
import filter from 'lodash/filter';

class Admin extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			mainModal: false,
			itemId: null,
			bulkRemove: true,
			checkAll: false,
			params:{},
			checked: false,
			//check data loaded
			dataLoaded: store.getState().adminReducer.list.length?true:false
		}

		//Bind this
		this.list = this.list.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleCheckAll = this.handleCheckAll.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);

	}

	//Khi da mount component ra roi thi goi du lieu
	componentDidMount(){
		//Neu ma props adminReducer.list.length ma none
		//De cho van de server renderring
		if(!this.props.adminReducer.list.length){
			if(window.initData){
				if(window.initData.success){
					this.setInitData(window.initData);
				}else{

				}
				window.initData = null
			}else{
				this.list();
			}
		}
	}

	//----- Xu li cac event xay ra tren giao dien ------>

	toggleModal(id=null, state, open=true){
		let newState = {};
		newState[state] = open;
		switch(state){
			case 'mainModal':
				//Gan id vao state
				newState.itemId = id;
				//Neu ma co id va form open - Form edit
				if(id && open){
					//Goi api theo obj ( tung doi tuong theo id)
					Tools.apiCall(apiUrls.obj, { id: id }, false).then( (result) => {
						if(result.success){
							//Kich hop actionAdmin la obj
							this.props.adminAction('obj', {
								...result.data
							});
							this.setState(newState);
							return;
						}
					});
				}else{
					//Form add
					this.props.adminAction('obj', Tools.getInitData(labels.mainForm));
					this.setState(newState);
				}
				break;
		}
	}


	handleFilter(event){
		console.log(event);
	}

	handleCheck(id, checked){
		//Lap qua tung object trong mang list va tim index cua doi tuong co id trung voi id parameter
		let index = store.getState().adminReducer.list.findIndex( x => x.id === id );
		// console.log(index);
		// this.setState({ checked: !this.state.checked });
		// {checked: true/false}
		this.props.adminAction('edit', {checked}, index);
	}

	handleCheckAll(){
		let list = this.props.adminReducer.list;
		if(filter(list, { checked: true}).length === list.length){
			this.props.adminAction('uncheckAll');
		}else{
			this.props.adminAction('checkAll');
		}
	}

	handleRemove(id=null){
		const confirm = window.confirm("Do you want to delete ?");
		if(!confirm){
			return;
		}
		// console.log(id);
		
		if(id === null){
			let listId = [];
			this.props.adminReducer.list.map( value => {
				if(value.checked){
					listId.push(value.id)
				}
			});
			if(!listId.length){
				window.confirm("You must choose items.");
				return;
			}
			id = listId.join(',');
		}else{
			id = String(id);
		}
		

		Tools.apiCall(apiUrls.remove, {id}).then( (result) => {
			if(result.success){
				//Neu ma thanh cong thi set lai State 
				let listId = result.data.id;
				if(typeof listId !== 'object'){
					listId = [listId];
				}
				//Tim index cua phu hop voi id tra ve tu serve
				let listIndex = listId.map(id => {
					return store.getState().adminReducer.list.findIndex( x => x.id === parseInt(id));
				});
				this.props.adminAction('remove', null, listIndex);
			}
		})
	}

	handleChange(eventData, dispatch){
		//Nhan data dong thoi goi add api va cap nhat ra view 
		try{
			const params = {...eventData};
			const id = this.state.itemId;

			return Tools.apiCall(apiUrls[id?'edit':'add'], id?{...params, id}: params).then( (result) => {
				if(result.success){
					const data = {
						...result.data
					};
					if(id){
						//Neu la edit thi tim index cua no trong list de show du lieu ra
						let index = store.getState().adminReducer.list.findIndex( x => x.id );
						this.props.adminAction('edit', data , index);
					}else{
						this.props.adminAction('add', data);
					}
					dispatch(reset('AdminMainForm'));
			    	this.toggleModal(null, 'mainModal', false);
				}else{
					throw new SubmissionError(Tools.errorMessageProcessing(result.message));
				}
			});
		}catch(error){
			throw new SubmissionError(Tools.errorMessageProcessing(error));
		}
	}

	handlePageChange(data){
		let page = data.selected + 1;
		//Use api List with param page;
		this.list({}, page);
		//goi api theo /admin?page={numberPage}

	}
	//---End xu li cac  event xay ra tren giao dien ------>


	//Goi api 
	list(outerParams={}, page=1){
		let params = {
			page
		};

		if(!isEmpty(outerParams)){
			params = { ...params, ...outerParams}
		}
		Tools.apiCall(apiUrls.list, params, false).then((result) => {
			if(result.success){
				this.setInitData(result);
				//khi set state cua redux thi set dataLoad: true
				this.setState({dataLoaded: true})
			}
		});
	}

	//Set data-list to state redux 
	setInitData(initData){
		this.props.adminAction('newList', {list: [...initData.data.items], pages: initData.data._meta.last_page});
		this.setState({dataLoaded: true});
	}

	render(){
		return (
			<ol className="breadcrumb">
				<AdminLayout
					{...this.props}
					{...this.state}
					list={this.list}
					toggleModal={this.toggleModal}
					onFilter={this.handleFilter}
					onCheck={this.handleCheck}
					onCheckAll={this.handleCheckAll}
					onRemove={this.handleRemove}
					onChange={this.handleChange}
					onPageChange={this.handlePageChange}
				/> 
			</ol>
		);
	}
}

function mapStateToProps(state){
	return {}
}

function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators( actionCreators , dispatch )
	}
}

Admin = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default Admin;