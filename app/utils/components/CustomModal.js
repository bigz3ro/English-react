import React from 'react';
import Modal from 'react-modal';

class CustomModal extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		let customStyles = {
			overlay: {
				zIndex: 2,
				overflowY: 'scroll'
			},
			content : {
				top: '5%',
				left: '30%',
				right: '30%',
				bottom: 'auto',
				overflowX: 'visible',
				overflowY: 'visible'
			}
		};
		switch(this.props.size){
			case 'sm':
				customStyles.content.left = '35%';
				customStyles.content.right = '35%';
			break;
			case 'md':
				customStyles.content.left = '25%';
				customStyles.content.right = '25%';
			break;
			case 'lg':
				customStyles.content.left = '10%';
				customStyles.content.right = '10%';
			break;
			default:
				customStyles.content.left = '25%';
				customStyles.content.right = '25%';
		}

		const closeButtonStyle = {
			position: 'absolute',
			top: 5,
			right: 5,
			cursor: 'pointer'
		};
		const headingStyle = {
			margin: 0,
			marginBottom: 10
		};
		
		return(
			<Modal
				style={customStyles}
				isOpen={this.props.open}
				contentLabel="Modal">
			{/*Button x close Modal*/}
				<span
					style={closeButtonStyle}
					className="glyphicon glyphicon-remove"
					onClick={() => this.props.close()}>
				</span>
			{/*Button x close Modal*/}
			
				<h4 style={headingStyle}>{ this.props.title }</h4>
				{ this.props.children }
			</Modal>
		);
	}
}

CustomModal.propTypes = {
	size: React.PropTypes.string
};

CustomModal.defaultProps = {
	size: 'md'
};

export default CustomModal;
