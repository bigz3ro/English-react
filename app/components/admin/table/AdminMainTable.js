import React from 'react';
import { labels } from '../_data';
import Tools from 'utils/helpers/Tools';
import { 
		TableFilter, TableRightTool,
		TableAddButton, TableCheckAll, TableCheckBox
} from 'utils/components/table/TableComponents';
import forEach from 'lodash/forEach';
import Table from 'rc-table';
import Paginator from 'utils/components/Paginator';

//Display content list config
class AdminMainTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			allowRemove: true
		}

		//Bind this
		this._renderFilter = this._renderFilter.bind(this);
		this._renderRightTool = this._renderRightTool.bind(this);
		this._renderCheckBox = this._renderCheckBox.bind(this);
	}

	_renderFilter(){
		return (
			<TableFilter 
				onRemove={this.props.onRemove}
				onFilter={this.props.onFilter}
				bulkRemove={this.props.bulkRemove}
			/>
		);
	}

	_renderAddButton(){
		return (
			<TableAddButton 
				onExecute={() => this.props.toggleModal(null, 'mainModal')}
			/>
		)
	}

	_renderCheckAll(){
		return (
			<TableCheckAll 
				bulkRemove={this.props.bulkRemove}
				onCheckAll={this.props.onCheckAll}
			/>
		);
	}

	_renderCheckBox(value, row, index){
		// console.log(row);
		return (
			<TableCheckBox 
				title={value}
				checked={row.checked||false}
				bulkRemove={this.props.bulkRemove}
				onCheck={ (event) => this.props.onCheck(row.id, event.target.checked)}
			/>
		);
	}

	_renderRightTool(value, row, index){
		return (
			<TableRightTool 
				allowRemove={this.state.allowRemove}
				onRemove={(event) => this.props.onRemove(row.id)}
				toggleModal={ () => this.props.toggleModal(row.id, 'mainModal') }
			/>
		);
	}
	
	render(){
		//Lay tieu de du lieu dinh nghia trong file _data;
		const headingData = Tools.getHeadingData(labels.mainForm);
		// headingData :  { uid: {}, value: {} }
		// console.log(headingData);
		let columnData = [];
		//Lap ten cac cot du lieu trong api (Ten config , Value config)
		forEach(headingData, (value, key) => {
			columnData.push(
				{
					title: value.title,
					dataIndex: key,
					key,
					render: (value, row, index) => Tools.tableData(labels.mainForm, row, key, this.props.params)
				}
			);
		});
		// console.log(columnData);
		
		//Cot trong table 
		const columns = [
			{
				title: this._renderCheckAll(),
				dataIndex: 'a',
				key: 'checkbox',
				width: 30,
				render: this._renderCheckBox
			},
			...columnData
			, {
				title: this._renderAddButton(),
				dataIndex: '',
				key:'opeartions',
				width: 70,
				render: this._renderRightTool
			}
		];
		// console.log(columns);

		// console.log(this.props.adminReducer.list);
		return(
			<div>
				{this._renderFilter()}
				<Table 
					columns={columns}
					rowKey={ record => record.id }
					data={this.props.adminReducer.list}
					scroll={{ x: false, y: false }} 
				/>
				<div className="pagination-wrapper">
					<Paginator
						pageCount={this.props.adminReducer.pages}
						onPageChange={this.props.onPageChange}
					/>
				</div>
			</div>
		);
	}
}



export default AdminMainTable;