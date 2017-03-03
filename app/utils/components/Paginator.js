import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginator = (props) => (
	<ReactPaginate
			previousLabel={<span className="glyphicon glyphicon-chevron-left"></span>}
			nextLabel={<span className="glyphicon glyphicon-chevron-right"></span>}
			breakLabel={<a href="">...</a>}
			breakClassName={"break-me"}
			pageCount={props.pageCount}
			marginPagesDisplayed={2}
			pageRangeDisplayed={5}
			onPageChange={props.onPageChange}
			containerClassName={"pagination"}
			subContainerClassName={"pages pagination"}
			activeClassName={"active"} 
	/>	
);

export default Paginator;