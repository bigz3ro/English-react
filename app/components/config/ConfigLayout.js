import React from 'react';
import { labels } from './_data';
import Modal from 'react-modal';
import WaitingMessage from 'utils/components/WaitingMessage';
import CustomModal from 'utils/components/CustomModal';
import ConfigMainTable from './table/ConfigMainTable';
import ConfigMainForm from './forms/ConfigMainForm';


//ConfigLayout chua template Main Content of Config va Modal de add-edit-delete
class ConfigLayout extends React.Component {
	constructor(props){
		super(props);
		//bind this ;
		// console.log(...this.props);
	}
	_renderContent(){
		if(!this.props.dataLoaded) {
			return <WaitingMessage />
		}
	
		return(
			<div>
				<div className="breadcrumb-container">
					{labels.common.title}
				</div>

				{/*List content data*/}
				<div className="main-content">
					<ConfigMainTable {...this.props} />
				</div>
				{/*End list content data*/}
	

				{/*Modal add - edit - delete data*/}
				<CustomModal
					open={this.props.mainModal}
					close={() => this.props.toggleModal(null, 'mainModal', false)}
					size="md"
					title="Config manager"
				>
					<div>
						<div className="custom-modal-content">
							<ConfigMainForm
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
							</ConfigMainForm>
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
				{this._renderContent()}
			</div>
		);
	}
}


ConfigLayout.propTypes = {
	bulkRemove: React.PropTypes.bool
};

ConfigLayout.defaultProps = {
	bulkRemove: true
};

export default ConfigLayout;
