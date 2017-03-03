import React from 'react';
import { labels } from './_data';
import Modal from 'react-modal';
import WaitingMessage from 'utils/components/WaitingMessage';
import CustomModal from 'utils/components/CustomModal';
import AdminMainTable from './table/AdminMainTable';
import AdminMainForm from './forms/AdminMainForm';
import NavWrapper from 'utils/components/NavWrapper';

//AdminLayout chua template Main Content of Config va Modal de add-edit-delete
class AdminLayout extends React.Component {
	constructor(props){
		super(props);
		//bind this ;
		// console.log(...this.props);
	}
	_renderContent(){
	
		return(
			<div>
				<div className="breadcrumb-container">
					{labels.common.title}
				</div>

				{/*List content data*/}
				<div className="main-content">
					<AdminMainTable {...this.props} />
				</div>
				{/*End list content data*/}
	

				{/*Modal add - edit - delete data*/}
				<CustomModal
					open={this.props.mainModal}
					close={() => this.props.toggleModal(null, 'mainModal', false)}
					size="md"
					title="Admin manager"
				>
					<div>
						<div className="custom-modal-content">
							<AdminMainForm
								onSubmit={this.props.onChange}
								labels={labels.mainForm}
								submitTitle="Save"
							>
								{/*Button x close modal*/}
								<button
									type="button"
									className="btn btn-warning cancel"
									onClick={() => this.props.toggleModal(null, 'mainModal', false)}>
									<span className="glyphicon glyphicon-remove"></span> &nbsp;
									Cancel
								</button>
							</AdminMainForm>
						</div>
					</div>
				</CustomModal>
				{/*Modal add - edit - delete data*/}
			</div>
		)		
	}

	render(){
		return (
			<div>
				<NavWrapper>
					{this._renderContent()}
				</NavWrapper>
			</div>
		);
	}
}


AdminLayout.propTypes = {
	bulkRemove: React.PropTypes.bool
};

AdminLayout.defaultProps = {
	bulkRemove: true
};

export default AdminLayout;
